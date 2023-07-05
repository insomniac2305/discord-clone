import React, { useContext } from "react";
import AuthContext from "../util/AuthContext";
import User from "./User";

function CurrentUserInfo({ onClick }) {
  const user = useContext(AuthContext);

  return (
    <div className="bg-gray-850 p-1">
      <button className="p-1 pr-2 rounded hover:bg-gray-700 transition active:bg-gray-680" onClick={onClick}>
        <User uid={user?.uid} username={user?.displayName || "User"} avatarUrl={user?.photoURL} />
      </button>
    </div>
  );
}

export default CurrentUserInfo;
