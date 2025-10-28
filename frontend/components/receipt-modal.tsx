"use client"

interface CartItemType {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
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

interface ReceiptModalProps {
  receipt: Receipt
  onClose: () => void
}

export default function ReceiptModal({ receipt, onClose }: ReceiptModalProps) {
  const formattedDate = new Date(receipt.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Order Confirmed!</h2>
          <p className="text-foreground/60 text-sm">Thank you for your purchase</p>
        </div>

        <div className="bg-primary-light rounded-lg p-4 mb-6">
          <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Order ID</p>
          <p className="text-lg font-bold text-primary font-mono">{receipt.orderId}</p>
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b border-border">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Customer</span>
            <span className="font-medium">{receipt.customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Email</span>
            <span className="font-medium text-xs">{receipt.customerEmail}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Date & Time</span>
            <span className="font-medium text-xs">{formattedDate}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-primary mb-3 text-sm">Items</h4>
          <div className="space-y-2">
            {receipt.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-foreground/60">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4 mb-6">
          <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-accent">${receipt.total.toFixed(2)}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-background py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
