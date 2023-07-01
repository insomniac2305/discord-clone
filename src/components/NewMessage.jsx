import React, { useRef, useState } from "react";
import { BiSolidPlusCircle, BiSolidSmile } from "react-icons/bi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import useWindowDimensions from "../util/useWindowDimensions";

function NewMessage({ channelName }) {
  const [message, setMessage] = useState("");
  const textAreaRef = useRef(null);
  const { height } = useWindowDimensions();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    textAreaRef.current.style.height = "auto";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = (scrollHeight > height / 2 ? height / 2 : scrollHeight) + "px";
  };

  return (
    <div className="flex px-4 pb-4 shadow-lg">
      <div className="flex flex-1 items-start rounded-lg bg-gray-680">
        <button className="flex p-3 text-2xl text-gray-500">
          <BiSolidPlusCircle />
        </button>
        <span className="flex h-full flex-1 items-center justify-center">
          <textarea
            className="h-auto flex-1 resize-none bg-gray-680 p-2 outline-none placeholder:text-gray-620 focus:outline-none"
            type="text"
            name="new-message"
            id="new-message"
            placeholder={`Message to #${channelName}`}
            ref={textAreaRef}
            value={message}
            onChange={handleMessageChange}
            rows={1}
          />
        </span>
        <div className="flex items-center">
          <button className="p-3 text-2xl text-gray-500">
            <BiSolidSmile />
          </button>
          <span className="h-7 border-l border-l-gray-650"></span>
          <button
            className={
              "p-3 text-2xl transition-colors " + (message && message !== "" ? "text-blurple-200" : "text-gray-650")
            }
          >
            <PiPaperPlaneRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewMessage;
