"use client"

import type React from "react"

import { useState } from "react"
import ReceiptModal from "./receipt-modal"

interface CartItemType {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
}

interface CheckoutModalProps {
  items: CartItemType[]
  total: number
  onClose: () => void
  onCheckoutComplete: () => void
}

interface Receipt {
  orderId: string
  customerName: string
  customerEmail: string
  items: CartItemType[]
  total: number
  timestamp: string
  status: string
}

export default function CheckoutModal({ items, total, onClose, onCheckoutComplete }: CheckoutModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string; general?: string }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setErrors({})

      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          cartItems: items,
          total,
        }),
      })

      if (!res.ok) {
        throw new Error("Checkout failed")
      }

      const receiptData = await res.json()
      setReceipt(receiptData)
    } catch (err) {
      setErrors({
        general: "Failed to process checkout. Please try again.",
      })
      console.error("Checkout error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (receipt) {
    return (
      <ReceiptModal
        receipt={receipt}
        onClose={() => {
          setReceipt(null)
          onCheckoutComplete()
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-primary">Checkout</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-foreground/60 hover:text-foreground disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={loading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
                errors.name ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              }`}
            />
            {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              disabled={loading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 ${
                errors.email ? "border-error focus:ring-error" : "border-border focus:ring-accent"
              }`}
            />
            {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
          </div>

          {errors.general && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">{errors.general}</div>
          )}

          <div className="bg-primary-light rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground/60 mb-1">Order Total</p>
            <p className="text-2xl font-bold text-accent">${total.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full bg-primary-light text-primary py-2 rounded-lg font-medium hover:bg-border transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
