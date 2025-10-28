"use client"

import { useState, useEffect } from "react"
import ProductCard from "./product-card"

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
}

interface ProductGridProps {
  onProductAdded: () => void
}

export default function ProductGrid({ onProductAdded }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch("http://localhost:5000/api/products", {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }
      const data = await res.json()

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format")
      }

      setProducts(data)
      setRetryCount(0)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"

      if (errorMessage.includes("AbortError")) {
        setError("Request timeout. Please check your connection and try again.")
      } else if (errorMessage.includes("Failed to fetch")) {
        setError("Cannot connect to server. Make sure the backend is running on http://localhost:5000")
      } else {
        setError(`Failed to load products: ${errorMessage}`)
      }

      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    fetchProducts()
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-error mb-4 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
          {retryCount > 2 && (
            <p className="text-xs text-foreground/60 mt-4">
              Still having issues? Check that the backend server is running.
            </p>
          )}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">No products available</p>
        </div>
      </div>
    )
  }

  return (
    <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-primary mb-2">Shop Our Collection</h2>
        <p className="text-foreground/60">Curated products for the modern lifestyle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onProductAdded} />
        ))}
      </div>
    </section>
  )
}
