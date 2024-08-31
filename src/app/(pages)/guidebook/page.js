"use client";

import Link from "next/link";

function Guidebook() {
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">Guidebook</h1>
        </div>
      </section>
      <section className="page-margins py-8 flex flex-col gap-y-6">
        <h2>ATLAS</h2>
        <h3>Foreword</h3>
        <div className="flex flex-col gap-y-4">
          <p>
            Welcome to the Guidebook&apos;s Atlas page! Here, you can access any
            of the pages we prepared for your success in here at CodeBytes! The
            general recommendation is that you view the Rules & Guidelines tab
            to start, then investigate the Informational Database page for all
            you need to know about the competitions! Go slow while reading, you
            won&apos;t want to miss anything!
            <br></br>
            <br></br>
          </p>
          <hr type="" className="h-1 bg-palette-2"></hr>
          <section className="page-margins py-10 flex flex-col gap-y-6">
            <div className="grid-cols-3 grid gap-x-5">
              <Link
                className="hover:scale-105 duration-200"
                href="/guidebook/rules"
              >
                <div className="hover:bg-palette-2 duration-200 bg-white pb-1 rounded-lg duration-200 border-t-8 border-l-8 border-r-8 border-b-8 border-b-palette-2 border-t-palette-2 border-l-palette-2 border-r-palette-2 hover:text-white duration-200 group">
                  <h4 className="text-center font-extrabold text-palette-1 px-4 py-4 group-hover:text-white">
                    Rules & Guidelines
                  </h4>
                </div>
              </Link>
              <Link
                className="hover:scale-105 duration-200"
                href="/guidebook/guide"
              >
                <div className="hover:bg-palette-2 duration-200 bg-white pb-1 rounded-lg duration-200 border-t-8 border-l-8 border-r-8 border-b-8 border-b-palette-2 border-t-palette-2 border-l-palette-2 border-r-palette-2 hover:text-white duration-200 group">
                  <h4 className="text-center font-extrabold text-palette-1 px-4 py-4 group-hover:text-white">
                    Informational Database
                  </h4>
                </div>
              </Link>
              <Link
                className="hover:scale-105 duration-200"
                href="/guidebook/defunct"
              >
                <div className="hover:bg-palette-2 duration-200 bg-white pb-1 rounded-lg duration-200 border-t-8 border-l-8 border-r-8 border-b-8 border-b-palette-2 border-t-palette-2 border-l-palette-2 border-r-palette-2 hover:text-white duration-200 group">
                  <h4 className="text-center font-extrabold text-palette-1 px-4 py-4 group-hover:text-white">
                    DeFunct Language
                  </h4>
                </div>
              </Link>
            </div>
            <br></br>
            <hr type="" className="h-1 bg-palette-2"></hr>
          </section>
        </div>
      </section>
    </>
  );
}

export default Guidebook;
