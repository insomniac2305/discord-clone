import React from "react";
import { FaHashtag } from "react-icons/fa";
import { HiVolumeUp, HiCog } from "react-icons/hi";
import { CHANNEL_VOICE } from "../../util/Constants";
import { Link } from "react-router-dom";

function ChannelItem({ type, name, linkTo, active, onClick, onEdit }) {
  return (
    <li
      className={
        "group mb-[2px] flex max-w-full items-center rounded hover:bg-gray-600 active:bg-opacity-10 " +
        (active ? "bg-gray-600 bg-opacity-20 hover:bg-opacity-20" : "hover:bg-opacity-5 ")
      }
    >
      <Link
        className={"flex min-w-0 flex-1 items-center gap-2 py-1 pl-2 " + (!active && "pr-2 group-hover:pr-0")}
        to={linkTo}
        onClick={onClick}
      >
        <span className="shrink-0">{type === CHANNEL_VOICE ? <HiVolumeUp /> : <FaHashtag />}</span>
        <span
          className={"overflow-hidden text-ellipsis whitespace-nowrap " + (active ? "text-gray-100" : "text-gray-600")}
        >
          {name}
        </span>
      </Link>
      <button className={"p-2 " + (active ? "block" : "hidden group-hover:block")} onClick={onEdit}>
        <HiCog />
      </button>
    </li>
  );
}

export default ChannelItem;
