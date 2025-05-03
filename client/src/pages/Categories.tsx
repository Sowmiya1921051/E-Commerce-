import { useEffect, useState } from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import { Edit, Trash, Plus, ChevronDown, ChevronRight, Save, X } from 'lucide-react'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [editMode, setEditMode] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        console.log('API Response:', res.data); // ✅ Check this in your browser console
        setCategories(res.data)
      })
      .catch(err => console.error(err))
  }, [])
  

  const toggleExpand = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const startEditing = (id, type) => {
    const item = categories.find(cat => cat.id === id)
    setEditMode({ id, type })
    setEditValue(item?.name || '')
  }

  const cancelEditing = () => {
    setEditMode(null)
    setEditValue('')
  }

  const saveEdits = () => {
    // Implement saving logic here (e.g., call API to update)
    setEditMode(null)
    setEditValue('')
  }

  const handleDeleteCategory = (id) => {
    // Implement delete logic
  }

  const openSubcategoryModal = (id) => {
    // Implement modal logic
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product Categories</h2>
      </div>

      <div className="card p-0">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map(category => (
                <tr key={category.id} className="hover:bg-gray-50">
                
                  <td className="font-medium text-gray-800">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleExpand(category.id)}
                    >
                      <img
                            src={`http://localhost:5000/${category.media}`} // or /uploads/${product.media} if needed
                            alt={category.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                     
                      {editMode?.id === category.id && editMode.type === 'category' ? (
                        <div className="flex items-center">
                          <input 
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="input py-1 px-2 text-sm"
                            autoFocus
                          />
                          <div className="ml-2 flex items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                saveEdits()
                              }}
                              className="text-green-600 hover:text-green-800 mr-1"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                cancelEditing()
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        category.category
                      )}
                    </div>
                  </td>
                  <td className="text-gray-500">
                    {category.description ? parse(category.description) : ''}
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {category.title}
                    </span>
                  </td>
                 
                </tr>
              ))}
              
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No categories found. Click "Add Category" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
