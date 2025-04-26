'use  client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, X, Plus, ChevronDown } from 'lucide-react'
import { mockCategories } from '@/lib/data'

export default function AddProduct() {
  const [images, setImages] = useState<string[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  const selectedCategory = watch('category')
  
  const getSubcategories = (categoryName: string) => {
    const category = mockCategories.find(c => c.name === categoryName)
    return category ? category.subcategories : []
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setImages([...images, file.name])
      setPreviewUrls([...previewUrls, imageUrl])
    }
  }

  const handleImageUrlAdd = () => {
    const url = (document.getElementById('imageUrl') as HTMLInputElement).value
    if (url) {
      setImages([...images, url])
      setPreviewUrls([...previewUrls, url])
      // Clear the input
      (document.getElementById('imageUrl') as HTMLInputElement).value = ''
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviews = [...previewUrls]
    newImages.splice(index, 1)
    newPreviews.splice(index, 1)
    setImages(newImages)
    setPreviewUrls(newPreviews)
  }

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const onSubmit = (data: any) => {
    // Combine form data with images and tags
    const productData = {
      ...data,
      images: images,
      tags: tags,
    }
    
    // In a real app, this would be sent to an API
    console.log('Product data to submit:', productData)
    
    // Show success message
    setIsSuccess(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      reset()
      setImages([])
      setPreviewUrls([])
      setTags([])
      setIsSuccess(false)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Fill in the details to add a new product to your inventory</p>
      </div>

      {isSuccess && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
          Product has been successfully added!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input
                type="text"
                {...register('name', { required: 'Product name is required' })}
                className="input"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                {...register('brand')}
                className="input"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' }
                })}
                className="input"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message as string}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
              <input
                type="number"
                {...register('stock', { 
                  required: 'Stock quantity is required',
                  min: { value: 0, message: 'Stock cannot be negative' }
                })}
                className="input"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock.message as string}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <div className="relative">
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="input appearance-none"
                >
                  <option value="">Select Category</option>
                  {mockCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>
              )}
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <div className="relative">
                <select
                  {...register('subcategory')}
                  className="input appearance-none"
                  disabled={!selectedCategory}
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory && 
                    getSubcategories(selectedCategory).map((subcat, idx) => (
                      <option key={idx} value={subcat}>
                        {subcat}
                      </option>
                    ))
                  }
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Series */}
            <div>
              <label className="block text-sm font-medium mb-1">Series</label>
              <input
                type="text"
                {...register('series')}
                className="input"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="input"
                  placeholder="Add a tag"
                />
                <button 
                  type="button"
                  onClick={addTag}
                  className="ml-2 btn-secondary whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                      {tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input h-32"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>
            )}
          </div>

          {/* Images */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Product Images</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image Upload */}
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">Drag & drop or click to select</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="opacity-0 absolute inset-0 w-full cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Image URL */}
              <div>
                <div className="flex">
                  <input
                    type="url"
                    id="imageUrl"
                    className="input"
                    placeholder="Or enter image URL"
                  />
                  <button
                    type="button"
                    onClick={handleImageUrlAdd}
                    className="ml-2 btn-secondary whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="h-24 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-70 hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => reset()} className="btn bg-gray-100 text-gray-700 mr-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
 