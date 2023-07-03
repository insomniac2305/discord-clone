import React from "react";
import ChannelMembers from "./ChannelMembers";
import NewMessage from "./NewMessage";
import MessageList from "./MessageList";

function ChannelContent({ isMembersVisible, currentChannel }) {
  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={
          "flex w-full flex-col p-1 transition-all " +
          (isMembersVisible ? "-translate-x-[15rem] md:w-[calc(100%-15rem)] md:-translate-x-0" : "-translate-x-[0]")
        }
      >
        <div className="my-4 flex flex-1 items-end overflow-y-auto overflow-x-hidden">
          <MessageList />
        </div>
        <NewMessage channelName={currentChannel && currentChannel.name} channelId={currentChannel && currentChannel.id} />
      </div>
      <ChannelMembers isVisible={isMembersVisible} />
    </div>
  );
}

export default ChannelContent;
