'use  client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Activity, 
  Package, 
  Tag, 
  ShoppingCart, 
  AlertCircle
} from 'lucide-react'
import { mockProducts } from '@/lib/data'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    lowStock: 0,
    revenue: 0
  })

  useEffect(() => {
    // Calculate dashboard stats from mock data
    const uniqueCategories = new Set(mockProducts.map(p => p.category))
    const lowStockItems = mockProducts.filter(p => p.stock < 10)
    const totalRevenue = mockProducts.reduce((acc, p) => acc + (p.price * p.sold || 0), 0)
    
    setStats({
      totalProducts: mockProducts.length,
      categories: uniqueCategories.size,
      lowStock: lowStockItems.length,
      revenue: totalRevenue
    })
  }, [])

  const recentProducts = mockProducts.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Package size={24} className="text-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Products</p>
            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Tag size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Categories</p>
            <h3 className="text-2xl font-bold">{stats.categories}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Low Stock</p>
            <h3 className="text-2xl font-bold">{stats.lowStock}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <div className="bg-purple-100 p-3 rounded-full">
            <ShoppingCart size={24} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold">${stats.revenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Products</h2>
          <a href="/dashboard/products" className="text-primary text-sm hover:underline">
            View All
          </a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="40px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock < 10 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Sales Activity</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-primary text-white rounded">Weekly</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded">Monthly</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded">Yearly</button>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <Activity size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">Sales activity chart would appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
 