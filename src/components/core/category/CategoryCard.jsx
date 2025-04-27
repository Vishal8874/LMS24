import { useSelector } from "react-redux"
import { deleteCategory } from "../../../services/operations/courseDetailsAPI"
import { RiDeleteBin6Line } from "react-icons/ri"


export default function CategoryCard({ category, onDelete }) {
  const { token } = useSelector((state) => state.auth)

  const handleDelete = async () => {
    const res = await deleteCategory(category._id, token)
    if (res?.success) {
      onDelete(category._id)
    }
  }

  return (
    <div className="border p-4 bg-richblack-700 rounded-md text-white flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-sm mt-1 text-richblack-200">{category.description}</p>
      </div>

      {/* Delete Icon */}
      <button onClick={handleDelete} title="Delete Category" className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
        <RiDeleteBin6Line size={20} />
      </button>
    </div>
  )
}
