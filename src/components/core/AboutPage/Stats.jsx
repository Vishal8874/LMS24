import React from 'react';

const Stats = [
    { count: "5K+", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="my-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-richblack-800 p-6 md:p-10 rounded-lg shadow-lg">
          {Stats.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-300">
                {data.count}
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-richblack-300 mt-2">
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
