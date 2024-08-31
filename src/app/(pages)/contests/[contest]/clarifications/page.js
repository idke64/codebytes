import Clarification from "@/components/Clarification";
import React from "react";

function ContestClarifications() {
  return (
    <section className="contest-container" data-aos="fade-in-up">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-3">
          <h3>Clarifications</h3>
          <hr />
        </div>
        {/* <div className="grid grid-cols-1">
          <Clarification title="Error" text="hello" time="4:00" />
          <Clarification title="Error" text="hello" time="4:00" />
          <Clarification title="Error" text="hello" time="4:00" />
        </div> */}
        <p>No clarifications so far!</p>
      </div>
    </section>
  );
}

export default ContestClarifications;
