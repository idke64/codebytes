"use client";
import React from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import defaultprofile from "@/assets/pictures/defaultprofile.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faGear,
  faGears,
  faPeopleGroup,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";

function DashboardLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });
  const route = usePathname();
  const { userData, user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <section className="bg-bg-3">
            <div className="page-margins py-5 flex items-center">
              <h1 className="text-white text-5xl" data-aos="fade-in-right">
                Dashboard
              </h1>
            </div>
          </section>
          <section className="page-margins py-8">
            <div className="flex gap-6">
              <div className="flex flex-col gap-y-6">
                <div className="shadow py-4 px-8 flex items-center flex-col gap-y-4">
                  <div className="w-40 h-40 rounded-full overflow-hidden relative">
                    <Image src={defaultprofile} alt="profile picture" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-y-1 w-full">
                    {userData ? (
                      <>
                        <h5 className="text-center ">{userData.team_name}</h5>
                        <p className="text-sm text-center">{userData.email}</p>
                        <p className="text-sm">
                          Joined{" "}
                          {userData.created_at
                            .toDate()
                            .toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="h-7 w-full animate-pulse bg-neutral-200"></div>
                        <div className="h-5 w-full animate-pulse bg-neutral-200"></div>
                      </>
                    )}
                  </div>
                </div>
                <div className=" bg-white rounded w-full shadow self-start overflow-hidden p-1.5">
                  <div className="w-full bg-white  items-center flex flex-col">
                    <Link
                      href={"/dashboard"}
                      className={route === "/dashboard" ? "active-tab" : "tab"}
                    >
                      <FontAwesomeIcon className="h-4" icon={faDashboard} />
                      Dashboard
                    </Link>
                    <Link
                      href={"/dashboard/settings"}
                      className={
                        route === "/dashboard/settings" ? "active-tab" : "tab"
                      }
                    >
                      <FontAwesomeIcon className="h-4" icon={faWrench} />
                      Settings
                    </Link>
                    {/* <Link
                      href={"/dashboard/team"}
                      className={
                        route === "/dashboard/team" ? "active-tab" : "tab"
                      }
                    >
                      <FontAwesomeIcon className="h-4" icon={faPeopleGroup} />
                      Team
                    </Link> */}
                  </div>
                </div>
              </div>

              {children}
            </div>
          </section>
        </>
      ) : loading ? (
        <div className="h-[calc(100vh-128px)]">
          <div className="flex justify-center items-center w-full h-24">
            <div className="loading-spinner-large"></div>
          </div>
        </div>
      ) : (
        !user && <NotFound />
      )}
    </>
  );
}

export default DashboardLayout;
