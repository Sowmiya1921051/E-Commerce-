import  { useState } from 'react'
import { Edit, Trash, Plus, ChevronDown, ChevronRight, Save } from 'lucide-react'

// Mock categories data
const mockCategories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Cameras']
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'Apparel and accessories',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories']
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    description: 'Products for home and kitchen use',
    subcategories: ['Furniture', 'Kitchen Appliances', 'Bedding', 'Decor', 'Cookware']
  },
  {
    id: 4,
    name: 'Beauty & Personal Care',
    description: 'Beauty, health, and personal care items',
    subcategories: ['Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Care']
  },
  {
    id: 5,
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear',
    subcategories: ['Fitness', 'Outdoor Recreation', 'Sports Equipment', 'Camping & Hiking']
  }
]

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories)
  const [modalOpen, setModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [subcategoryModal, setSubcategoryModal] = useState(false)
  const [newSubcategory, setNewSubcategory] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
  const [editMode, setEditMode] = useState<{id: number, type: 'category' | 'subcategory', index?: number} | null>(null)
  const [editValue, setEditValue] = useState('')
  
  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newId = Math.max(...categories.map(cat => cat.id)) + 1
      setCategories([...categories, {
        id: newId,
        name: newCategory.name,
        description: newCategory.description,
        subcategories: []
      }])
      setNewCategory({ name: '', description: '' })
      setModalOpen(false)
    }
  }
  
  // Handle deleting a category
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id))
    if (expandedCategory === id) {
      setExpandedCategory(null)
    }
  }
  
  // Toggle expanded view for a category
  const toggleExpand = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }
  
  // Open subcategory modal
  const openSubcategoryModal = (categoryId: number) => {
    setActiveCategoryId(categoryId)
    setNewSubcategory('')
    setSubcategoryModal(true)
  }
  
  // Add new subcategory
  const addSubcategory = () => {
    if (newSubcategory.trim() && activeCategoryId) {
      setCategories(categories.map(category => {
        if (category.id === activeCategoryId) {
          return {
            ...category,
            subcategories: [...category.subcategories, newSubcategory]
          }
        }
        return category
      }))
      setNewSubcategory('')
      setSubcategoryModal(false)
    }
  }
  
  // Delete subcategory
  const deleteSubcategory = (categoryId: number, subcategoryIndex: number) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        const newSubcategories = [...category.subcategories]
        newSubcategories.splice(subcategoryIndex, 1)
        return {
          ...category,
          subcategories: newSubcategories
        }
      }
      return category
    }))
  }
  
  // Start editing a category or subcategory
  const startEditing = (id: number, type: 'category' | 'subcategory', index?: number) => {
    setEditMode({ id, type, index })
    
    if (type === 'category') {
      const category = categories.find(c => c.id === id)
      if (category) setEditValue(category.name)
    } else if (type === 'subcategory' && typeof index === 'number') {
      const category = categories.find(c => c.id === id)
      if (category) setEditValue(category.subcategories[index])
    }
  }
  
  // Save edits
  const saveEdits = () => {
    if (!editMode || !editValue.trim()) return
    
    setCategories(categories.map(category => {
      if (category.id === editMode.id) {
        if (editMode.type === 'category') {
          return {
            ...category,
            name: editValue.trim()
          }
        } else if (editMode.type === 'subcategory' && typeof editMode.index === 'number') {
          const newSubcategories = [...category.subcategories]
          newSubcategories[editMode.index] = editValue.trim()
          return {
            ...category,
            subcategories: newSubcategories
          }
        }
      }
      return category
    }))
    
    setEditMode(null)
    setEditValue('')
  }
  
  // Cancel editing
  const cancelEditing = () => {
    setEditMode(null)
    setEditValue('')
  }
  
  return (
    <div>
      {/* Header with add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product Categories</h2>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} className="mr-1" />
          Add Category
        </button>
      </div>
      
      {/* Categories list */}
      <div className="card p-0">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Subcategories</th>
                <th>Actions</th>
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
                      <span className="mr-2 text-blue-600">
                        {expandedCategory === category.id ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                      
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
                        category.name
                      )}
                    </div>
                  </td>
                  <td className="text-gray-500">{category.description}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {category.subcategories.length}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => openSubcategoryModal(category.id)}
                        title="Add Subcategory"
                      >
                        <Plus size={18} />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => startEditing(category.id, 'category')}
                        title="Edit Category"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteCategory(category.id)}
                        title="Delete Category"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
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
      
      {/* Expanded subcategories */}
      {categories.map(category => (
        expandedCategory === category.id && (
          <div key={`subcategories-${category.id}`} className="mt-4 card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">Subcategories of {category.name}</h3>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => openSubcategoryModal(category.id)}
              >
                <Plus size={14} className="mr-1" />
                Add
              </button>
            </div>
            
            {category.subcategories.length === 0 ? (
              <p className="text-gray-500">No subcategories found</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {category.subcategories.map((subcategory, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    {editMode?.id === category.id && 
                     editMode.type === 'subcategory' && 
                     editMode.index === index ? (
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
                            onClick={saveEdits}
                            className="text-green-600 hover:text-green-800 mr-1"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-800">{subcategory}</span>
                    )}
                    
                    {!(editMode?.id === category.id && 
                       editMode.type === 'subcategory' && 
                       editMode.index === index) && (
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => startEditing(category.id, 'subcategory', index)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => deleteSubcategory(category.id, index)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      ))}
      
      {/* Add Category Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setModalOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="input"
                placeholder="Enter category name"
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                className="input"
                rows={3}
                placeholder="Enter category description"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddCategory}
                disabled={!newCategory.name.trim()}
              >
                Add Category
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Add Subcategory Modal */}
      {subcategoryModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setSubcategoryModal(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Subcategory to {categories.find(c => c.id === activeCategoryId)?.name}
            </h3>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                className="input"
                placeholder="Enter subcategory name"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setSubcategoryModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={addSubcategory}
                disabled={!newSubcategory.trim()}
              >
                Add Subcategory
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
 