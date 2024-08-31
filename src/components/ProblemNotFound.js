import Image from "next/image";
import blob from "@/assets/blob.svg";
import Link from "next/link";
import { useRouter } from "next/router";

function ProblemNotFound(props) {
  return (
    <section className="page-margins w-full h-full flex justify-center items-center">
      <div className="flex items-center justify-center flex-col gap-y-4">
        <h1 className="text-palette-1 text-8xl max-sm:text-7xl">404</h1>
        <div className="flex flex-col gap-y-2 items-center">
          <h2 className="text-center max-sm:text-4xl">Problem Not Found :(</h2>
          <p className="text-center">
            Oops, the problem you&apos;re looking for doesn&apos;t exist or
            isn&apos;t a part of this contest
          </p>
          <div className="flex gap-x-2">
            <Link href={props.path}>
              <button className="btn primary-btn h-10 self-center">
                Problems
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemNotFound;
