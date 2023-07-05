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

          if (message.timestamp.toDate().toDateString() !== previousMessage?.timestamp.toDate().toDateString()) {
            listItem.push(
              <MessageDivider key={message.timestamp.valueOf()}>
                {dateFormat.format(message.timestamp.toDate())}
              </MessageDivider>
            );
          }

          const isFollowUp =
            message.authorUid === previousMessage?.authorUid &&
            message.timestamp.toMillis() - previousMessage?.timestamp.toMillis() < 60000;

          listItem.push(
            <Message
              key={message.id}
              text={message.text}
              authorName={message.authorName || "Empty"}
              authorAvatarUrl={message.authorAvatarUrl}
              timestamp={dateTimeFormat.format(message.timestamp.toDate())}
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
