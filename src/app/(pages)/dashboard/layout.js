"use client";
import React from "react";
import Image from "next/image";
import defaultprofile from "@/assets/pictures/defaultprofile.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";
import { uploadProfilePicture } from "@/config/storage";

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
  const [photoURL, setPhotoURL] = useState(defaultprofile);
  const [pictureFile, setPictureFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("File size should be less than 2MB");
        return;
      }
      if (!file.type.includes("image")) {
        setErrorMsg("File should be an image");
        return;
      }

      setPictureFile(file);
    }
  };

  const handleSavePicture = async () => {
    setLoading(true);
    const url = await uploadProfilePicture(pictureFile, user);
    setPhotoURL(url);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
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
                <div className="shadow py-4 px-8 flex items-center flex-col gap-y-1">
                  <div className="flex flex-col gap-y-2">
                    <div className="w-40 h-40 rounded-[50%] overflow-hidden relative flex justify-center group bg-white">
                      <Image
                        src={photoURL}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        alt="profile picture"
                      />
                    </div>
                    <div className="flex gap-x-2">
                      <button
                        disabled={loading}
                        className="btn primary-btn h-9 overflow-hidden relative"
                      >
                        Upload
                        <input
                          className="h-full opacity-0 z-10 absolute left-0"
                          onChange={handlePictureUpload}
                          type="file"
                        />
                      </button>
                      <div className="group relative flex justify-center">
                        <button
                          disabled={!pictureFile || loading}
                          onClick={handleSavePicture}
                          className="btn secondary-btn h-9"
                        >
                          Save
                        </button>
                        {!pictureFile && (
                          <span className="disabled-info">
                            No picture selected
                          </span>
                        )}
                      </div>
                    </div>
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
