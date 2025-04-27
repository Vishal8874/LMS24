import React from "react"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { formatDate } from "../../../services/formatDate"

const CourseManagementCard = ({ course }) => {
  return (
    <div className="w-[450px] group relative rounded-md border border-richblack-700 bg-richblack-800 p-6 shadow-md duration-200 hover:border-white hover:shadow-lg">
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="mb-4 h-[180px] w-full rounded-md object-cover transition-all duration-200 group-hover:opacity-90"
      />

      <h2 className="text-xl font-bold text-richblack-5 mb-1 line-clamp-2">
        {course.courseName}
      </h2>

      <p className="text-sm text-richblack-300 mb-1">
        <span className="text-richblack-100 font-medium">Instructor:</span>{" "}
        {course.instructor?.firstName} {course.instructor?.lastName}
      </p>

      {course?.category && (
        <p className="text-sm text-richblack-300 mb-1">
          <span className="text-richblack-100 font-medium">Category:</span>{" "}
          {course.category.name}
        </p>
      )}

      {course?.totalDuration && (
        <p className="text-sm text-richblack-300 mb-1">
          <span className="text-richblack-100 font-medium">Duration:</span>{" "}
          {course.totalDuration}
        </p>
      )}

      <p className="text-sm text-richblack-300 mb-1">
        <span className="text-richblack-100 font-medium">Students Enrolled:</span>{" "}
        {course?.studentsEnrolled?.length || 0}
      </p>

      <p className="text-sm text-richblack-300 mb-4">
        <span className="text-richblack-100 font-medium">Created:</span>{" "}
        <span className="text-yellow-100">{formatDate(course.createdAt)}</span>
      </p>

      <div className="mt-auto flex gap-3">
        <button
          title="Edit"
          className="rounded-md border border-yellow-400 p-2 text-yellow-300 transition hover:bg-yellow-300 hover:text-richblack-900"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          title="Delete"
          className="rounded-md border border-yellow-400 p-2 text-yellow-300 transition hover:bg-yellow-300 hover:text-richblack-900"
        >
          <RiDeleteBin6Line size={18} />
        </button>
      </div>
    </div> 
  )
}

export default CourseManagementCard
