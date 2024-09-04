import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function TimelineCard({ children, ...props }) {
  return (
    <div
      className={`w-full relative -my-4 max-md:my-4 flex ${
        props.position === "right" && "justify-end"
      }`}
    >
      <div
        className={`w-[45%] max-md:w-full rounded px-5 py-6 duration-200 flex gap-y-2 flex-col drop-shadow  bg-white relative before:bg-white max-md:before:hidden before:absolute before:w-6 before:h-6 before:top-[calc(50%-12px)] hover:border-palette-2 cursor-default ${
          props.position === "right"
            ? "before:-left-[12px] border-r-8 border-palette-3 "
            : "before:-right-[12px] border-l-8 border-palette-3 "
        } before:rotate-45 before:-z-10`}
        data-aos={props.position === "right" ? "fade-in-left" : "fade-in-right"}
      >
        <div className="flex gap-x-3 items-center">
          <FontAwesomeIcon icon={props.icon} className="text-palette-1 h-6" />
          <h3 className="text-palette-1"> {props.header}</h3>
        </div>
        {children}
      </div>
      <div
        className="shadow max-md:hidden rounded-full border-[5px] border-white w-6 h-6 bg-palette-2 left-[calc(50%-14px)] top-[calc(50%-14px)] absolute flex items-center justify-center"
        data-aos="zoom-in-out"
      />
    </div>
  );
}

export default TimelineCard;
