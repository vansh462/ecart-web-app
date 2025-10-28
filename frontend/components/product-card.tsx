"use client"

import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      setError("")

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, qty: 1 }),
      })

      if (!res.ok) {
        throw new Error("Failed to add to cart")
      }

      setShowSuccess(true)
      onAddToCart()
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      setError("Could not add item. Please try again.")
      console.error("Error adding to cart:", error)
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square bg-primary-light flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-accent-light to-primary-light flex items-center justify-center">
          <svg className="w-16 h-16 text-accent opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-primary mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-foreground/60 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            title={error || ""}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showSuccess
                ? "bg-success text-white"
                : error
                  ? "bg-error/10 text-error"
                  : "bg-primary text-background hover:bg-primary/90"
            } disabled:opacity-50`}
          >
            {showSuccess ? "✓ Added" : error ? "✕ Error" : isAdding ? "..." : "Add"}
          </button>
        </div>

        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    </div>
  )
}
