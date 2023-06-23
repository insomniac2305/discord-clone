import React from "react";
import { FaHashtag } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";
import { CHANNEL_VOICE } from "../util/Constants";
import { Link } from "react-router-dom";

function ChannelItem({ type, name, linkTo, active, onClick }) {
  return (
    <li
      className="py-[1px]"
    >
      <Link
        className={
          "flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-600 hover:bg-opacity-5 active:bg-opacity-10 " +
          (active ? "bg-gray-600 bg-opacity-20 hover:bg-opacity-20" : "")
        }
        to={linkTo}
        onClick={onClick}
      >
        {type === CHANNEL_VOICE ? <HiVolumeUp /> : <FaHashtag />}
        <span className={active ? "text-gray-100" : "text-gray-600"}>{name}</span>
      </Link>
    </li>
  );
}

export default ChannelItem;
