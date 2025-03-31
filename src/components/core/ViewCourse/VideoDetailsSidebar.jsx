import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"; // Icons for collapse/expand
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

      // Set current section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // Set current sub-section
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="w-[300px] bg-richblack-800 text-white h-screen p-5 border-r border-richblack-700 overflow-y-auto">
      {/* Top Buttons */}
      <div className="flex flex-col gap-4 mb-5">
        {/* Back Button */}
        <button
          className="bg-richblack-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-richblack-600 transition"
          onClick={() => navigate("/dashboard/enrolled-courses")}
        >
          ← Back to Courses
        </button>

        {/* Add Review Button */}
        <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
      </div>

      {/* Course Details */}
      <div className="bg-richblack-700 p-4 rounded-lg shadow-md mb-5">
        <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>
        <p className="text-sm text-richblack-300">
          {completedLectures?.length} / {totalNoOfLectures} Completed
        </p>
      </div>

      {/* Course Sections & Subsections */}
      <div className="space-y-3">
        {courseSectionData.map((course, index) => (
          <div key={index}>
            {/* Section */}
            <div
              className="flex justify-between items-center bg-richblack-700 px-4 py-3 rounded-lg cursor-pointer hover:bg-richblack-600 transition"
              onClick={() => setActiveStatus(course?._id)}
            >
              <span className="font-medium">{course?.sectionName}</span>
              {activeStatus === course?._id ? (
                <IoIosArrowDown className="text-lg" />
              ) : (
                <IoIosArrowForward className="text-lg" />
              )}
            </div>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div className="ml-5 mt-2 border-l border-richblack-600 pl-3 space-y-2">
                {course.subSection.map((topic, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                      videoBarActive === topic._id
                        ? "bg-yellow-50 text-richblack-900"
                        : "bg-richblack-900 text-white hover:bg-richblack-700"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="cursor-pointer"
                    />
                    <span className="text-sm">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
