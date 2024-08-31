"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

function Carousel(props) {
  const [position, setPosition] = useState(0);

  var timerId;

  useEffect(() => {
    timerId = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % props.images.length);
    }, 4000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-full" data-aos="fade-in-left">
        {props.images.map((image, index) => {
          return (
            <Image
              key={index}
              src={image}
              className={`object-cover absolute rounded-lg shadow left-0 top-0 duration-500 ${
                index == position
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            />
          );
        })}
      </div>
    </>
  );
}

export default Carousel;
