import React from "react";
import UserAvatar from "../../components/UserAvatar";

function Message({ username, avatarUrl, text, createdAt, isFollowUp }) {
  const decodedText = new DOMParser().parseFromString(text, "text/html").documentElement.textContent;

  return (
    <li className={"relative w-full px-4 hover:bg-gray-800 " + (isFollowUp ? "mt-0" : "mt-5")}>
      {isFollowUp || (
        <div>
          <div className="absolute mt-1">
            <UserAvatar avatarName={username} avatarUrl={avatarUrl} />
          </div>
          <div className="flex items-baseline gap-2 pl-14">
            <h3 className="font-bold text-gray-100">{username}</h3>
            <time className="text-xs text-gray-600">{createdAt}</time>
          </div>
        </div>
      )}
      <p className="pl-14 text-gray-350">{decodedText}</p>
    </li>
  );
}

export default Message;
