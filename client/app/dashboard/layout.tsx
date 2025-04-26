'use  client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import {
  Home,
  Package,
  Plus,
  List,
  Tag,
  LogOut,
  Menu,
  ShoppingBag,
  X
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  
  // Check auth on client side
  useEffect(() => {
    const token = getCookie('auth')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const logout = () => {
    document.cookie = 'auth=; path=/; max-age=0'
    router.push('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/dashboard/add-product', label: 'Add Product', icon: <Plus size={20} /> },
    { path: '/dashboard/products', label: 'View Products', icon: <Package size={20} /> },
    { path: '/dashboard/categories', label: 'Categories', icon: <Tag size={20} /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-bold">ProductHub</h1>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </a>
              </li>
            ))}
            
            <li className="pt-4 mt-4 border-t">
              <button
                onClick={logout}
                className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100 w-full transition-colors"
              >
                <LogOut size={20} />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
 