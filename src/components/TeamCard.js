import Image from "next/image";
import defaultprofile from "@/assets/pictures/defaultprofile.png";

function TeamCard({ children, ...props }) {
  return (
    <div
      className="bg-white drop-shadow py-5 px-6 gap-y-2 flex flex-col items-center rounded relative mt-24"
      data-aos="zoom-in-out"
    >
      <div className="rounded-full border-t overflow-hidden flex justify-center items-center w-44 h-44 bottom-[calc(100%-80px)] absolute">
        <div className="rounded-full border-[14px] border-white overflow-hidden flex justify-center items-center w-44 h-44">
          {props.image ? (
            <Image src={props.image} alt="picture" />
          ) : (
            <Image className="bg-white" src={defaultprofile} alt="picture" />
          )}
        </div>
      </div>

      <div className="w-full flex justify-center flex-col items-center mt-16">
        <h4>{props.name}</h4>
        <h6 className="text-palette-2">{props.role}</h6>
      </div>
      <div className="flex flex-col gap-y-4 items-center">
        <div className="flex flex-col gap-y-2">{children}</div>

        {/* <span className="font-semibold text-center">
          &quot;{props.quote}&quot;
        </span> */}
      </div>
    </div>
  );
}

export default TeamCard;
