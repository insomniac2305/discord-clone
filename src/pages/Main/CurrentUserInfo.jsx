import React, { useContext } from "react";
import AuthContext from "../../util/AuthContext";
import User from "../../components/User";
import { MdLogout } from "react-icons/md";

function CurrentUserInfo({ onEditProfile, onSignOut }) {
  const [user] = useContext(AuthContext);

  return (
    <div className="flex justify-between bg-gray-850 p-1">
      <button
        className="overflow-hidden text-ellipsis rounded p-1 pr-2 transition hover:bg-gray-700 active:bg-gray-680"
        onClick={onEditProfile}
      >
        <User uid={user?.uid} username={user?.displayName || "User"} avatarUrl={user?.photoURL} />
      </button>
      <button className="p-1" onClick={onSignOut}>
        <MdLogout className="text-xl text-gray-500 transition-all hover:text-red" />
      </button>
    </div>
  );
}

export default CurrentUserInfo;
