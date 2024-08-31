import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function SocialMediaIcon(props) {
  return (
    <>
      <Link
        className="rounded-full "
        target="_blank"
        rel="noopener noreferrer"
        href={props.link}
      >
        <FontAwesomeIcon
          icon={props.icon}
          className="h-[14px] text-white hover:text-palette-3 duration-200"
        />
      </Link>
    </>
  );
}
export default SocialMediaIcon;
