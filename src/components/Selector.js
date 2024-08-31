"use client";

import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Selector(props) {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(
    props.initialIndex || 0
  );
  const [selecting, setSelecting] = useState(false);
  const selectorRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.button == 0 &&
        selectorRef.current &&
        !selectorRef.current.contains(e.target)
      ) {
        setSelecting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="bg-white w-full h-full relative text-text-2"
      ref={selectorRef}
    >
      <button
        onClick={() => setSelecting(!selecting)}
        type="button"
        disabled={props.disabled}
        className={`w-full h-full flex items-center justify-between border-b-[2px] border-neutral-300 relative after:w-full after:bg-palette-5 after:scale-x-0 disabled:cursor-not-allowed	 ${
          selecting && "after:scale-x-100"
        } after:duration-300 after:h-[2px] after:absolute after:-bottom-[2px] duration-200`}
      >
        <div className="px-1 ">
          {props.defaultOption
            ? props.options[currentOptionIndex]
            : currentOptionIndex != 0 && props.options[currentOptionIndex]}
        </div>

        <FontAwesomeIcon
          className={`h-4 ${
            selecting ? "rotate-180" : "rotate-0"
          } duration-300`}
          icon={faAngleDown}
        />
        {!props.defaultOption ? (
          <label
            className={`absolute enabled:text-neutral-300 left-[4px] transition-all duration-200 ease-in-out pointer-events-none ${
              selecting &&
              currentOptionIndex == 0 &&
              "text-palette-5 text-sm -top-3 leading-none left-[4px]"
            } ${
              currentOptionIndex == 0 &&
              !selecting &&
              "top-[calc(50%-8px)] left-[4px] text-base text-neutral-500 leading-none"
            } ${
              currentOptionIndex != 0 &&
              "text-sm -top-3 leading-none left-[4px]"
            }
           ${currentOptionIndex != 0 && selecting && "text-palette-5 "}
          `}
          >
            {props.label}
          </label>
        ) : (
          <label className={`input-label ${selecting && "text-palette-5"}`}>
            {props.label}
          </label>
        )}
      </button>
      <div
        className={`w-full absolute bg-white py-2 z-40 rounded shadow top-[calc(100%+4px)] ${
          selecting
            ? "scale-100 opacity-100 visible"
            : " scale-90 opacity-0 invisible "
        } duration-200 transition-all transform origin-top`}
      >
        {props.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              props.setOption(index);
              setCurrentOptionIndex(index);
              setSelecting(false);
            }}
            className={`text-start w-full px-4 py-1 ${
              index == currentOptionIndex
                ? "bg-palette-5 text-white"
                : "hover:bg-gray-100"
            } duration-200`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Selector;
