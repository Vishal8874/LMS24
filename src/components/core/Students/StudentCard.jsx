import React from 'react'
import { FaBan, FaTrash } from "react-icons/fa"

const StudentCard = ({ student, onSuspend, onDelete }) => {
  return (
    <div className="bg-richblack-700 p-4 rounded-md border shadow-md">
      <h3 className="text-lg font-bold text-richblack-5">{student.name}</h3>
      <p className="text-sm text-richblack-200">{student.email}</p>

      {/* Active/Suspended Status */}
      <p className="text-sm mt-1 mb-2">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            student.active
              ? "bg-green-700 text-green-200"
              : "bg-red-700 text-red-200"
          }`}
        >
          {student.active ? "Active" : "Suspended"}
        </span>
      </p>

      {/* Enrolled Courses List */}
      <div className="mt-2">
        <p className="text-sm text-richblack-100 font-medium mb-1">Enrolled Courses:</p>
        <ul className="list-disc list-inside text-richblack-300 text-sm space-y-1 max-h-24 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-richblack-600 scrollbar-track-transparent">
          {student.courses.length > 0 ? (
            student.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))
          ) : (
            <li>None</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-4">
        <button onClick={() => onSuspend(student._id)} title="Suspend">
          <FaBan className="text-yellow-400 hover:text-yellow-300" />
        </button>
        <button onClick={() => onDelete(student._id)} title="Delete">
          <FaTrash className="text-pink-400 hover:text-pink-300" />
        </button>
      </div>
    </div>
  )
}

export default StudentCard
