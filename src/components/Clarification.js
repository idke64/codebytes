import React from "react";

function Clarification(props) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
          <h5>{props.title}</h5>
          <p>{props.text}</p>
        </div>

        <span className="text-text-1">Created at: {props.time}</span>
      </div>

      <hr className="my-4" />
    </div>
  );
}

export default Clarification;
