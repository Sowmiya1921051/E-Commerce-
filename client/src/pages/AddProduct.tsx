import { useState } from 'react'
import { Plus, X, Upload, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: null,
    status: 'active',
    productDescription: '',
    type: '',
    vendor: '',
    collections: '',
    category: '', // Added category here
    tags: [],
    currentTag: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }))
  }

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && formData.currentTag.trim() !== '') {
      e.preventDefault()
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, formData.currentTag.trim()],
        currentTag: '',
      }))
    }
  }

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('media', formData.media)
    data.append('status', formData.status)
    data.append('type', formData.type)
    data.append('vendor', formData.vendor)
    data.append('collections', formData.collections)
    data.append('category', formData.category)
    data.append('tags', JSON.stringify(formData.tags))

    axios.post('http://localhost:5000/api/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Product added successfully:', response.data)

        // Reset form after success
        setFormData({
          title: '',
          description: '',
          media: null,
          status: 'active',
          productDescription: '',
          type: '',
          vendor: '',
          collections: '',
          category: '',
          tags: [],
          currentTag: '',
        })
      })
      .catch((error) => {
        console.error('Error adding product:', error)
      })
  }


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/products" className="mr-3 text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[14px]">Add New Product</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Product
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 text-[12px]">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 text-[12px]">Description</label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className="w-full border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter detailed product description"
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="media" className="block text-sm font-semibold text-gray-700 text-[12px]">Media</label>
          <input
            type="file"
            id="media"
            name="media"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700 text-[12px]">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <label className="block text-sm font-semibold text-gray-700 text-[12px]">Product Organization</label>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold text-gray-700 text-[12px]">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter product type"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vendor" className="block text-sm font-semibold text-gray-700 text-[12px]">Vendor</label>
          <input
            type="text"
            id="vendor"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter vendor name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="collections" className="block text-sm font-semibold text-gray-700 text-[12px]">Collections</label>
          <input
            type="text"
            id="collections"
            name="collections"
            value={formData.collections}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter collections"
          />
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 text-[12px]">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
            placeholder="Enter category"
          />
        </div>

        {/* Tags Section */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 text-[12px]">Tags</label>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              id="tags"
              name="currentTag"
              value={formData.currentTag}
              onChange={handleInputChange}
              onKeyDown={handleTagAdd}
              className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
              placeholder="Press Enter to add tags"
            />
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center text-[12px]"
                >
                  {tag} <X size={14} className="ml-2 cursor-pointer" onClick={() => {
                    const updatedTags = formData.tags.filter((_, i) => i !== index)
                    setFormData((prevData) => ({ ...prevData, tags: updatedTags }))
                  }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
