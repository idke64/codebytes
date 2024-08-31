"use client";

import { useState } from "react";
import Accordion from "./Accordion";
import Link from "next/link";

function FAQSection(props) {
  const [collapse, setCollapse] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-y-[10px]">
        <div className="flex justify-between items-center" data-aos="fade-in">
          <h2 className="relative after:content-['FAQ'] after:absolute after:text-palette-5 after:font-bold after:-top-6 after:text-lg after:left-0 max-sm:text-4xl">
            Any <span className="text-palette-5">Questions</span>?
          </h2>

          <div className="flex items-end self-end gap-x-4">
            <button
              onClick={() => {
                setExpand(!expand);
              }}
              className="btn primary-btn h-9 self-end"
            >
              Expand
            </button>
            <button
              onClick={() => {
                setCollapse(!collapse);
              }}
              className="btn secondary-btn h-9 self-end"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col rounded overflow-hidden shadow"
        data-aos="fade-in-up"
      >
        <Accordion
          collapse={collapse}
          expand={expand}
          header="What do I need to do to prepare?"
        >
          <p>
            You can practice some problems in our practice programming event in
            the Contests tab or try your hand at old contests.
            <br></br>
            <br></br>
            Most events do not require you to study before-hand to do well.
          </p>
        </Accordion>
        <Accordion
          collapse={collapse}
          expand={expand}
          header="How do I register? Is there a fee?"
        >
          <p>
            You can register by creating an{" "}
            <Link className="link" href={"/signup"}>
              account
            </Link>{" "}
            on our website
            <br></br>
            <br></br>
            Currently, there is no fee to participate in any of our contests,
            but that may change in the future.
          </p>
        </Accordion>
        <Accordion
          collapse={collapse}
          expand={expand}
          header="What do I do if someone is cheating?"
        >
          <p>
            Immediately get hold of a proctor, grader, or host. This is
            imperative to ensure the fairness of the competition.
            <br></br>
            <br></br>
            Even if the perpetrator is your own teammate, report them ASAP. You
            do not want to be banned from the competition just because of
            association.
          </p>
        </Accordion>
        <Accordion
          collapse={collapse}
          expand={expand}
          header="My school is not part of Illinois. Are we allowed to participate?"
          bottom={true}
        >
          <p>
            Absolutely! We welcome all schools in the United States. We may
            originally have been a regional competition for Northern Illinois,
            but that doesn&apos;t mean we aren&apos;t open to others! However,
            our contests are currently only available in-person.
          </p>
        </Accordion>
      </div>
      <p className="text-large" data-aos="fade-in">
        Still not clear? Feel free to contact us at{" "}
        <a
          className="link"
          href="mailto:support@codebytes.codes"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@codebytes.codes
        </a>
      </p>
    </>
  );
}
export default FAQSection;
