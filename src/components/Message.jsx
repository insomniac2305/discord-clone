import React from "react";
import UserAvatar from "./UserAvatar";

function Message({ authorName, authorAvatarUrl, text, timestamp, isFollowUp }) {
  return (
    <li className={"relative w-full px-4 hover:bg-gray-800 " + (isFollowUp ? "mt-0" : "mt-5")}>
      {isFollowUp || (
        <div>
          <div className="absolute mt-1">
            <UserAvatar avatarName={authorName} avatarUrl={authorAvatarUrl} />
          </div>
          <div className="flex items-baseline gap-2 pl-14">
            <h3 className="font-bold text-gray-100">{authorName}</h3>
            <time className="text-xs text-gray-600">{timestamp}</time>
          </div>
        </div>
      )}
      <p className="pl-14 text-gray-350">{text}</p>
    </li>
  );
}

export default Message;
