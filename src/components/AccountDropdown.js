import React from "react";

function AccountDropdown(props) {
  return (
    <>
      <div className="relative">
        <div
          className={`absolute top-[44px] border-b border-r border-l w-36 right-0 py-1 max-md:left-[calc(((176px-100%)/2)*-1)] max-md:top-12 justify-center bg-white transition-transform duration-200 origin-top ${
            !props.dropdownToggled
              ? "scale-y-100 transform-origin-top"
              : "scale-y-0"
          }`}
        >
          hello
        </div>
      </div>
    </>
  );
}

export default AccountDropdown;
