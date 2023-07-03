import React from "react";
import Message from "./Message";

function MessageList() {
  return (
    <ol className="flex flex-col w-full">
      <Message
        text="Message 1"
        authorName="insomniac"
        authorAvatarUrl="https://firebasestorage.googleapis.com/v0/b/discord-clone-ea5ee.appspot.com/o/servers%2FEm4chCXPlrsemzfLlfsa%2F2022-08-03_10h34_29.png?alt=media"
        timestamp="18.01.2023 21:54"
      />
      <Message
        text="Message 2"
        authorName="Other One"
        authorAvatarUrl="https://firebasestorage.googleapis.com/v0/b/discord-clone-ea5ee.appspot.com/o/servers%2FEm4chCXPlrsemzfLlfsa%2F2022-08-03_10h34_29.png?alt=media"
        timestamp="18.01.2023 21:57"
      />
      <Message
        text="Message 2.1"
        authorName="Other One"
        authorAvatarUrl="https://firebasestorage.googleapis.com/v0/b/discord-clone-ea5ee.appspot.com/o/servers%2FEm4chCXPlrsemzfLlfsa%2F2022-08-03_10h34_29.png?alt=media"
        timestamp="18.01.2023 21:57"
        isFollowUp={true}
      />
      <Message
        text="Message 3"
        authorName="insomniac"
        authorAvatarUrl="https://firebasestorage.googleapis.com/v0/b/discord-clone-ea5ee.appspot.com/o/servers%2FEm4chCXPlrsemzfLlfsa%2F2022-08-03_10h34_29.png?alt=media"
        timestamp="18.01.2023 21:58"
      />
    </ol>
  );
}

export default MessageList;
