"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import circuits from "@/assets/circuits.svg";
import centralcontest from "@/assets/centralcontest.png";
import wave from "@/assets/wave.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCalendarCheck,
  faCode,
  faDesktop,
  faDivide,
  faHourglassEmpty,
  faHourglassEnd,
  faPeopleGroup,
  faPizzaSlice,
  faRankingStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import TimelineCard from "@/components/TimelineCard";
import FAQSection from "@/components/FAQSection";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });
  return (
    <>
      <section className="h-[calc(100vh+60px)] relative ">
        <Image
          src={circuits}
          className="object-cover w-full h-full absolute bg-bg-3 -z-10"
          alt="circuits"
        />

        <div className="page-margins h-full flex justify-between items-center z-40">
          <div className="w-full flex justify-center -mt-24" data-aos="fade-up">
            <div className="flex flex-col w-[60%] max-lg:w-[75%] max-md:w-[98%] relative bottom-0 text-center gap-y-2">
              <h1 className=" text-white relative after:content-['CODEBYTES'] after:absolute after:text-palette-5 after:-top-6 after:text-lg after:font-bold after:left-[calc(50%-54px)] max-sm:text-4xl">
                Delve into the <span className="text-palette-5">complex</span>{" "}
                and <span className="text-palette-5">diverse</span> world of
                programming
              </h1>

              <div className="flex gap-3 justify-center">
                <button className="btn secondary-btn h-10">
                  <Link
                    href={"https://discord.gg/vJtmme2MVr"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </Link>
                </button>
              </div>
            </div>
            {/* <div className="flex flex-col w-[560px] relative bottom-24 rounded-md overflow-hidden border-white">
              <Image src={novembercontest} alt="novembercontest" />
            </div> */}
          </div>
        </div>
        <Image src={wave} className="absolute bottom-0 w-full" alt="wave" />
      </section>
      <section className="pb-12 mt-8 max-md:mt-14">
        <div className="page-margins">
          <div className="flex flex-col gap-y-10 ">
            <div className="flex flex-col gap-y-4" data-aos="fade-in">
              <div className="flex flex-col gap-y-3">
                <h2 className="relative block after:content-['COMPETITION'] after:font-bold after:absolute after:text-palette-5 after:-top-6 after:text-lg after:left-0 max-sm:text-4xl">
                  A Unique Take on{" "}
                  <span className="text-palette-5">Competitive Computing</span>
                </h2>
              </div>

              <p className="text-lg">
                Our competition, unlike many others, involves not only solving
                traditional programming problems but also a variety of tasks
                relevant to the vast field of computer science such as data
                science, web development, botting, and so much more
              </p>
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
              <div
                className="py-8 bg-white flex items-center justify-center rounded px-2 shadow duration-200 gap-x-6 max-sm:gap-x-4 "
                data-aos="zoom-in-out"
              >
                <div className="bg-palette-5 rounded-lg self-start h-16 w-16 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faDesktop}
                    className="h-8 text-white"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center w-[70%]">
                  <h3 className="text-palette-1">Events</h3>
                  <p>
                    Earn points by competing in different events, each requiring
                    their own unique set of skills
                  </p>
                </div>
              </div>
              <div
                className="py-8 bg-white flex items-center justify-center rounded px-2 shadow duration-200 gap-x-6 max-sm:gap-x-4 "
                data-aos="zoom-in-out"
              >
                <div className="bg-palette-5 rounded-lg self-start h-16 w-16 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className="h-8 text-white"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center w-[70%]">
                  <h3 className="text-palette-1">Collaborate</h3>
                  <p>
                    Work in teams of 4 to complete a variety of computer-related
                    tasks
                  </p>
                </div>
              </div>
              <div
                className="py-8 bg-white flex items-center justify-center rounded px-2 shadow duration-200 gap-x-6 max-sm:gap-x-4 "
                data-aos="zoom-in-out"
              >
                <div className="bg-palette-5 rounded-lg self-start h-16 w-16 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faRankingStar}
                    className="h-8 text-white"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center w-[70%]">
                  <h3 className="text-palette-1">Rankings</h3>
                  <p>
                    Compete against other schools and teams and compare rankings
                  </p>
                </div>
              </div>
              <div
                className="py-8 bg-white flex items-center justify-center rounded px-2 shadow duration-200 gap-x-6 max-sm:gap-x-4 "
                data-aos="zoom-in-out"
              >
                <div className="bg-palette-5 rounded-lg self-start h-16 w-16 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPizzaSlice}
                    className="h-8 text-white"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center w-[70%]">
                  <h3 className="text-palette-1">Fun</h3>
                  <p>
                    Win cool prizes and hang out with people from other schools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="page-margins" data-aos="zoom-in-out" />
      <section className="py-12">
        <div className="page-margins">
          <div className="flex flex-col gap-y-10 w-full">
            <div
              className="flex flex-col gap-y-3 items-center"
              data-aos="fade-in"
            >
              <h2 className="relative w-full justify-center text-center block after:content-['TIMELINE'] after:absolute after:font-bold after:text-palette-5 after:-top-6 after:text-lg after:left-[calc(50%-42.25px)] max-sm:text-4xl">
                What Happens on&nbsp;
                <span className="text-palette-5">Contest</span>
                &nbsp;Day
              </h2>
              <p className="text-lg self-center">
                A general timeline of how each of each of our individual
                contests will go
              </p>
            </div>

            <div className="relative mt-4">
              <div
                className="h-[calc(100%-108px)] mt-14 bg-neutral-300 w-0.5 absolute left-[calc(50%-1.5px)] max-md:hidden"
                data-aos="zoom-in-out"
              />
              <div className="w-full flex flex-col max-md:-my-4">
                <TimelineCard icon={faPeopleGroup} header="Create Teams">
                  <p>
                    Form teams up to 4 with whoever you want and register an
                    account for everyone to share. Be sure to come up with a
                    creative team name.
                  </p>
                </TimelineCard>
                <TimelineCard
                  icon={faCode}
                  header="Divide and Conquer"
                  position="right"
                >
                  <p>
                    Once the contest opens, feel free to split events amongst
                    your teammates. Remember, your goal is to score as much
                    points as possible. Any attempt is better than no attempt.
                  </p>
                </TimelineCard>
                <TimelineCard icon={faUtensils} header="Food and Concessions">
                  <p>
                    During the contest, food and drinks will be provided free of
                    charge. If you feel you need to take a break, come grab a
                    bite.
                  </p>
                </TimelineCard>
                <TimelineCard
                  icon={faHourglassEnd}
                  header="Contest Ends"
                  position="right"
                >
                  <p>
                    Once the contest time is up, no more submissions will be
                    allowed. We will then tally up the scores and update them
                    live on the leaderboard.
                  </p>
                </TimelineCard>

                <TimelineCard icon={faAward} header="Awards">
                  <p>
                    The top 3 overall teams and the top team from each
                    individual event will receive prizes ranging from candy to
                    gift cards.
                  </p>
                </TimelineCard>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="page-margins" data-aos="zoom-in-out" />
      <section className="py-12">
        <div className="page-margins">
          <div className="flex flex-col gap-y-6 relative">
            <FAQSection data-aos="fade-up" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
