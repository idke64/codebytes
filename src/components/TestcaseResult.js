import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMemory } from "@fortawesome/free-solid-svg-icons";

function TestcaseResult(props) {
  //variants - accepted, wrong answer, time limit exceeded, runtime error, compilation error, running
  if (props.description === "Accepted") {
    return (
      <div className="py-2 w-full bg-green-400 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="text-white font-bold">AC</h4>

        <p className="text-xs text-white items-center flex gap-x-1">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-1">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  } else if (props.description === "Wrong Answer") {
    return (
      <div className="py-2 w-full bg-red-500 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="text-white font-bold">WA</h4>

        <p className="text-xs text-white items-center flex gap-x-1">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-1">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  } else if (props.description === "Time Limit Exceeded") {
    return (
      <div className="py-2 w-full bg-yellow-400 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="text-white font-bold">TLE</h4>

        <p className="text-xs text-white items-center flex gap-x-1">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-1">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  } else if (props.description.includes("Runtime Error")) {
    return (
      <div className="py-2 w-full bg-yellow-400 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="text-white font-bold">RE</h4>

        <p className="text-xs text-white items-center flex gap-x-1">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-1">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  } else if (props.description === "Compilation Error") {
    return (
      <div className="py-2 w-full bg-yellow-400 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="text-white font-bold">CE</h4>

        <p className="text-xs text-white items-center flex gap-x-1">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-1">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  } else if (props.description === "Not Attempted") {
    return (
      <div className="py-2 w-full bg-bg-1 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2">
        <h4 className="font-bold ">NA</h4>

        <p className=" text-xs items-center flex gap-x-2 ">
          <FontAwesomeIcon icon={faClock} />
          N/A
        </p>
        <p className=" text-xs flex items-center gap-x-2 ">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          N/A
        </p>
      </div>
    );
  } else if (
    props.description === "Processing" ||
    props.description === "In Queue"
  ) {
    return (
      <div className="py-2 w-full bg-bg-1 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2 ">
        <h4 className="font-bold">LD</h4>

        <p className="text-xs  items-center flex gap-x-2">
          <FontAwesomeIcon icon={faClock} />
          N/A
        </p>
        <p className=" text-xs flex items-center gap-x-2">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          N/A
        </p>
      </div>
    );
  } else {
    return (
      <div className="py-2 w-full bg-red-500 flex flex-col justify-start rounded relative z-10 gap-y-0.5 px-2 ">
        <h4 className="text-white font-bold">ER</h4>

        <p className="text-xs text-white items-center flex gap-x-2">
          <FontAwesomeIcon icon={faClock} />
          {props.time ? props.time : "N/A"}
        </p>
        <p className=" text-xs text-white flex items-center gap-x-2">
          <FontAwesomeIcon className="w-3" icon={faMemory} />
          {props.memory ? props.memory : "N/A"}
        </p>
      </div>
    );
  }
}

export default TestcaseResult;
