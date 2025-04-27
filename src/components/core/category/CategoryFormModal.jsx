import { useState } from "react"
import { createCategory } from "../../../services/operations/courseDetailsAPI"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"

// import IconBtn from "../../common/IconBtn"

export default function CategoryFormModal({ setIsModalOpen, refreshCategories }) {
  const [form, setForm] = useState({ name: "", description: "" })
  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await createCategory(form, token)
    if (res) {
      toast.success("Category created")
      refreshCategories()
      setIsModalOpen(false)
    } else {
      toast.error("Failed to create category")
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="w-[90%] max-w-md bg-richblack-800 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-white">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white">Category Name</label>
            <input
              type="text"
              className="form-style w-full"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-white">Description</label>
            <textarea
              className="form-style w-full min-h-[100px]"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-sm text-pink-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-50 text-richblack-900 px-4 py-1.5 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
