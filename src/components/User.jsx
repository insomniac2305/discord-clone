import React from "react";
import UserAvatar from "./UserAvatar";

function User({ username, avatarUrl, usernameClass }) {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar avatarName={username} avatarUrl={avatarUrl} />
      <span className={usernameClass || "font-bold text-gray-300"}>{username}</span>
    </div>
  );
}

export default User;
