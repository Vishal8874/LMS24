import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10 text-center text-white text-lg">Loading...</div>
    );
  }

  return (
    <div className="relative flex h-screen">
      {/* Sidebar (Full Height) */}
      <div className="w-[250px] h-screen bg-richblack-900 shadow-lg hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 h-screen overflow-auto bg-richblack-800">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
