import React from "react";
import calculateColor from "../util/CalculateColor";

function Message({ authorName, authorAvatarUrl, text, timestamp, isFollowUp }) {
  let avatarBackgroundStyle;
  
  if (authorAvatarUrl) {
    avatarBackgroundStyle = {
      backgroundImage: `url(${authorAvatarUrl})`,
    };
  } else {
    const colors = calculateColor(authorName || "empty");
    avatarBackgroundStyle = {
      backgroundColor: colors.background,
      color: colors.text,
    };
  }

  return (
    <li className={"hover:bg-gray-800 relative px-4 w-full " + (isFollowUp ? "mt-0" : "mt-5")}>
      {isFollowUp || (
        <div>
          <div className="flex items-center justify-center font-bold absolute mt-1 h-10 w-10 rounded-full bg-cover" style={avatarBackgroundStyle}>
            {!authorAvatarUrl && authorName && authorName.charAt(0)}
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