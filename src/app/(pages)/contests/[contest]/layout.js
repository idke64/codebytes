"use client";

import {
  faBullhorn,
  faCircleNodes,
  faDesktop,
  faHouse,
  faLaptopCode,
  faRankingStar,
  faRightFromBracket,
  faRightToBracket,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { getDocument } from "@/config/firestore";
import { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";
import contestInfo from "@/markdown/contests.json";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";

function ContestLayout({ children }) {
  const route = usePathname();
  const params = useParams();
  const contestId = params.contest;

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });
  return (
    <>
      {contestId in contestInfo ? (
        <>
          <section className="bg-bg-3 mb-6">
            <div className="page-margins py-5 flex items-center">
              <h1 className="text-white text-5xl" data-aos="fade-in-right">
                {contestInfo[contestId].name}
              </h1>
            </div>
          </section>
          <section className="page-margins gap-y-6 flex-col flex">
            <div className=" bg-white rounded w-full shadow self-start overflow-hidden p-1.5">
              <div className="w-full bg-white justify-center items-center grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-1">
                <Link
                  href={`/contests/${contestId}`}
                  className={`group ${
                    route === `/contests/${contestId}` ? "active-tab" : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faDesktop} />
                  Contest
                </Link>
                <Link
                  href={`/contests/${contestId}/events`}
                  className={`group ${
                    route.includes(`/contests/${contestId}/events`)
                      ? "active-tab"
                      : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faHouse} />
                  Events
                </Link>
                <Link
                  href={`/contests/${contestId}/rankings`}
                  className={`group ${
                    route.includes(`/contests/${contestId}/rankings`)
                      ? "active-tab"
                      : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faRankingStar} />
                  Rankings
                </Link>
                <Link
                  href={`/contests/${contestId}/problems`}
                  className={`group ${
                    route.includes(`/contests/${contestId}/problems`)
                      ? "active-tab"
                      : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faCircleNodes} />
                  Problems
                </Link>
                <Link
                  href={`/contests/${contestId}/submissions`}
                  className={`group ${
                    route.includes(`/contests/${contestId}/submissions`)
                      ? "active-tab"
                      : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faRightToBracket} />
                  Submissions
                </Link>
                <Link
                  href={`/contests/${contestId}/clarifications`}
                  className={`group ${
                    route.includes(`/contests/${contestId}/clarifications`)
                      ? "active-tab"
                      : "tab"
                  }`}
                >
                  <FontAwesomeIcon className="h-4" icon={faBullhorn} />
                  Clarifications
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full">{children}</div>
          </section>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default ContestLayout;
