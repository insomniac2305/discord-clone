import React, { useContext, useRef, useState } from "react";
import { BiSolidPlusCircle, BiSolidSmile } from "react-icons/bi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import AuthContext from "../../util/AuthContext";
import useCreateMessage from "../../hooks/useCreateMessage";

function MessageForm({ channelName, channelId }) {
  const [message, setMessage] = useState("");
  const [createMessage, createError] = useCreateMessage();
  const messageTextRef = useRef(null);
  const { height } = useWindowDimensions();
  const { user } = useContext(AuthContext);

  const resizeMessageTextArea = () => {
    messageTextRef.current.style.height = "auto";
    const scrollHeight = messageTextRef.current.scrollHeight;
    messageTextRef.current.style.height = (scrollHeight > height / 2 ? height / 2 : scrollHeight) + "px";
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
    resizeMessageTextArea();
  };

  const sendMessage = () => {
    createMessage(channelId, message, user._id, user.name, user.avatar);
    setMessage("");
    messageTextRef.current.value = "";
    resizeMessageTextArea();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const onKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== "") {
        sendMessage();
      }
    }
  };

  return (
    <div className="flex px-4 pb-4">
      <form onSubmit={onSubmit} className="flex flex-1 items-start rounded-lg bg-gray-680">
        <button type="button" className="flex p-3 text-2xl text-gray-500">
          <BiSolidPlusCircle />
        </button>
        <span className="flex h-full flex-1 items-center justify-center">
          <textarea
            className="h-auto flex-1 resize-none bg-gray-680 p-2 outline-none placeholder:text-gray-620 focus:outline-none"
            type="text"
            name="new-message"
            id="new-message"
            placeholder={`Message to #${channelName}`}
            ref={messageTextRef}
            value={createError ? createError : message}
            readOnly={createError}
            rows={1}
            onChange={onMessageChange}
            onKeyDown={onKey}
          />
        </span>
        <div className="flex items-center">
          <button type="button" className="p-3 text-2xl text-gray-500">
            <BiSolidSmile />
          </button>
          <span className="h-7 border-l border-l-gray-650"></span>
          <button
            type="submit"
            className={
              "p-3 text-2xl transition-colors " + (message && message !== "" ? "text-blurple-200" : "text-gray-650")
            }
            disabled={!message}
          >
            <PiPaperPlaneRightFill />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
