import React from "react";
import calculateColor from "../util/CalculateColor";

function UserAvatar({ avatarName, avatarUrl }) {
  let avatarBackgroundStyle;

  if (avatarUrl) {
    avatarBackgroundStyle = {
      backgroundImage: `url(${avatarUrl})`,
    };
  } else {
    const colors = calculateColor(avatarName || "empty");
    avatarBackgroundStyle = {
      backgroundColor: colors.background,
      color: colors.text,
    };
  }

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full bg-cover bg-center font-bold"
      style={avatarBackgroundStyle}
    >
      {!avatarUrl && avatarName && avatarName.charAt(0).toUpperCase()}
    </div>
  );
}

export default UserAvatar;
