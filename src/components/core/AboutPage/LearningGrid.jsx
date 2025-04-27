import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Empowering Education for",
    highlightText: "Everyone, Everywhere",
    description:
      "LMS24 connects learners with top universities and industry leaders, offering flexible and career-relevant online education for individuals and organizations globally.",
    BtnText: "Explore Courses",
    BtnLink: "/catalog",
  },
  {
    order: 1,
    heading: "Industry-Aligned Curriculum",
    description:
      "Our courses are designed in collaboration with top companies to ensure you're learning the most up-to-date skills that employers are looking for.",
  },
  {
    order: 2,
    heading: "Engaging Learning Methods",
    description:
      "From interactive lessons to real-world projects and live sessions, our platform fosters hands-on learning to boost understanding and retention.",
  },
  {
    order: 3,
    heading: "Certified & Recognized",
    description:
      "Earn industry-recognized certificates upon completion, helping you stand out in your job applications or career advancement.",
  },
  {
    order: 4,
    heading: "Automated Assessment",
    description:
      "Stay on track with built-in quizzes, coding challenges, and auto-grading tools that give instant feedback and help reinforce learning.",
  },
  {
    order: 5,
    heading: "Job-Ready Skills",
    description:
      "Whether you're switching careers or upgrading your skillset, our courses are designed to prepare you for real-world challenges and job opportunities.",
  },
];


const LearningGrid = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {LearningGridArray.map((card, i) => {
          return (
            <div
              key={i}
              className={`rounded-md min-h-[150px] flex flex-col justify-between ${i === 0 ? "xl:col-span-2" : ""
                } ${card.order % 2 === 1
                  ? "bg-richblack-700"
                  : card.order % 2 === 0
                    ? "bg-richblack-800"
                    : "bg-transparent"
                } ${card.order === 3 ? "xl:col-start-2" : ""}`}
            >

              {card.order < 0 ? (
                <div className="flex flex-col gap-3 h-full justify-between p-6">
                  <div className="text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug">
                    {card.heading} <HighlightText text={card.highlightText} />
                  </div>
                  <p className="text-richblack-300 font-medium text-sm md:text-base">
                    {card.description}
                  </p>
                  <div className="mt-4 hidden lg:block">
                    <CTAButton active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </CTAButton>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex flex-col gap-4 h-full">
                  <h1 className="text-richblack-5 text-lg md:text-xl font-semibold">
                    {card.heading}
                  </h1>
                  <p className="text-richblack-300 font-medium text-sm md:text-base">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningGrid;
