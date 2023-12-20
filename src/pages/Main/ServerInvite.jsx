import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { STYLE_PRIMARY } from "../../util/Constants";

function ServerInvite({ serverId, serverName }) {
  const { protocol, hostname, port } = window.location;
  const baseUrl = protocol + "//" + hostname + (["80", "8080", "443"].includes(port) ? "" : ":" + port);

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
      <Button
        text={isCopied ? "Link copied!" : "Copy link"}
        onClick={() => {
          copyToClipboard(baseUrl + "/join/" + serverId);
        }}
        style={STYLE_PRIMARY}
      />
    </div>
  );
}

export default ServerInvite;
