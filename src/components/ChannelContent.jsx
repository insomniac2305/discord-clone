import React from "react";
import ChannelMembers from "./ChannelMembers";

function ChannelContent({ isMembersVisible }) {
  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={
          "w-full transition-all p-1 " +
          (isMembersVisible ? "-translate-x-[15rem] md:w-[calc(100%-15rem)] md:-translate-x-0" : "-translate-x-[0]")
        }
      >
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <ol className="flex flex-col">
            <li>Message 1</li>
            <li>Message 2</li>
            <li>Message 3</li>
          </ol>
        </div>
      </div>
      <ChannelMembers isVisible={isMembersVisible} />
    </div>
  );
}

export default ChannelContent;
