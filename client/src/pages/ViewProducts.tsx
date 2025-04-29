import  { useState } from 'react'
import { Edit, Trash, Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Smart Watch',
    price: 299,
    stock: 45,
    category: 'Electronics',
    subcategory: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Skin Care Set',
    price: 89,
    stock: 32,
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    name: 'Natural Serum',
    price: 59,
    stock: 18,
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1556228578-567ba127e37f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    name: 'Purple Tube',
    price: 34,
    stock: 27,
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1556228578-f9707385e031?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    name: 'Red Tube Bottle',
    price: 39,
    stock: 8,
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    name: 'Laptop - 15" Pro',
    price: 1299,
    stock: 8,
    category: 'Electronics',
    subcategory: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: 7,
    name: 'Men\'s Jeans',
    price: 49,
    stock: 64,
    category: 'Clothing',
    subcategory: 'Men\'s Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
  },
  {
    id: 8,
    name: 'Coffee Maker',
    price: 89,
    stock: 15,
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    image: 'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
  }
]

// Mock categories for filter
const categories = [
  'All Categories',
  'Electronics',
  'Beauty & Personal Care',
  'Clothing',
  'Home & Kitchen',
  'Sports & Outdoors'
]

export default function ViewProducts() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('name') // 'name', 'price', 'stock'
  const [sortDirection, setSortDirection] = useState('asc') // 'asc', 'desc'
  
  // Sort products
  const sortProducts = (a: any, b: any) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else if (sortBy === 'price') {
      return sortDirection === 'asc' 
        ? a.price - b.price
        : b.price - a.price
    } else if (sortBy === 'stock') {
      return sortDirection === 'asc' 
        ? a.stock - b.stock
        : b.stock - a.stock
    }
    return 0
  }
  
  // Toggle sort direction
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }
  
  // Render sort icon
  const renderSortIcon = (column: string) => {
    if (sortBy !== column) {
      return null
    }
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }
  
  // Filter products based on search term and category
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort(sortProducts)
  
  // Handle product deletion
  const confirmDelete = (productId: number) => {
    setProductToDelete(productId)
    setDeleteModalOpen(true)
  }
  
  const deleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete))
      setDeleteModalOpen(false)
      setProductToDelete(null)
    }
  }
  
  return (
    <div>
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
          
          <Link to="/add-product" className="btn btn-primary flex items-center justify-center">
            <Plus size={18} className="mr-1" />
            Add Product
          </Link>
        </div>
      </div>
      
      {/* Products table */}
      <div className="card p-0">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    Product
                    <span className="ml-1">{renderSortIcon('name')}</span>
                  </div>
                </th>
                <th>Category</th>
                <th 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    <span className="ml-1">{renderSortIcon('price')}</span>
                  </div>
                </th>
                <th 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSort('stock')}
                >
                  <div className="flex items-center">
                    Stock
                    <span className="ml-1">{renderSortIcon('stock')}</span>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{product.name}</div>
                          <div className="text-xs text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-800">{product.category}</div>
                      <div className="text-xs text-gray-500">{product.subcategory}</div>
                    </td>
                    <td className="font-medium">${product.price}</td>
                    <td>
                      <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Link to={`/edit-product/${product.id}`} className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => confirmDelete(product.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex space-x-1">
            <button disabled className="px-3 py-1 rounded border text-sm bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1 rounded border text-sm hover:bg-gray-50">...</button>
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {deleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setDeleteModalOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Confirm Deletion</h3>
            <p className="text-gray-500 mb-5">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
 