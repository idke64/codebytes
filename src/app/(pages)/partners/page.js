import React from "react";
import Image from "next/image";
import Link from "next/link";
import circuits from "@/assets/circuits.svg";
import pioneer from "@/assets/pioneer.jpeg";
import npl from "@/assets/npl.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faGraduationCap,
  faPerson,
  faGift,
  faHeart,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Partners() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <h1 className="flex items-center justify-center font-weight: 700 text-5xl text-[hsl(218,36%,15%)]">
            Sponsors Who Make Us Possible
          </h1>
          <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
            <div className="bg-palette-5 rounded-full h-16 w-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faGift} className="h-8 text-white" />
            </div>
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
          </div>
        </div>
      </div>

      <div class="-m-1 flex flex-wrap md:-m-2">
        <div class="flex w-1/2 flex-wrap">
          <div class="w-1/2 p-1 md:p-2">
            <div className="p-5 block h-full w-full rounded-lg object-cover object-center px-5 py-5 shadow-lg bg-gradient-to-l from-pink-200  to-indigo-300">
              <FontAwesomeIcon icon={faHeart} className="h-8 text-white" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                $5K Funding Awarded
              </h5>
              <p className=" font-normal text-gray-700">
                Codebytes has recieved 5K+ funding in total from our sponsors
                and GoFundMe.
              </p>
            </div>
          </div>
          <div class="w-1/2 p-1 md:p-2">
            <div className=" block h-full w-full rounded-lg object-cover object-center px-5 py-5 shadow-lg bg-gradient-to-l from-pink-200  to-indigo-300">
              <FontAwesomeIcon icon={faCalendar} className="h-8 text-white" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                1+ Years
              </h5>
              <p className=" font-normal text-gray-700">
                Codebytes has been impacting students nationwide since being
                founded in 2030.{" "}
              </p>
            </div>
          </div>
          <div class="w-full p-1 md:p-2">
            <div className=" block h-full w-full rounded-lg object-cover object-center px-5 py-3 shadow-lg bg-gradient-to-l from-pink-200  to-indigo-300">
              <h5 className="py-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pioneer Academics
              </h5>
              <Image
                src={pioneer}
                alt="pioneer"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div class="flex w-1/2 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <div className=" block h-full w-full rounded-lg object-cover object-center px-5 py-3 shadow-lg bg-gradient-to-l from-pink-200  to-indigo-300">
              <h5 className="py-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                +100 Participants
              </h5>
              <p className=" font-normal text-gray-700">
                Codebytes 2023 hackathron had a total of +100 participants and
                5K in prize money.{" "}
              </p>
              <Image
                src={circuits}
                className="rounded-xl mt-2"
                alt="NVHS Computing Team 2022-2023. Gnomon was funded by NVHS Computing Team Captains"
              />
            </div>
          </div>
          <div class="w-full p-1 md:p-2">
            <div className=" block h-full w-full rounded-lg object-cover object-center px-5 py-3 shadow-lg bg-gradient-to-l from-pink-200  to-indigo-300">
              <h5 className="py-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Naperville Public Library
              </h5>
              <Image
                src={npl}
                className="rounded-xl mt-2"
                alt="NVHS Computing Team 2022-2023. Gnomon was funded by NVHS Computing Team Captains"
              />
            </div>
          </div>
        </div>
      </div>
      <section>
        <div
          className="flex-wrap grid grid-cols-2 gap-4 text-gray-500 md:grid-cols-3 lg:grid-cols-4
                dark:text-gray-400"
        ></div>
      </section>
    </>
  );
}

export default Partners;
