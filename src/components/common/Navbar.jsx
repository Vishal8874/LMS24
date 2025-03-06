import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python"
//   },
//   {
//     title: "web dev",
//     link: "/catalog/web-development"
//   },
// ];


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  // Function to check if the current route matches the given route
  const matchRoute = (route) => matchPath(route, location.pathname);

  // Fetch catalog subLinks
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      if (result?.data?.data) {
        setSubLinks(result.data.data);
      } else {
        console.error("API response is missing data:", result);
      }
    } catch (error) {
      console.error("Could not fetch the catalog list:", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="StudyNotion" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />

                    <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>
                      <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>

                      </div>
                      {
                        subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link key={index} to={subLink.link} className="px-4 py-2 hover:bg-richblack-100">
                              {subLink.title}
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">No Categories Available</div>
                        )
                      }

                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Actions (Cart, Login, Signup, Profile) */}
        <div className="flex gap-x-4 items-center">
          {/* Shopping Cart (only for students) */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-25" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-yellow-25 text-black text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Login & Signup */}
          {token === null && (
            <div>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Profile Dropdown (if logged in) */}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
