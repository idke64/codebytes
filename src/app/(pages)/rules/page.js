"use client";

import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import info from "@/markdown/information.json";

function RulesAndGuidelines() {
  console.log(info.rules.content);
  return (
    <>
      <section className="bg-bg-3">
        <div className="page-margins py-5 flex items-center">
          <h1 className="text-white text-5xl" data-aos="fade-in-right">
            Rules
          </h1>
        </div>
      </section>
      <section className="page-margins flex flex-col gap-y-6 py-8">
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
            {info.rules.content}
          </Markdown>
        </div>
      </section>
    </>
  );
}

export default RulesAndGuidelines;
