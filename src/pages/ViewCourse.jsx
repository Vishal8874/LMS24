import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, [courseId, token, dispatch]);

  return (
    <div className="flex h-screen bg-richblack-900 text-white">
      {/* Sidebar (Fixed Width) */}
      <div className="w-[300px] bg-richblack-800 border-r border-richblack-700">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Main Content (Flexible Width) */}
      <div className="flex-grow overflow-auto p-6">
        <Outlet />
      </div>

      {/* Review Modal (Appears Centered) */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
