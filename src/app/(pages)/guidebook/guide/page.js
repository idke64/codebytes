"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import info from "@/markdown/information.json";

function Guide() {
  console.log(info.events.content);
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">Informational Database</h1>
        </div>
      </section>
      <section className="page-margins py-16 flex flex-col gap-y-6">
        <div className="grid-cols-5 grid gap-x-4">
          <Link className="hover:scale-105 duration-200" href="/guidebook">
            <div className="hover:bg-palette-2 bg-white pb-1 rounded-lg border-t-8 border-l-8 border-r-8 border-b-8 border-b-palette-2 border-t-palette-2 border-l-palette-2 border-r-palette-2 hover:text-white duration-200 group">
              <h5 className="text-center font-extrabold text-palette-1 px-2 py-2 group-hover:text-white">
                Return to ATLAS
              </h5>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-y-4">
          <Markdown>{info.events.content}</Markdown>
        </div>
      </section>
    </>
  );
}

export default Guide;
