'use  client'

import { useState } from 'react'
import { 
  Edit, 
  Trash, 
  Plus, 
  ChevronDown,
  ChevronRight 
} from 'lucide-react'
import { mockCategories } from '@/lib/data'

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories)
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [newSubcategory, setNewSubcategory] = useState('')
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  
  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1
      setCategories([
        ...categories,
        {
          id: newId,
          name: newCategory.name,
          description: newCategory.description,
          subcategories: [],
        }
      ])
      setNewCategory({ name: '', description: '' })
      setIsAddModalOpen(false)
    }
  }

  const handleAddSubcategory = (categoryId: number) => {
    if (newSubcategory.trim()) {
      setCategories(categories.map(category => 
        category.id === categoryId
          ? { 
              ...category, 
              subcategories: [...category.subcategories, newSubcategory] 
            }
          : category
      ))
      setNewSubcategory('')
      setEditingCategoryId(null)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id))
  }

  const handleDeleteSubcategory = (categoryId: number, subcategoryIndex: number) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { 
            ...category, 
            subcategories: category.subcategories.filter((_, index) => index !== subcategoryIndex) 
          }
        : category
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleExpand(category.id)}
                        className="mr-2 text-gray-400 hover:text-gray-600"
                      >
                        {expandedIds.includes(category.id) ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.description || 'No description'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {category.subcategories.length} subcategories
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setEditingCategoryId(category.id)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      title="Add Subcategory"
                    >
                      <Plus size={18} />
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      title="Edit Category"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Category"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              )}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category Name *</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="input"
                placeholder="Enter category name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                className="input"
                placeholder="Enter category description (optional)"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="btn bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="btn-primary"
                disabled={!newCategory.name.trim()}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {editingCategoryId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Add Subcategory to {categories.find(c => c.id === editingCategoryId)?.name}
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Subcategory Name *</label>
              <input
                type="text"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                className="input"
                placeholder="Enter subcategory name"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingCategoryId(null)}
                className="btn bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddSubcategory(editingCategoryId)}
                className="btn-primary"
                disabled={!newSubcategory.trim()}
              >
                Add Subcategory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Category Subcategories */}
      {categories.map(category => (
        expandedIds.includes(category.id) && (
          <div key={`sub-${category.id}`} className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b">
              <h3 className="font-medium">Subcategories of {category.name}</h3>
            </div>
            {category.subcategories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No subcategories found
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {category.subcategories.map((subcategory, index) => (
                  <li key={index} className="px-6 py-4 flex items-center justify-between">
                    <span>{subcategory}</span>
                    <div>
                      <button 
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        title="Edit Subcategory"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSubcategory(category.id, index)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Subcategory"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      ))}
    </div>
  )
}
 