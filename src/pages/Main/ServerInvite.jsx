import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";

function ServerInvite({ serverId, serverName }) {
  const baseUrl = window.location.protocol + "//" + window.location.hostname;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md">
      <h1 className="font-bold text-gray-100">Invite friends to {serverName}</h1>
      <TextInput
        name={"link"}
        label={"Send this link to your friends"}
        required={false}
        type={"text"}
        value={baseUrl + "/join/" + serverId}
        readOnly={true}
      />
      <PrimaryButton
        text={isCopied ? "Link copied!" : "Copy link"}
        onClick={() => {
          copyToClipboard(baseUrl + "/join/" + serverId);
        }}
      />
    </div>
  );
}

export default ServerInvite;