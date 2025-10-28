import express from "express"
import cors from "cors"
import Database from "better-sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize SQLite Database
const db = new Database(path.join(__dirname, "cart.db"))

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    user_id TEXT DEFAULT 'default_user',
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// Seed products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get()
if (productCount.count === 0) {
  const products = [
    {
      name: "Wireless Headphones",
      price: 129.99,
      description: "Premium noise-cancelling headphones",
      category: "Electronics",
    },
    {
      name: "Minimalist Watch",
      price: 199.99,
      description: "Elegant timepiece with leather strap",
      category: "Accessories",
    },
    {
      name: "Organic Cotton T-Shirt",
      price: 49.99,
      description: "100% organic cotton, sustainable",
      category: "Apparel",
    },
    {
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      description: "Keeps drinks cold for 24 hours",
      category: "Lifestyle",
    },
    {
      name: "Leather Crossbody Bag",
      price: 159.99,
      description: "Handcrafted Italian leather",
      category: "Accessories",
    },
    { name: "Bamboo Desk Organizer", price: 44.99, description: "Eco-friendly workspace solution", category: "Office" },
    { name: "Ceramic Coffee Mug", price: 24.99, description: "Artisan-made ceramic mug", category: "Lifestyle" },
    { name: "Portable Phone Charger", price: 59.99, description: "20000mAh fast charging", category: "Electronics" },
  ]

  const insert = db.prepare("INSERT INTO products (name, price, description, category) VALUES (?, ?, ?, ?)")
  products.forEach((p) => insert.run(p.name, p.price, p.description, p.category))
}

// API Routes

// GET /api/products - Get all products
app.get("/api/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

// GET /api/cart - Get cart items with total
app.get("/api/cart", (req, res) => {
  try {
    const cartItems = db
      .prepare(`
      SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = 'default_user'
    `)
      .all()

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    res.json({ items: cartItems, total: Number.parseFloat(total.toFixed(2)) })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" })
  }
})

// POST /api/cart - Add item to cart
app.post("/api/cart", (req, res) => {
  try {
    const { productId, qty } = req.body

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ error: "Invalid product ID or quantity" })
    }

    // Check if product exists
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    // Check if item already in cart
    const existing = db
      .prepare("SELECT * FROM cart_items WHERE product_id = ? AND user_id = ?")
      .get(productId, "default_user")

    if (existing) {
      db.prepare("UPDATE cart_items SET quantity = quantity + ? WHERE id = ?").run(qty, existing.id)
    } else {
      db.prepare("INSERT INTO cart_items (product_id, quantity, user_id) VALUES (?, ?, ?)").run(
        productId,
        qty,
        "default_user",
      )
    }

    res.json({ success: true, message: "Item added to cart" })
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" })
  }
})

// DELETE /api/cart/:id - Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  try {
    const { id } = req.params

    const result = db.prepare("DELETE FROM cart_items WHERE id = ? AND user_id = ?").run(id, "default_user")

    if (result.changes === 0) {
      return res.status(404).json({ error: "Cart item not found" })
    }

    res.json({ success: true, message: "Item removed from cart" })
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" })
  }
})

// POST /api/checkout - Process checkout
app.post("/api/checkout", (req, res) => {
  try {
    const { name, email, cartItems, total } = req.body

    if (!name || !email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Save order to database
    const itemsJson = JSON.stringify(cartItems)
    db.prepare("INSERT INTO orders (user_name, user_email, total, items) VALUES (?, ?, ?, ?)").run(
      name,
      email,
      total,
      itemsJson,
    )

    // Clear cart
    db.prepare("DELETE FROM cart_items WHERE user_id = ?").run("default_user")

    // Generate receipt
    const receipt = {
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total: Number.parseFloat(total.toFixed(2)),
      timestamp: new Date().toISOString(),
      status: "Order Confirmed",
    }

    res.json(receipt)
  } catch (error) {
    res.status(500).json({ error: "Checkout failed" })
  }
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
