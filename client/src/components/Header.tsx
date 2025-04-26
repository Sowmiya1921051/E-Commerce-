import  { useState } from 'react'
import { Search, Bell, User, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order received', time: '5 min ago' },
    { id: 2, text: 'Product "Smart Watch" is low on stock', time: '1 hour ago' },
    { id: 3, text: 'Weekly sales report is ready', time: '3 hours ago' }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // In a real app, this would toggle dark mode classes
  }
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }
  
  const clearNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="block md:hidden mr-3">
            <MobileSidebar />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {darkMode ? (
              <Sun size={20} className="text-gray-600" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
          
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <span className="text-xs text-gray-500">
                    {notifications.length} new
                  </span>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-gray-500 text-sm">
                      No new notifications
                    </p>
                  ) : (
                    notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <p className="text-sm">{notification.text}</p>
                          <button
                            onClick={() => clearNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            &times;
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="p-2 text-center border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="group-hover:block hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 text-red-600">Logout</a>
                </div>
              </div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-gray-600 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  )
}
 