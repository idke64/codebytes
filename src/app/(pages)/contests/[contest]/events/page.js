"use client";
import React from "react";
import Markdown from "react-markdown";
import contestInfo from "@/markdown/contests.json";
import { useParams } from "next/navigation";

function ContestEvents() {
  const params = useParams();
  const contestId = params.contest;
  return (
    <>
      <section className="contest-container" data-aos="fade-in-up">
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col gap-y-3">
            <h3>Events</h3>
            <hr />
          </div>

          <div className="flex flex-col gap-y-4">
            <Markdown
              components={{
                a(props) {
                  return (
                    <a
                      className="link"
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.children}
                    </a>
                  );
                },
                code(props) {
                  return (
                    <code className="px-1 bg-neutral-100 font-medium rounded font-mono py-0.5 text-sm">
                      {props.children}
                    </code>
                  );
                },
                li(props) {
                  return (
                    <li>
                      <p>{props.children}</p>
                    </li>
                  );
                },
              }}
            >
              {contestInfo[contestId].events}
            </Markdown>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContestEvents;
