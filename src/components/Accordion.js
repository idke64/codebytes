"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

function Accordion({ children, ...props }) {
  const textRef = useRef();
  const [accordionToggled, setAccordionToggled] = useState(false);
  const handleAccordionClick = () => {
    setAccordionToggled(!accordionToggled);
  };
  useEffect(() => {
    setAccordionToggled(true);
  }, [props.expand]);
  useEffect(() => {
    setAccordionToggled(false);
  }, [props.collapse]);

  return (
    <div
      className={`w-full flex flex-col bg-white ${
        !props.bottom && "border-b"
      } `}
    >
      <button
        onClick={handleAccordionClick}
        className={`px-3 flex w-full py-4 justify-between items-center border-l-[6px] border-l-palette-3`}
      >
        <h7 className="w-5/6 text-start text-lg">{props.header}</h7>
        <FontAwesomeIcon
          className={`h-5 text-palette-5 duration-200 ${
            accordionToggled ? "-rotate-180" : "rotate-0"
          }`}
          icon={faChevronDown}
        />
      </button>
      <hr className={!accordionToggled && "hidden"}></hr>
      <div
        ref={textRef}
        style={{
          maxHeight: accordionToggled
            ? `${textRef.current.scrollHeight}px`
            : "0",
        }}
        className={`px-3 overflow-hidden transition-[height,max-height] duration-300`}
      >
        <div className="my-4">{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
