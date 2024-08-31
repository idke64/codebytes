import Image from "next/image";
import thumbnail from "@/assets/thumbnail.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationArrow,
  faPen,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function BlogCard(props) {
  return (
    <>
      <Link
        href={`/blog/${props.id}`}
        className="shadow flex rounded flex-col overflow-hidden border-b-8 border-b-palette-3 hover:border-b-palette-2 duration-300 bg-white active:scale-95"
        data-aos="zoom-in-out"
      >
        <div className="w-full h-48 overflow-hidden border-white">
          {props.image ? (
            <Image
              className="object-cover  w-full h-full"
              width={500}
              height={500}
              src={props.image}
              alt="picture"
            />
          ) : (
            <Image
              className="object-cover w-full h-full bg-black"
              src={thumbnail}
              alt="picture"
            />
          )}
        </div>

        <div className="px-5 py-4 flex flex-col gap-y-4 ">
          <div className="flex flex-col gap-y-2">
            <div>
              <p className="text-[15px] font-bold text-palette-5">
                {props.date}
              </p>
              <h4>{props.title}</h4>
            </div>

            <div className="flex w-full gap-x-2">
              <span className="px-2 py-1 bg-palette-3 rounded-md text-sm font-bold self-start text-palette-1 flex gap-x-1 items-center">
                <FontAwesomeIcon icon={faPen} className="h-4 mt-0.5" />
                <p className="text-palette-1 text-sm">{props.author}</p>
              </span>
            </div>
          </div>

          <p className="max-h-20 overflow-hidden">{props.description}</p>

          {/* <Link
              href={props.path || `/blog/${props.id}`}
              className="btn primary-btn h-8 gap-x-2 self-end"
            >
              View <FontAwesomeIcon icon={faArrowRight} />
            </Link> */}
        </div>
      </Link>
    </>
  );
}

export default BlogCard;
