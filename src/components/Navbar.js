"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpFromBracket,
  faBarsStaggered,
  faCaretDown,
  faCaretUp,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/codebyteslogo.svg";
import logoWhite from "@/assets/codebyteslogowhite.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getDocument } from "@/config/firestore";
import AccountDropdown from "./AccountDropdown";
import { useRouter } from "next/navigation";
import Banner from "./Banner";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const route = usePathname();
  const router = useRouter();

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

  const menuRef = useRef();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.button == 0 &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await getDocument("users", user.uid);
        setUserData(userData);
      };

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
                <Link
                  href={"/dashboard"}
                  className="responsive-navlink gap-x-2 flex items-center"
                >
                  Account
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
        <div className="h-full flex justify-between items-center page-margins">
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
                <button
                  onClick={() => handleLogout()}
                  className={`pb-0.5 font-semibold text-text-3 text-[15px] px-3 ${
                    route === "/" && !scrolled
                      ? "hover:text-palette-3 text-white"
                      : "hover:text-red-500"
                  }`}
                >
                  Logout
                </button>
                <Link href={"/dashboard"} className={`btn primary-btn h-9`}>
                  Account
                </Link>
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
