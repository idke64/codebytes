import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faClock,
  faHourglassEnd,
  faHourglassStart,
  faLocationArrow,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

function ContestCard(props) {
  return (
    <Link
      href={props.path || `/contests/${props.id}`}
      className="bg-white rounded duration-300 border-b-8 border-b-palette-3 shadow hover:border-b-palette-2 active:scale-95 self-start"
      data-aos="zoom-in-out"
    >
      <div className="px-5 py-4 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <p className="text-[15px] font-bold text-palette-5">
              {props.start_time.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                weekday: "long",
              })}
            </p>
            <h4 className="font-semibold">{props.title}</h4>
          </div>

          <div className="flex gap-x-2">
            <p className="px-2 py-1 bg-palette-3 rounded-md text-palette-1 text-sm font-bold self-start">
              {props.events == 1 ? "1 Event" : props.events + " Events"}
            </p>
            <p className="px-2 py-1 bg-palette-3 rounded-md text-palette-1 text-sm font-bold self-start">
              {props.start_time > Date.now()
                ? "Upcoming"
                : props.start_time < Date.now() && props.end_time > Date.now()
                ? "In Progress"
                : "Past"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <div className="flex gap-x-1.5 items-start">
            <div>
              <FontAwesomeIcon
                icon={faLocationArrow}
                className="h-4 text-palette-2"
              />
            </div>

            <p className="">{props.location}</p>
          </div>
          <div className="flex gap-x-1.5 items-start">
            <div>
              <FontAwesomeIcon icon={faClock} className="h-4 text-palette-2" />
            </div>
            <p className="mb-2">
              {props.start_time.toLocaleString("en-US", {
                hour: "numeric",

                minute: "numeric",
                timeZoneName: "short",
              })}{" "}
              -{" "}
              {props.end_time.toLocaleString("en-US", {
                hour: "numeric",

                minute: "numeric",
                timeZoneName: "short",
              })}
            </p>
          </div>

          {/* <Link
            href={props.path || `/contests/${props.id}`}
            className="btn primary-btn h-8 gap-x-2"
          >
            View <FontAwesomeIcon icon={faArrowRight} />
          </Link> */}
        </div>
      </div>
    </Link>
  );
}

export default ContestCard;
