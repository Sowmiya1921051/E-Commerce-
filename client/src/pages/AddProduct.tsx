import { useState, useEffect } from 'react'
import { Plus, X, Upload, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';

export default function AddProduct() {
  const [collectionsData, setCollectionsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const collectionOptions = collectionsData.map(item => ({ value: item, label: item }));
  const categoryOptions = categoryData.map(item => ({ value: item, label: item }));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: null,
    status: 'active',
    productDescription: '',
    type: '',
    vendor: '',
    collections: '',
    category: '',
    inventory: '',
    price: '',
    compareAtPrice: '',
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
    data.append('inventory', formData.inventory)
    data.append('tags', JSON.stringify(formData.tags))
    data.append('price', formData.price)
    data.append('compareAtPrice', formData.compareAtPrice)

    axios.post('http://localhost:5000/api/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Product added successfully:', response.data)

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
          inventory: '',
          tags: [],
          currentTag: '',
          price: '',
          compareAtPrice: '',
        })
      })
      .catch((error) => {
        console.error('Error adding product:', error)
      })
  }


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();

        // Use correct keys
        const collections = [...new Set(products.map(p => p.collections))];
        const categories = [...new Set(products.map(p => p.category))];

        setCollectionsData(collections);
        setCategoryData(categories);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);




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

      {/* Updated parent container classes */}
      <div className="flex gap-6 p-6">
        {/* Left side form container - Added flex-shrink-0 */}
        <div className="flex-1 bg-white p-6 shadow-lg rounded-md flex-shrink-0">
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

            {/* Inventory Section */}
            <div className="mb-4">
              <label htmlFor="inventory" className="block text-sm font-semibold text-gray-700 text-[12px]">Inventory</label>
              <input
                type="text"
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                placeholder="Enter inventory quantity or details"
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

            {/* Pricing Section */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 text-[12px] mb-2">Pricing</label>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="price" className="block text-sm text-gray-700 text-[12px]">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="compareAtPrice" className="block text-sm text-gray-700 text-[12px]">Compare-at Price</label>
                  <input
                    type="number"
                    id="compareAtPrice"
                    name="compareAtPrice"
                    value={formData.compareAtPrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>



          </form>
        </div>

        {/* Right side small container - Added flex-shrink-0 */}
        <div className="w-1/3 bg-white p-6 shadow-lg rounded-md flex-shrink-0">
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
            <label htmlFor="collections" className="block text-sm font-semibold text-gray-700 text-[12px]">
              Collections
            </label>
            <CreatableSelect
              isClearable
              options={collectionOptions}
              onChange={(selectedOption) => {
                setFormData(prev => ({ ...prev, collections: selectedOption ? selectedOption.value : '' }));
              }}
              value={formData.collections ? { value: formData.collections, label: formData.collections } : null}
              placeholder="Select or create collection"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 text-[12px]">
              Category
            </label>
            <CreatableSelect
              isClearable
              options={categoryOptions}
              onChange={(selectedOption) => {
                setFormData(prev => ({ ...prev, category: selectedOption ? selectedOption.value : '' }));
              }}
              value={formData.category ? { value: formData.category, label: formData.category } : null}
              placeholder="Select or create category"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 text-[12px]">Tags</label>
            <div className="flex flex-col gap-2">
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

              <div className="grid grid-cols-2 gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center justify-between text-[12px]"
                  >
                    {tag}
                    <X
                      size={14}
                      className="ml-2 cursor-pointer"
                      onClick={() => {
                        const updatedTags = formData.tags.filter((_, i) => i !== index)
                        setFormData((prevData) => ({ ...prevData, tags: updatedTags }))
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>



    </div>
  )
}