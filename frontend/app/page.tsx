"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import Cart from "@/components/cart"
import Footer from "@/components/footer"

export default function Home() {
  const [showCart, setShowCart] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    updateCartCount()
  }, [])

  const updateCartCount = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart")
      const data = await res.json()
      setCartCount(data.items.length)
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    }
  }

  const handleCartUpdate = () => {
    updateCartCount()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} onCartClick={() => setShowCart(!showCart)} isCartOpen={showCart} />

      {showCart ? <Cart onItemRemoved={handleCartUpdate} /> : <ProductGrid onProductAdded={handleCartUpdate} />}

      <Footer />
    </main>
  )
}
