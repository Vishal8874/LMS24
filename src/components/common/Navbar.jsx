import { useEffect, useRef, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import useOnClickOutside from "../../hooks/useOnClickOutside"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const mobileMenuRef = useRef(null)

  useOnClickOutside(mobileMenuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  })

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.error("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <div className={`relative z-50 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""}`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-1 rounded-lg shadow-lg tracking-wide uppercase">
            LMS24
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="list-none">
              {link.title === "Catalog" ? (
                <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : ""}`}>
                  <p>{link.title}</p>
                  <BsChevronDown />
                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : subLinks.length ? (
                      subLinks
                        .filter((subLink) => subLink?.courses?.length > 0)
                        .map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                    ) : (
                      <p className="text-center">No Courses Found</p>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link.path}>
                  <p className={`${matchRoute(link.path) ? "text-yellow-25" : ""}`}>
                    {link.title}
                  </p> 
                </Link>
              )}
            </li>
          ))}
        </nav>

        {/* Auth / Cart / Profile */}
        <div className="hidden md:flex items-center gap-x-4">
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-14 left-0 w-full bg-richblack-800 px-6 py-4 flex flex-col gap-4 md:hidden"
        >
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="group relative">
                <p className="text-richblack-25 cursor-pointer">{link.title}</p>
                <div className="ml-2 mt-2 px-4 hidden opacity-0 group-hover:block group-hover:opacity-100 transition-all duration-200">
                  {subLinks
                    .filter((subLink) => subLink?.courses?.length > 0)
                    .map((subLink, i) => (
                      <Link
                        key={i}
                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                        className="block text-sm text-richblack-100 py-1 hover:text-yellow-25"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                </div>
              </div>
              
              ) : (
                <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                  <p className="text-richblack-25">{link.title}</p>
                </Link>
              )}
            </div>
          ))}

          {/* Auth Buttons */}
          <div className="pt-4 border-t border-richblack-700 flex flex-col gap-2">
            {!token ? (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="text-left text-richblack-100 py-2 w-full">Log in</button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="text-left text-richblack-100 py-2 w-full">Sign up</button>
                </Link>
              </>
            ) : (
              <ProfileDropdown
                isMobile={true}
                isMenuOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
