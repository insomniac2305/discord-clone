import React from "react";
import UserAvatar from "./UserAvatar";

function User({ username, avatarUrl, usernameClass }) {
  return (
    <div className="flex min-w-0 max-w-full items-center gap-2">
      <div className="shrink-0">
        <UserAvatar avatarName={username} avatarUrl={avatarUrl} />
      </div>
      <span
        className={"overflow-hidden text-ellipsis whitespace-nowrap " + (usernameClass || "font-bold text-gray-300")}
      >
        {username}
      </span>
    </div>
  );
}

export default User;
