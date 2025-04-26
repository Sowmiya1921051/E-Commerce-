import  { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Plus, Package, Tag, LogOut, ShoppingCart, Menu, X, Settings, Users, BarChart, ShoppingBag, CreditCard, HelpCircle, ChevronDown } from 'lucide-react'

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const [collapsed, setCollapsed] = useState({
    products: false,
    sales: true,
    settings: true
  })
  
  // Main links
  const mainNavItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  ]
  
  // Product links
  const productNavItems = [
    { path: '/add-product', label: 'Add Product', icon: <Plus size={20} /> },
    { path: '/products', label: 'View Products', icon: <Package size={20} /> },
    { path: '/categories', label: 'Categories', icon: <Tag size={20} /> },
  ]
  
  // Sales links
  const salesNavItems = [
    { path: '/orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={20} /> },
  ]
  
  // Settings links
  const settingsNavItems = [
    { path: '/settings/general', label: 'General', icon: <Settings size={20} /> },
    { path: '/settings/payment', label: 'Payment Methods', icon: <CreditCard size={20} /> },
    { path: '/settings/help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  ]
  
  const toggleCollapse = (section: string) => {
    setCollapsed({
      ...collapsed,
      [section]: !collapsed[section]
    })
  }
  
  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 focus:outline-none"
      >
        <Menu size={24} />
      </button>
      
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            <h2 className="ml-2 text-xl font-bold text-gray-800">ProductHub</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <nav>
            <ul className="space-y-1">
              {/* Main Navigation */}
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              
              {/* Products Dropdown */}
              <li className="mt-4">
                <button
                  onClick={() => toggleCollapse('products')}
                  className="w-full flex items-center justify-between py-2 text-gray-600 hover:text-blue-700"
                >
                  <span className="font-semibold">Products</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${!collapsed.products ? 'rotate-180' : ''}`} 
                  />
                </button>
                {!collapsed.products && (
                  <ul className="mt-1 pl-2 space-y-1">
                    {productNavItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              
              {/* Sales Dropdown */}
              <li>
                <button
                  onClick={() => toggleCollapse('sales')}
                  className="w-full flex items-center justify-between py-2 text-gray-600 hover:text-blue-700"
                >
                  <span className="font-semibold">Sales</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${!collapsed.sales ? 'rotate-180' : ''}`} 
                  />
                </button>
                {!collapsed.sales && (
                  <ul className="mt-1 pl-2 space-y-1">
                    {salesNavItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              
              {/* Settings Dropdown */}
              <li>
                <button
                  onClick={() => toggleCollapse('settings')}
                  className="w-full flex items-center justify-between py-2 text-gray-600 hover:text-blue-700"
                >
                  <span className="font-semibold">Settings</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${!collapsed.settings ? 'rotate-180' : ''}`} 
                  />
                </button>
                {!collapsed.settings && (
                  <ul className="mt-1 pl-2 space-y-1">
                    {settingsNavItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`sidebar-item ${pathname === item.path ? 'active' : ''}`}
                          onClick={() => setIsOpen(false)}
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
          
          {/* Separator */}
          <div className="py-4 mt-4 border-t border-gray-200">
            <button 
              className="sidebar-item w-full"
              onClick={() => setIsOpen(false)}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
          
          {/* User profile */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center p-2 rounded-md">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-2">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 