"use client";

import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpFromBracket,
  faBarsStaggered,
  faCaretDown,
  faCaretRight,
  faCaretUp,
  faChevronRight,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/codebyteslogo.svg";
import logoWhite from "@/assets/codebyteslogowhite.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getDocument } from "@/config/firestore";
import AccountDropdown from "./AccountDropdown";
import { useRouter } from "next/navigation";
import defaultprofile from "@/assets/pictures/defaultprofile.png";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const route = usePathname();
  const [photoURL, setPhotoURL] = useState(defaultprofile);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (
        e.button == 0 &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !profileRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const menuRef = useRef();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (
        e.button == 0 &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await getDocument(["users"], user.uid);
        setUserData(userData);
      };
      if (user?.photoURL) {
        setPhotoURL(user.photoURL);
      }

      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`z-50 fixed right-4 bottom-8 duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handleScrollUp}
          className="h-7 w-7 bg-palette-1 rounded-lg flex items-center justify-center hover:scale-105 duration-75	"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-white h-4" />
        </button>
      </div>
      <div
        className={`${
          menuOpen && "max-lg:block"
        } hidden translate-x-0 bg-black/20 backdrop-blur-[2px] inset-0 z-[49] fixed transition-opacity duration-300`}
      />
      <div className="hidden max-lg:flex z-50">
        <div
          className={`fixed h-full w-[300px] bg-bg-1 right-0 top-0 z-50 shadow duration-300 transition-transform ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          ref={menuRef}
        >
          <div className="h-[64px] flex items-center justify-center">
            <h4>Navigation</h4>
          </div>

          <div className="flex flex-col w-full ">
            <Link href={"/about"} className="responsive-navlink">
              About
            </Link>
            <Link href={"/contests"} className="responsive-navlink">
              Contests
            </Link>

            <Link href={"/rules"} className="responsive-navlink">
              Rules
            </Link>

            {/* <Link href={"/partners"} className="responsive-navlink">
              Partners
            </Link> */}

            <Link href={"/blog"} className="responsive-navlink">
              Blog
            </Link>

            {user ? (
              <>
                <Link href={"/dashboard"} className="responsive-navlink">
                  Dashboard
                </Link>
                <button
                  onClick={() => handleLogout()}
                  className="responsive-navlink flex items-start text-white bg-red-500 hover:bg-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center py-4 px-4 gap-y-1">
                  <button className="btn primary-btn h-12">
                    <Link href={"/login"}>Login</Link>
                  </button>
                  <button className="btn secondary-btn h-12">
                    <Link href={"/signup"}>Sign Up</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav
        className={`${
          route === "/"
            ? scrolled
              ? "bg-white fixed shadow"
              : " fixed bg-transparent"
            : "bg-white sticky top-0 shadow"
        } w-full h-[60px] z-40 transition-colors duration-200 `}
        data-aos="fade-in-down"
      >
        <div className="h-full flex justify-between items-center page-margins relative">
          <div className="flex items-center gap-x-6 h-full">
            <Link href={"/"} className="flex items-center justify-center gap-1">
              <Image
                className="h-9 w-10"
                src={route === "/" ? (scrolled ? logo : logoWhite) : logo}
                alt="logo"
              />
              <h4
                className={`${
                  route === "/"
                    ? scrolled
                      ? "text-palette-1"
                      : "text-white "
                    : "text-palette-1"
                } font-extrabold`}
              >
                CodeBytes
              </h4>
            </Link>

            <div
              className={`flex gap-x-4 h-full items-center max-lg:hidden ${
                route === "/"
                  ? scrolled
                    ? "text-text-3"
                    : "text-white "
                  : "text-text-3"
              }`}
            >
              <Link
                href={"/about"}
                className={
                  route.includes("/about")
                    ? "active-navlink"
                    : `navlink ${
                        route === "/" && !scrolled && "hover:text-palette-3 "
                      }`
                }
              >
                About
              </Link>

              <Link
                href={"/contests"}
                className={
                  route.includes("/contests")
                    ? "active-navlink"
                    : `navlink ${
                        route === "/" && !scrolled && "hover:text-palette-3 "
                      }`
                }
              >
                Contests
              </Link>

              {/* 
                <Link href={"/"} className="navlink">
                  Events
                </Link>
              */}

              <Link
                href={"/rules"}
                className={
                  route.includes("/rules")
                    ? "active-navlink"
                    : `navlink ${
                        route === "/" && !scrolled && "hover:text-palette-3 "
                      }`
                }
              >
                Rules
              </Link>

              {/* 
                <Link href={"/"} className="navlink">
                  Partners
                </Link>
              */}

              <Link
                href={"/blog"}
                className={
                  route.includes("/blog")
                    ? "active-navlink"
                    : `navlink ${
                        route === "/" && !scrolled && "hover:text-palette-3 "
                      }`
                }
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="flex h-full items-center gap-x-3 max-lg:hidden">
            {user ? (
              <>
                {/* <button
                  onClick={() => handleLogout()}
                  className={`pb-0.5 font-semibold text-text-3 text-[15px] px-3 ${
                    route === "/" && !scrolled
                      ? "hover:text-palette-3 text-white"
                      : "hover:text-red-500"
                  }`}
                >
                  Logout
                </button> */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-x-2  rounded px-3 py-1 ${
                    route === "/" && !scrolled
                      ? "hover:bg-palette-2/70"
                      : "hover:bg-gray-100"
                  }`}
                  ref={profileRef}
                >
                  <div
                    className={`font-semibold text-[15px] text-text-3 ${
                      route === "/"
                        ? scrolled
                          ? "text-palette-1"
                          : "text-white "
                        : "text-palette-1"
                    }`}
                  >
                    {userData?.team_name}
                  </div>
                  <div className="h-7 w-7 overflow-hidden justify-center flex items-center rounded-full bg-white">
                    <Image
                      className="w-full h-full "
                      src={photoURL}
                      alt="profile picture"
                      width={200}
                      height={200}
                    />
                  </div>
                </button>

                <div
                  ref={dropdownRef}
                  className={`absolute px-3 top-14 py-4 drop-shadow right-0 bg-white rounded ${
                    showDropdown
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  } duration-300 before:content-[''] before:absolute before:-top-1.5 before:right-[19px] before:border-l-[8px] before:border-r-[8px] before:border-b-[8px] before:border-l-transparent before:border-r-transparent before:border-b-white`}
                >
                  <div className="flex flex-col gap-y-2">
                    <div className="flex justify-start items-center gap-x-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full overflow-hidden bg-white">
                        <Image
                          className="w-full h-full "
                          src={photoURL}
                          alt="profile picture"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="leading-none text-sm">
                          {userData?.team_name}
                        </span>
                        <p className="text-[11px] text-text-3 w-[160px] overflow-hidden">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col items-start">
                      <Link
                        href={"/dashboard"}
                        className="dropdown-link"
                        onClick={() => setShowDropdown(false)}
                      >
                        Dashboard
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Link>
                      <Link
                        href={"/dashboard/settings"}
                        className="dropdown-link"
                        onClick={() => setShowDropdown(false)}
                      >
                        Settings
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Link>
                    </div>
                    <hr />
                    <button
                      onClick={() => handleLogout()}
                      className="dropdown-link"
                    >
                      Logout
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={`
                    ${
                      route === "/"
                        ? scrolled
                          ? "text-text-3"
                          : "text-white hover:text-palette-3"
                        : "text-text-3"
                    } navlink`}
                >
                  Login
                </Link>
                <Link className="btn primary-btn h-9" href={"/signup"}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className="group rounded-lg w-9 h-9 hover:bg-palette-2 justify-center items-center duration-200 hidden max-lg:flex"
            onClick={() => setMenuOpen(true)}
          >
            <FontAwesomeIcon
              className={`h-6 group-hover:text-white  ${
                route === "/"
                  ? scrolled
                    ? "text-text-1"
                    : "text-white "
                  : "text-text-1"
              } ${menuOpen ? "hidden" : "block"}`}
              icon={faBarsStaggered}
            />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
