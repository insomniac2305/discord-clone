import React, { useContext, useEffect, useRef, useState } from "react";
import ChannelMembers from "./ChannelMembers";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import useBackendRequest from "../../hooks/useBackendRequest";
import AuthContext from "../../util/AuthContext";
import { socket } from "../../socket";

function ChannelContent({ isMembersVisible, serverId, currentChannel }) {
  const { token } = useContext(AuthContext);
  const messageContainerRef = useRef(null);
  const [requestMessages, fetchedMessages, messagesLoading, messagesError] = useBackendRequest(
    serverId && currentChannel && `api/servers/${serverId}/channels/${currentChannel._id}/messages`
  );
  const [socketMessages, setSocketMessages] = useState([]);
 
  let allMessages = [...socketMessages];
  if (fetchedMessages) {
    allMessages = [...fetchedMessages, ...allMessages];
  }

  useEffect(() => {
    if (token && serverId && currentChannel) {
      requestMessages(token);
    }
  }, [token, serverId, currentChannel]);

  const scrollToBottom = () => messageContainerRef?.current.scrollTo(0, messageContainerRef.current.scrollHeight);

  useEffect(() => {
    !messagesLoading && scrollToBottom();
  }, [messagesLoading]);

  useEffect(() => {
    if (messageContainerRef) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      const isScrolledNearBottom = scrollTop > scrollHeight - clientHeight - 100;
      isScrolledNearBottom && scrollToBottom();
    }
  }, [socketMessages]);

  useEffect(() => {
    const channelId = currentChannel?._id;

    channelId && socket.emit("joinChannel", channelId, token);

    return () => {
      channelId && socket.emit("leaveChannel", channelId);
    };
  }, [currentChannel]);

  useEffect(() => {
    const addMessage = (message) => {
      setSocketMessages((previousMessages) => [...previousMessages, message]);
    };

    socket.on("addMessage", addMessage);

    return () => {
      socket.off("addMessage", addMessage);
    };
  }, []);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={
          "flex w-full flex-col p-1 transition-all " +
          (isMembersVisible ? "-translate-x-[15rem] md:w-[calc(100%-15rem)] md:-translate-x-0" : "-translate-x-[0]")
        }
      >
        <div ref={messageContainerRef} className="flex-1 overflow-x-hidden overflow-y-scroll">
          {fetchedMessages && <MessageList messages={allMessages} />}
          {!fetchedMessages && messagesLoading && <div>Loading ...</div>}
          {messagesError && <div>Error: {messagesError.message}</div>}
        </div>
        {currentChannel && (
          <MessageForm serverId={serverId} channelName={currentChannel?.name} channelId={currentChannel?._id} />
        )}
      </div>
      <ChannelMembers isVisible={isMembersVisible} serverId={serverId} />
    </div>
  );
}

export default ChannelContent;
