import React from "react";

function ChannelMembers({ isVisible }) {
  return (
    <div
      className={
        "absolute right-0 top-0 h-full min-w-[15rem] bg-gray-800 transition-transform " +
        (isVisible ? "translate-x-0" : "translate-x-[15rem]")
      }
    >
      <ul>
        <li>Member 1</li>
        <li>Member 2</li>
        <li>Member 3</li>
      </ul>
    </div>
  );
}

export default ChannelMembers;
