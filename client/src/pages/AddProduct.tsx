import { useState } from 'react'
import { Plus, X, Upload, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock categories for dropdown
const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Kitchen' },
  { id: 4, name: 'Beauty & Personal Care' },
  { id: 5, name: 'Sports & Outdoors' },
]

// Mock subcategories mapped to parent categories
const subcategories: { [key: string]: { id: number, name: string }[] } = {
  'Electronics': [
    { id: 1, name: 'Smartphones' },
    { id: 2, name: 'Laptops' },
    { id: 3, name: 'Audio' },
    { id: 4, name: 'Wearables' },
  ],
  'Clothing': [
    { id: 5, name: 'Men\'s Clothing' },
    { id: 6, name: 'Women\'s Clothing' },
    { id: 7, name: 'Shoes' },
    { id: 8, name: 'Accessories' },
  ],
  'Home & Kitchen': [
    { id: 9, name: 'Furniture' },
    { id: 10, name: 'Kitchen Appliances' },
    { id: 11, name: 'Bedding' },
    { id: 12, name: 'Decor' },
  ],
  'Beauty & Personal Care': [
    { id: 13, name: 'Skin Care' },
    { id: 14, name: 'Hair Care' },
    { id: 15, name: 'Makeup' },
    { id: 16, name: 'Fragrance' },
  ],
  'Sports & Outdoors': [
    { id: 17, name: 'Fitness' },
    { id: 18, name: 'Camping' },
    { id: 19, name: 'Team Sports' },
    { id: 20, name: 'Water Sports' },
  ],
}

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    subcategory: '',
    brand: '',
    series: '',
    sku: '',
    weight: '',
    dimensions: ''
  })

  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('basic') // 'basic', 'details', 'images'

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Add new tag
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Add image URL
  const addImageUrl = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  // Remove image URL
  const removeImageUrl = (urlToRemove: string) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to an API
    console.log({
      ...formData,
      images: imageUrls,
      tags
    })

    // Show success message
    setSuccess(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        subcategory: '',
        brand: '',
        series: '',
        sku: '',
        weight: '',
        dimensions: ''
      })
      setImageUrls([])
      setTags([])
      setSuccess(false)
    }, 2000)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/products" className="mr-3 text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Product
        </button>
      </div>

      {success && (
        <div className="bg-green-50 text-green-800 rounded-lg p-4 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Product added successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-between">
            <button
              onClick={() => setActiveTab('basic')}
              className={`flex-1 text-center px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'basic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 text-center px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Additional Details
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 text-center px-4 py-2 font-medium text-sm border-b-2 ${activeTab === 'images'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Images & Media
            </button>
          </nav>
        </div>
      </div>


      <form onSubmit={handleSubmit} className="card">
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. PRD-12345"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="input"
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {formData.category && subcategories[formData.category]?.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.name}>{subcategory.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="input"
              ></textarea>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="input rounded-r-none"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-primary py-2 rounded-l-none"
                >
                  <Plus size={18} />
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Details Tab */}
        {activeTab === 'details' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Series */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Series
                </label>
                <input
                  type="text"
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions (L x W x H)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. 10cm x 5cm x 2cm"
                />
              </div>
            </div>

            {/* Custom attributes could be added here */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Custom Attributes
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Attribute
                </button>
              </div>

              <div className="mt-2 bg-gray-50 border border-gray-200 rounded-md p-4 text-center text-gray-500 text-sm">
                No custom attributes added yet
              </div>
            </div>
          </div>
        )}

        {/* Images & Media Tab */}
        {activeTab === 'images' && (
          <div>
            {/* Image URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs
              </label>
              <div className="flex">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="input rounded-r-none"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="btn-primary py-2 rounded-l-none"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Example URLs */}
              <div className="mt-2 text-xs text-gray-500">
                <p>Example product images:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li className="cursor-pointer hover:text-blue-600" onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3')}>
                    Smart Watch Image
                  </li>
                  <li className="cursor-pointer hover:text-blue-600" onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3')}>
                    Skin Care Set Image
                  </li>
                  <li className="cursor-pointer hover:text-blue-600" onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1556228578-567ba127e37f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxlLWNvbW1lcmNlJTIwcHJvZHVjdCUyMGRhc2hib2FyZCUyMG1vZGVybiUyMFVJfGVufDB8fHx8MTc0NTY0ODUyOXww&ixlib=rb-4.0.3')}>
                    Natural Serum Image
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Previews */}
            {imageUrls.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="border border-gray-200 rounded-md overflow-hidden h-40 bg-gray-50">
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => removeImageUrl(url)}
                        className="bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                      >
                        <X size={16} className="text-red-600" />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-1">
                        Primary Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">No images added yet</p>
                <p className="mt-1 text-xs text-gray-500">Add image URLs above or drag and drop image files</p>
              </div>
            )}

            {/* Image Upload Placeholder */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag and drop image files here, or click to select files</p>
                <p className="mt-1 text-xs text-gray-500">Supports: JPG, PNG, GIF (Max 5MB each)</p>
                <input type="file" className="hidden" accept="image/*" multiple />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end">
          <Link to="/products" className="btn btn-outline mr-3">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}
