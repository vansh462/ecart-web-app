# Vibe Commerce - Full Stack E-Commerce Cart Application

A modern, elegant full-stack e-commerce shopping cart application built with React, Node.js/Express, and SQLite. This project demonstrates core e-commerce functionality including product browsing, cart management, and checkout flow.

## Features

- **Product Grid**: Browse 8 curated products with categories and descriptions
- **Shopping Cart**: Add/remove items, view quantities and totals
- **Checkout Flow**: Customer information form with validation
- **Order Confirmation**: Mock receipt with order ID and timestamp
- **Responsive Design**: Mobile-first design that works on all devices
- **Error Handling**: Comprehensive error handling and user feedback
- **Database Persistence**: SQLite database for products, cart items, and orders
- **REST API**: Clean REST API endpoints for all operations

## Tech Stack

### Frontend
- **React 18** - UI library
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **SWR** - Data fetching and caching

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database
- **better-sqlite3** - SQLite driver
- **CORS** - Cross-origin resource sharing

## Project Structure

\`\`\`
vibe-commerce/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── cart.db             # SQLite database (auto-created)
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles and design tokens
│   ├── components/
│   │   ├── header.tsx      # Header with cart button
│   │   ├── product-grid.tsx # Products display
│   │   ├── product-card.tsx # Individual product card
│   │   ├── cart.tsx        # Cart view
│   │   ├── cart-item.tsx   # Cart item component
│   │   ├── checkout-modal.tsx # Checkout form
│   │   ├── receipt-modal.tsx  # Order confirmation
│   │   └── footer.tsx      # Footer
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # This file
\`\`\`

## API Endpoints

### Products
- **GET /api/products** - Get all products
  \`\`\`json
  [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 129.99,
      "description": "Premium noise-cancelling headphones",
      "category": "Electronics"
    }
  ]
  \`\`\`

### Cart
- **GET /api/cart** - Get cart items and total
  \`\`\`json
  {
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "name": "Wireless Headphones",
        "price": 129.99,
        "quantity": 1
      }
    ],
    "total": 129.99
  }
  \`\`\`

- **POST /api/cart** - Add item to cart
  \`\`\`json
  {
    "productId": 1,
    "qty": 1
  }
  \`\`\`

- **DELETE /api/cart/:id** - Remove item from cart

### Checkout
- **POST /api/checkout** - Process checkout
  \`\`\`json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "cartItems": [...],
    "total": 129.99
  }
  \`\`\`
  
  Response:
  \`\`\`json
  {
    "orderId": "ABC123XYZ",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "total": 129.99,
    "timestamp": "2025-10-28T12:34:56.000Z",
    "status": "Order Confirmed"
  }
  \`\`\`

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Git

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
   
   Or for development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The app will be available at `http://localhost:3000`

### Running Both Servers

Open two terminal windows:

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Then open `http://localhost:3000` in your browser.

## Usage

1. **Browse Products**: The home page displays all available products in a responsive grid
2. **Add to Cart**: Click the "Add" button on any product to add it to your cart
3. **View Cart**: Click the cart icon in the header to view your shopping cart
4. **Remove Items**: Click the trash icon on any cart item to remove it
5. **Checkout**: Click "Proceed to Checkout" to enter your information
6. **Confirm Order**: Review your order and click "Complete Purchase"
7. **View Receipt**: See your order confirmation with order ID and timestamp

## Design Features

- **Modern Aesthetic**: Clean, minimalist design with elegant typography
- **Color Scheme**: 
  - Primary: Deep charcoal (#1a1a1a)
  - Accent: Warm tan (#d4a574)
  - Background: Off-white (#fafaf8)
  - Borders: Light gray (#e5e5e0)

- **Responsive Layout**: 
  - Mobile: Single column layout
  - Tablet: 2-column product grid
  - Desktop: 4-column product grid

- **Interactive Elements**:
  - Smooth hover effects on cards
  - Loading spinners for async operations
  - Success/error feedback on actions
  - Sticky cart summary on desktop

## Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Displays helpful messages when backend is unavailable
- **Validation Errors**: Form validation with specific error messages
- **Timeout Handling**: 10-second timeout on API requests
- **Retry Logic**: Users can retry failed operations
- **User Feedback**: Toast-like notifications for success/error states

## Database

SQLite database (`cart.db`) is automatically created on first run with three tables:

### Products Table
\`\`\`sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT
);
\`\`\`

### Cart Items Table
\`\`\`sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  user_id TEXT DEFAULT 'default_user',
  FOREIGN KEY (product_id) REFERENCES products(id)
);
\`\`\`

### Orders Table
\`\`\`sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  total REAL NOT NULL,
  items TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Bonus Features Implemented

- ✅ **Database Persistence**: All data persists in SQLite
- ✅ **Error Handling**: Comprehensive error handling throughout
- ✅ **Form Validation**: Email and name validation with error messages
- ✅ **Request Timeout**: 10-second timeout on API requests
- ✅ **Retry Logic**: Users can retry failed operations
- ✅ **Mock User**: Default user session for cart persistence
- ✅ **Order History**: Orders saved to database with timestamps

## Deployment

### GitHub Repository
1. Initialize git in the project root:
   \`\`\`bash
   git init
   \`\`\`

2. Add all files:
   \`\`\`bash
   git add .
   \`\`\`

3. Create initial commit:
   \`\`\`bash
   git commit -m "Initial commit: Vibe Commerce e-commerce app"
   \`\`\`

4. Add remote repository:
   \`\`\`bash
   git remote add origin https://github.com/yourusername/vibe-commerce.git
   \`\`\`

5. Push to GitHub:
   \`\`\`bash
   git branch -M main
   git push -u origin main
   \`\`\`

### Deployment Options

**Frontend (Vercel):**
- Connect your GitHub repository to Vercel
- Set environment variable: `NEXT_PUBLIC_API_URL=http://localhost:5000`
- Deploy with one click

**Backend (Heroku/Railway):**
- Deploy Node.js backend to Heroku or Railway
- Update frontend API URL to production backend
- Database will persist on the server

## Screenshots

### Product Grid
- Clean grid layout with product cards
- Category badges and pricing
- Add to cart buttons with success feedback

### Shopping Cart
- List of cart items with quantities
- Order summary sidebar
- Remove item functionality
- Checkout button

### Checkout Form
- Customer name and email fields
- Form validation with error messages
- Order total display
- Complete purchase button

### Order Receipt
- Order confirmation with success icon
- Order ID and timestamp
- Customer information
- Itemized order details
- Total amount

## Performance Optimizations

- Lazy loading of components
- Efficient state management
- Debounced API calls
- Optimized database queries
- CSS-in-JS with Tailwind for minimal bundle size

## Future Enhancements

- Product search and filtering
- User authentication and accounts
- Wishlist functionality
- Product reviews and ratings
- Multiple payment methods
- Order tracking
- Admin dashboard
- Inventory management
- Email notifications

## Troubleshooting

### Backend won't start
- Ensure Node.js is installed: `node --version`
- Check port 5000 is not in use
- Delete `cart.db` and restart to reset database

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check CORS is enabled in Express
- Look for error messages in browser console

### Database errors
- Delete `backend/cart.db` to reset
- Ensure `better-sqlite3` is properly installed
- Check file permissions in backend directory

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for Vibe Commerce
