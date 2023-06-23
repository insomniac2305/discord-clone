import React from "react";
import MainBg from "../assets/main-bg.svg";

function ChannelPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
      <img src={MainBg} alt="Wumpus" />
      <p className="text-center text-gray-500">No one&apos;s around to play with Wumpus!</p>
    </div>
  );
}

export default ChannelPlaceholder;