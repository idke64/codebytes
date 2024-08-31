import Link from "next/link";
import React from "react";
import logoWhite from "@/assets/codebyteslogowhite.svg";
import Image from "next/image";
import wave2 from "@/assets/wave2.svg";
import SocialMediaIcon from "./SocialMediaIcon";
import { faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="w-full mt-8">
      <Image src={wave2} alt="waves" className="w-full" />
      <div className="bg-bg-3 ">
        <div className="flex justify-center flex-col items-center page-margins py-3 gap-y-2 ">
          {/* <div className="flex items-center gap-x-2">
            <Image src={logoWhite} alt="logo" width={40} height={40} />
            <h3 className="text-white">CodeBytes</h3>
          </div> */}

          <div className="flex items-center justify-center text-white gap-x-8">
            <Link href={"/"} className="hover:text-palette-3">
              Home
            </Link>
            <Link href={"/about"} className="hover:text-palette-3">
              {" "}
              About
            </Link>
            <Link href={"/contests"} className="hover:text-palette-3">
              {" "}
              Contests
            </Link>
            <Link href={"/guidebook"} className="hover:text-palette-3">
              {" "}
              Guidebook
            </Link>
            {/* <Link href={"/"} className="text-lg hover:text-palette-3">
            {" "}
            Partners
          </Link> */}
            <Link href={"/blog"} className="hover:text-palette-3">
              Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-palette-1 w-full flex py-[3px] items-center justify-center relative">
        <p className="text-[13px] text-white self-center flex justify-center">
          © 2023-2024 Copyright | Codebytes | All Rights Reserved
        </p>
        <div className="flex gap-x-2 self-end items-end absolute right-2 bottom-0">
          <SocialMediaIcon
            link={"https://instagram.com/codebytes.official"}
            icon={faInstagram}
          />
          <SocialMediaIcon
            link={"https://discord.gg/vJtmme2MVr"}
            icon={faDiscord}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
