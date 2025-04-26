'use  client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { mockProducts, mockCategories } from '@/lib/data'

export default function Products() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const productsPerPage = 10

  useEffect(() => {
    if (selectedCategory) {
      const category = mockCategories.find(c => c.name === selectedCategory)
      setSubcategories(category ? category.subcategories : [])
    } else {
      setSubcategories([])
    }
    setSelectedSubcategory('')
  }, [selectedCategory])

  useEffect(() => {
    let filtered = [...products]
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    // Apply subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory)
    }
    
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [search, selectedCategory, selectedSubcategory, products])

  const deleteProduct = (id: number) => {
    // In a real app, this would call an API to delete the product
    setProducts(products.filter(product => product.id !== id))
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <a href="/dashboard/add-product" className="btn-primary flex items-center justify-center">
            <Plus size={18} className="mr-1" />
            Add Product
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary"
            />
          </div>
          
          {/* Filter Button (Mobile) */}
          <button 
            className="md:hidden btn-secondary w-full flex items-center justify-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} className="mr-2" />
            Filter Products
          </button>
          
          {/* Filters (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center">
              <label className="text-sm font-medium mr-2">Category:</label>
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  {mockCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="text-sm font-medium mr-2">Subcategory:</label>
              <div className="relative">
                <select 
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  disabled={!selectedCategory}
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="">All Subcategories</option>
                  {subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="md:hidden p-4 bg-gray-50 border-b">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary"
                  >
                    <option value="">All Categories</option>
                    {mockCategories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <div className="relative">
                  <select 
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    disabled={!selectedCategory}
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">All Subcategories</option>
                    {subcategories.map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                currentProducts.map((product) => (
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
                          <p className="text-xs text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm">{product.category}</p>
                      {product.subcategory && (
                        <p className="text-xs text-gray-500">{product.subcategory}</p>
                      )}
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button 
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        title="Edit Product"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Product"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Display pages around the current page
                  let pageNum = i + 1
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      pageNum = currentPage - 3 + i
                    }
                    if (currentPage > totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    }
                  }
                  
                  return pageNum <= totalPages ? (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-8 h-8 text-sm flex items-center justify-center rounded-md ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ) : null
                })}
              </div>
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border enabled:hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 