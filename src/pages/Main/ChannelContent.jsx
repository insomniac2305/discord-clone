import React, { useEffect, useRef } from "react";
import ChannelMembers from "./ChannelMembers";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import useChannelMessages from "../../hooks/useChannelMessages";

function ChannelContent({ isMembersVisible, currentChannel }) {
  const messageContainerRef = useRef(null);

  const [messages, loading, error] = useChannelMessages(currentChannel?.id);

  const scrollToBottom = () => messageContainerRef?.current.scrollTo(0, messageContainerRef.current.scrollHeight);

  useEffect(() => {
    !loading && scrollToBottom();
  }, [loading]);

  useEffect(() => {
    if (messageContainerRef) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      const isScrolledNearBottom = scrollTop > scrollHeight - clientHeight - 100;
      isScrolledNearBottom && scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={
          "flex w-full flex-col p-1 transition-all " +
          (isMembersVisible ? "-translate-x-[15rem] md:w-[calc(100%-15rem)] md:-translate-x-0" : "-translate-x-[0]")
        }
      >
        <div ref={messageContainerRef} className="flex-1 overflow-x-hidden overflow-y-scroll">
          {!loading && <MessageList messages={messages} />}
          {loading && <div>Loading ...</div>}
          {error && <div>Error: {error.message}</div>}
        </div>
        <MessageForm channelName={currentChannel?.name} channelId={currentChannel?.id} />
      </div>
      <ChannelMembers isVisible={isMembersVisible} serverId={currentChannel?.serverId} />
    </div>
  );
}

export default ChannelContent;
