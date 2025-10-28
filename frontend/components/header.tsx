"use client"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  isCartOpen: boolean
}

export default function Header({ cartCount, onCartClick, isCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-background text-sm font-bold">VC</span>
            </div>
            <h1 className="text-xl font-semibold text-primary">Vibe Commerce</h1>
          </div>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-light transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-error text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-sm font-medium">{isCartOpen ? "Shop" : "Cart"}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
