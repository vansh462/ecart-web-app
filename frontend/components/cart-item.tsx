"use client"

interface CartItemType {
  id: number
  product_id: number
  name: string
  price: number
  quantity: number
}

interface CartItemProps {
  item: CartItemType
  onRemove: (itemId: number) => void
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 flex items-center gap-4">
      <div className="w-20 h-20 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-10 h-10 text-accent opacity-50" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
        </svg>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-primary mb-1">{item.name}</h4>
        <p className="text-sm text-foreground/60 mb-2">Qty: {item.quantity}</p>
        <p className="text-lg font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="p-2 hover:bg-primary-light rounded-lg transition-colors text-foreground/60 hover:text-error"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
