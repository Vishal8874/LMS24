import React, { useEffect, useState } from "react"
import { getAllStudents } from "../../../../services/operations/profileAPI"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import StudentCard from "../../Students/StudentCard" // Adjust path if needed

const StudentsManagement = () => {
  const { token } = useSelector((state) => state.auth)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStudents = async () => {
    setLoading(true)
    const result = await getAllStudents(token)
    if (result) {
      setStudents(result)
      console.log("temp", result)
    } else {
      toast.error("Failed to load students")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSuspend = async (studentId) => {
    // future implementation
    console.log("Suspend:", studentId)
  }

  const handleDelete = async (studentId) => {
    // future implementation
    console.log("Delete:", studentId)
  }

  if (loading) {
    return <div className="text-white p-6">Loading students...</div>
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">Student Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard
            key={student._id}
            student={{
              _id: student._id,
              name: `${student.firstName} ${student.lastName}`,
              email: student.email,
              courses: student.courses.map((course) => course.courseName || "Course"),
            }}
            onSuspend={handleSuspend}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default StudentsManagement
