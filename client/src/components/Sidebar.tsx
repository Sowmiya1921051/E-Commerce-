import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Plus, Package, Tag, LogOut, ShoppingCart,
  Settings, Users, ChevronDown, BarChart, ShoppingBag, CreditCard, HelpCircle
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [collapsed, setCollapsed] = useState({
    products: false,
    sales: true,
    settings: true
  })

  const mainNavItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  ]

  const productNavItems = [
    { path: '/products', label: 'View Products', icon: <Package size={20} /> },
    // { path: '/add-product', label: 'Add Product', icon: <Plus size={20} /> },
    { path: '/categories', label: 'Categories', icon: <Tag size={20} /> },
    { path: '/images', label: 'Images', icon: <ShoppingBag size={20} /> }, {/* New Images Section */}
  ]

  const salesNavItems = [
    { path: '/orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={20} /> },
  ]

  const settingsNavItems = [
    { path: '/settings/general', label: 'General', icon: <Settings size={20} /> },
    { path: '/settings/payment', label: 'Payment Methods', icon: <CreditCard size={20} /> },
    { path: '/settings/help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  ]

  const toggleCollapse = (section: string) => {
    setCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 flex items-center">
        <ShoppingCart className="h-6 w-6 text-blue-600" />
        <h2 className="ml-2 text-xl font-bold text-gray-800">ProductHub</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav>
          <ul className="space-y-1">
            {/* Main */}
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-md text-sm font-normal ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

            {/* Products */}
            <li className="mt-4">
              <button
                onClick={() => toggleCollapse('products')}
                className="w-full flex items-center justify-between p-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-md"
              >
                <span className='text-sm'>Products</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${!collapsed.products ? 'rotate-180' : ''}`}
                />
              </button>
              {!collapsed.products && (
                <ul className="mt-2 pl-4 space-y-1">
                  {productNavItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 p-2 rounded-md text-xs ${
                          pathname === item.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Sales */}
            <li className="mt-4">
              <button
                onClick={() => toggleCollapse('sales')}
                className="w-full flex items-center justify-between p-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-md"
              >
                <span className='text-sm'>Sales</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${!collapsed.sales ? 'rotate-180' : ''}`}
                />
              </button>
              {!collapsed.sales && (
                <ul className="mt-2 pl-4 space-y-1">
                  {salesNavItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                          pathname === item.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Settings */}
            <li className="mt-4">
              <button
                onClick={() => toggleCollapse('settings')}
                className="w-full flex items-center justify-between p-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-md"
              >
                <span className='text-sm'>Settings</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${!collapsed.settings ? 'rotate-180' : ''}`}
                />
              </button>
              {!collapsed.settings && (
                <ul className="mt-2 pl-4 space-y-1">
                  {settingsNavItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                          pathname === item.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 w-full text-sm font-medium text-gray-700 hover:bg-gray-100 p-2 rounded-md">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="p-4 border-t border-gray-200 flex items-center">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">Admin User</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
      </div>
    </aside>
  )
}
