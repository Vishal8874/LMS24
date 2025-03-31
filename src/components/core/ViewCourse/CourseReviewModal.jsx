import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import ReactStars from "react-rating-stars-component";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]); // ✅ Fix: Added `setValue` as a dependency

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    try {
      await createRating(
        {
          courseId: courseEntireData?._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      );
      setReviewModal(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[400px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-richblack-5">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            className="text-richblack-200 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="mt-4 flex items-center gap-3">
          <img
            src={user?.image}
            alt="User"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div>
            <p className="text-richblack-5 font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">Posting Publicly</p>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col">
          {/* Star Rating */}
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />

          {/* Review Input */}
          <div className="mt-4">
            <label htmlFor="courseExperience" className="text-richblack-200">
              Add Your Experience*
            </label>
            <textarea
              id="courseExperience"
              placeholder="Add Your Experience here"
              {...register("courseExperience", { required: true })}
              className="form-style min-h-[130px] w-full p-2 rounded-md bg-richblack-700 text-white border border-richblack-500"
            />
            {errors.courseExperience && (
              <span className="text-red-500 text-sm">
                Please add your experience
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setReviewModal(false)}
              className="rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              Cancel
            </button>
            <IconBtn text="Save" onClick={handleSubmit(onSubmit)} /> {/* ✅ Fix: onClick added */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
