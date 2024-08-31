import Link from "next/link";
import Image from "next/image";
import blob from "@/assets/blob.svg";

function NotFound() {
  return (
    <section>
      <div className="h-[calc(100vh-68px)] page-margins flex items-center justify-center flex-col gap-y-4" data-aos="zoom-in-out">
        <Image src={blob} className="opacity-50 absolute -z-50" alt="blob" />
        <h1 className="text-palette-1 text-8xl max-sm:text-7xl">404</h1>
        <div className="flex flex-col gap-y-2 items-center">
          <h2 className="text-center max-sm:text-4xl">Page Not Found :(</h2>
          <p>Oops, the page you&apos;re looking for doesn&apos;t exist</p>
          <div className="flex gap-x-2">
            <Link href="/">
              <button className="btn primary-btn h-10 self-center">
                Go Home
              </button>
            </Link>
            {/* <button
              onClick={() => redirect('')}
              className="btn secondary-btn h-10"
            >
              Go Back
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
