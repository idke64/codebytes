"use client";

import ContestCard from "@/components/ContestCard";
import { getCollection } from "@/config/firestore";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "/src/aos-animations.css";

function Contests() {
  const [contests, setContests] = useState();
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-sine",
      once: true,
    });
  });

  useEffect(() => {
    const fetchContests = async () => {
      let contestData = await getCollection(["contests"]);

      contestData.sort((a, b) => b.end_time.toDate() - a.end_time.toDate());

      setContests(contestData);
    };
    fetchContests();
  }, []);

  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            Contests
          </h1>
        </div>
      </section>

      {contests ? (
        <>
          <section className="page-margins py-8 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <h3>Contests</h3>
              <hr />
            </div>
            <div className="flex gap-x-6 max-sm:flex-col-reverse gap-y-6">
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 min-h-[206px] w-[calc(((100%-49px+24px)*2)/3)] max-lg:w-1/2 max-sm:w-full">
                {contests &&
                  contests.map(
                    (contest, index) =>
                      index != 0 && (
                        <ContestCard
                          key={index}
                          title={contest.name}
                          location={contest.location}
                          start_time={contest.start_time.toDate()}
                          end_time={contest.end_time.toDate()}
                          events={contest.events.length}
                          id={contest.id}
                        />
                      )
                  )}
              </div>
              <div className="border-l max-sm:hidden" />
              <div className="grid grid-cols-1 gap-6 max-lg:w-1/2 w-[calc(((100%-49px-16px)*1)/3)] max-sm:w-full">
                <ContestCard
                  title={contests[0].name}
                  location={contests[0].location}
                  start_time={contests[0].start_time.toDate()}
                  end_time={contests[0].end_time.toDate()}
                  events={contests[0].events.length}
                  id={contests[0].id}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="h-[828px]">
          <div className="flex justify-center items-center w-full h-28">
            <div className="loading-spinner-large"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default Contests;
