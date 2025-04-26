import  { CreditCard, Users, ShoppingBag, Activity, ArrowUp, ArrowDown, Zap, Package, BarChart } from 'lucide-react'
import { Line } from './mockCharts'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <div className="flex items-center mt-1">
              <h3 className="text-xl font-bold text-gray-800">$24,780</h3>
              <span className="flex items-center text-green-600 text-xs ml-2">
                <ArrowUp size={12} />
                12%
              </span>
            </div>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Customers</p>
            <div className="flex items-center mt-1">
              <h3 className="text-xl font-bold text-gray-800">1,245</h3>
              <span className="flex items-center text-green-600 text-xs ml-2">
                <ArrowUp size={12} />
                8%
              </span>
            </div>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <ShoppingBag className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Products</p>
            <div className="flex items-center mt-1">
              <h3 className="text-xl font-bold text-gray-800">368</h3>
              <span className="flex items-center text-green-600 text-xs ml-2">
                <ArrowUp size={12} />
                5%
              </span>
            </div>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-orange-100 p-3 mr-4">
            <Activity className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <div className="flex items-center mt-1">
              <h3 className="text-xl font-bold text-gray-800">456</h3>
              <span className="flex items-center text-red-600 text-xs ml-2">
                <ArrowDown size={12} />
                3%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart and table section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Sales Overview</h3>
              <div className="flex space-x-2">
                <button className="btn-outline text-xs">Monthly</button>
                <button className="btn-primary text-xs">Weekly</button>
              </div>
            </div>
            <div className="h-72">
              <Line />
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Popular Products</h3>
            <div className="space-y-4">
              {/* Product 1 */}
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3"
                  alt="Product"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-gray-800">Smart Watch</h4>
                  <p className="text-xs text-gray-500">Electronics</p>
                </div>
                <span className="text-sm font-medium text-gray-800">$299</span>
              </div>
              
              {/* Product 2 */}
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3"
                  alt="Product"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-gray-800">Skin Care Set</h4>
                  <p className="text-xs text-gray-500">Beauty</p>
                </div>
                <span className="text-sm font-medium text-gray-800">$89</span>
              </div>
              
              {/* Product 3 */}
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1556228578-567ba127e37f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3"
                  alt="Product"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-gray-800">Natural Serum</h4>
                  <p className="text-xs text-gray-500">Beauty</p>
                </div>
                <span className="text-sm font-medium text-gray-800">$59</span>
              </div>
              
              {/* Product 4 */}
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1556228578-f9707385e031?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3"
                  alt="Product"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium text-gray-800">Purple Tube</h4>
                  <p className="text-xs text-gray-500">Beauty</p>
                </div>
                <span className="text-sm font-medium text-gray-800">$34</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <a href="/products" className="text-sm text-blue-600 hover:underline flex items-center justify-center">
                View all products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent orders */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Recent Orders</h3>
          <a href="/products" className="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="font-medium">#ORD-9834</td>
                <td>John Smith</td>
                <td>Smart Watch</td>
                <td>Apr 24, 2023</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$299.00</td>
              </tr>
              <tr>
                <td className="font-medium">#ORD-9833</td>
                <td>Sarah Johnson</td>
                <td>Skin Care Set</td>
                <td>Apr 23, 2023</td>
                <td><span className="badge badge-warning">Processing</span></td>
                <td>$89.00</td>
              </tr>
              <tr>
                <td className="font-medium">#ORD-9832</td>
                <td>Michael Brown</td>
                <td>Wireless Headphones</td>
                <td>Apr 23, 2023</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$129.00</td>
              </tr>
              <tr>
                <td className="font-medium">#ORD-9831</td>
                <td>Emma Wilson</td>
                <td>Natural Serum</td>
                <td>Apr 22, 2023</td>
                <td><span className="badge badge-danger">Cancelled</span></td>
                <td>$59.00</td>
              </tr>
              <tr>
                <td className="font-medium">#ORD-9830</td>
                <td>Robert Lee</td>
                <td>Smart Watch</td>
                <td>Apr 22, 2023</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$299.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Conversion Rate</h3>
            <Zap size={18} className="text-yellow-500" />
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">3.7%</div>
              <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                <ArrowUp size={14} className="mr-1" />
                <span>0.5% increase</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">Compared to last week</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Avg. Order Value</h3>
            <Package size={18} className="text-blue-500" />
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">$89.34</div>
              <div className="flex items-center justify-center mt-2 text-sm text-red-600">
                <ArrowDown size={14} className="mr-1" />
                <span>2.1% decrease</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">Compared to last week</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Inventory Status</h3>
            <BarChart size={18} className="text-purple-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>In Stock</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Low Stock</span>
                <span className="font-medium">9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Out of Stock</span>
                <span className="font-medium">4%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 