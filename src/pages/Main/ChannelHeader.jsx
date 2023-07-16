import React from "react";
import { FaHashtag } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";

function ChannelHeader({ showSidebarToggle, onToggleSidebar, currentChannel, onToggleMembers }) {
  return (
    <div className="sticky top-0 flex flex-row items-center gap-4 px-4 shadow-sm shadow-black">
      {showSidebarToggle && (
        <button onClick={onToggleSidebar} className="h-12 text-2xl">
          <HiMenu />
        </button>
      )}
      {currentChannel !== null && (
        <>
          <div className="flex items-center gap-2 px-2">
            <FaHashtag className="text-xl text-gray-600" />
            <h1 className="font-medium text-gray-100">{currentChannel.name}</h1>
          </div>
          <div className="h-12 flex-1"></div>
          <button onClick={onToggleMembers} className="text-2xl text-gray-500">
            <MdPeopleAlt />
          </button>
        </>
      )}
    </div>
  );
}

export default ChannelHeader;
