import React, { useEffect, useState } from "react"
import { getAllCourses, fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI"
import CourseManagementCard from "../../CourseManagement/CourseManagementCard"

export default function CourseManagement() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoursesWithDetails = async () => {
      try {
        const allCourses = await getAllCourses()

        // Fetch courseDetails for each course in parallel
        const detailedCourses = await Promise.all(
          allCourses.map(async (course) => {
            const detailsResponse = await fetchCourseDetails(course._id)
            return {
              ...course,
              ...detailsResponse?.data?.courseDetails,
              totalDuration: detailsResponse?.data?.totalDuration,
            }
          })
        )

        setCourses(detailedCourses)
      } catch (err) {
        console.error("Error fetching course details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCoursesWithDetails()
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-8">Course Management</h1>

      {loading ? (
        <p className="text-center text-richblack-300">Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-start">
          {courses.map((course) => (
            <CourseManagementCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-richblack-300">No courses found.</p>
      )}
    </div>
  )
}
