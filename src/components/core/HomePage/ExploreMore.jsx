import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]); // Track active tab
  const [courses, setCourses] = useState(HomePageExplore[0].courses); // Courses for the active tab
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading); // Active course card

  // Function to handle tab change
  const setMyCards = (value) => {
    setCurrentTab(value);

    // Filter courses for the selected tab
    const result = HomePageExplore.find((course) => course.tag === value);

    if (result) {
      setCourses(result.courses); // Update courses for the tab
      setCurrentCard(result.courses[0].heading); // Set the first course as active
    }
  };

  return (
    <div>
      {/* Explore More Section */}
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Unlock the <HighlightText text={"Power of Code"} />
          <p className="text-center text-lg font-semibold text-richblack-300 mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-row gap-10 rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-3 py-2">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`text-[16px] font-semibold flex flex-row items-center gap-2 ${
              currentTab === ele
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-2 py-2`}
            onClick={() => setMyCards(ele)} // Update tab and courses
          >
            {ele}
          </div>
        ))}
      </div>

      {/* Course Cards Section */}
      <div className="hidden lg:block lg:h-[200px]">
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
          {courses.map((element, index) => (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
