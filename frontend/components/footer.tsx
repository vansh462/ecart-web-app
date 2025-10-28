export default function Footer() {
  return (
    <footer className="bg-primary text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-background/70 text-sm">
              Vibe Commerce brings curated products for the modern lifestyle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Lifestyle
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-background/70 text-sm">© 2025 Vibe Commerce. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-background/70 hover:text-background transition">
              Twitter
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              Instagram
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
