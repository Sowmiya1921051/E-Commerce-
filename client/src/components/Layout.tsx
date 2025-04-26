import  { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileSidebar from './MobileSidebar'

export default function Layout() {
  const location = useLocation()
  
  // Determine page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/add-product':
        return 'Add Product'
      case '/products':
        return 'Products'
      case '/categories':
        return 'Categories'
      default:
        return 'Dashboard'
    }
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-3 flex justify-center">
        <span className="text-xs text-gray-500">Built with jdoodle.ai</span>
      </div>
    </div>
  )
}
 