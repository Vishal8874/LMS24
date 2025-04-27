import React, { useEffect, useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import CategoryCard from '../../category/CategoryCard'
import CategoryFormModal from '../../category/CategoryFormModal'
import { fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI'

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to fetch and update categories
  const refreshCategories = async () => {
    setLoading(true)
    const result = await fetchCourseCategories()
    if (result?.length > 0) {
      setCategories(result)
    } else {
      setCategories([])
    }
    setLoading(false)
  }

  // Fetch on mount
  useEffect(() => {
    refreshCategories()
  }, [])

  return (
    <div className="text-white px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Categories</h2>
        <IconBtn text="Add Category" onclick={() => setIsModalOpen(true)} />
      </div>

      {/* Category List */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} 
            onDelete={(id) =>
              setCategories((prev) => prev.filter((cat) => cat._id !== id))
            }
            />
          ))}
        </div>
      ) : (
        <p className="text-richblack-200">No categories found.</p>
      )}

      {/* Category Form Modal */}
      {isModalOpen && (
        <CategoryFormModal
          setIsModalOpen={setIsModalOpen}
          refreshCategories={refreshCategories}
        />
      )}
    </div>
  )
}
