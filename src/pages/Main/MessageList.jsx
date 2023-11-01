import React from "react";
import Message from "./Message";
import MessageDivider from "./MessageDivider";

function MessageList({ messages }) {
  const dateTimeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
  const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "long" });

  let previousMessage;

  return (
    <ol className="my-4 flex min-h-[calc(100%-2rem)] w-full flex-col justify-end">
      {messages &&
        messages.map((message) => {
          let listItem = [];

          const messageDate = new Date(message.createdAt);
          const prevMessageDate = new Date(previousMessage?.createdAt);

          if (messageDate?.toDateString() !== prevMessageDate?.toDateString()) {
            listItem.push(
              <MessageDivider key={message.createdAt}>
                {dateFormat.format(messageDate)}
              </MessageDivider>
            );
          }

          const isFollowUp =
            message.user === previousMessage?.user &&
            messageDate?.valueOf() - prevMessageDate?.valueOf() < 60000;

          listItem.push(
            <Message
              key={message._id}
              text={message.text}
              username={message.user?.name || "Empty"}
              avatarUrl={message.user?.avatar}
              createdAt={dateTimeFormat.format(messageDate)}
              isFollowUp={isFollowUp}
            />
          );

          previousMessage = message;
          return listItem;
        })}
    </ol>
  );
}

export default MessageList;
