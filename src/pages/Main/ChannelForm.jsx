import React, { useContext, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { CHANNEL_TEXT, CHANNEL_VOICE } from "../../util/Constants";
import { FaHashtag } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";
import useBackendRequest from "../../hooks/useBackendRequest";
import AuthContext from "../../util/AuthContext";
import FormError from "../../components/FormError";

function ChannelForm({ onClose, isNew, serverId, channelId, currentName, currentType }) {
  const [channelName, setChannelName] = useState(currentName || "");
  const [channelType, setChannelType] = useState(currentType || CHANNEL_TEXT);
  const { token } = useContext(AuthContext);
  const [submitChannel, submitData, submitLoading, submitError] = useBackendRequest(
    serverId
      ? channelId && !isNew
        ? `api/servers/${serverId}/channels/${channelId}`
        : `api/servers/${serverId}/channels`
      : undefined
  );

  useEffect(() => {
    if (submitData) {
      onClose();
    }
  }, [submitData]);

  const create = async (e) => {
    e.preventDefault();
    await submitChannel(token, "POST", { name: channelName, type: channelType });
  };

  const update = async (e) => {
    e.preventDefault();
    await submitChannel(token, "PUT", {
      name: channelName !== currentName ? channelName : null,
    });
  };

  return (
    <form
      onSubmit={isNew ? create : update}
      className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
    >
      <h1 className="text-xl font-bold tracking-wide">{isNew ? "Create Channel" : "Edit " + currentName}</h1>
      {isNew && (
        <div className="flex w-full flex-col">
          <label htmlFor="channeltype" className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            Channel Type
          </label>
          <ChannelTypeInput
            type={CHANNEL_TEXT}
            label="Text"
            description="Send messages, pictures, GIFs, Emojis, opinions and wordplays"
            onChange={() => setChannelType(CHANNEL_TEXT)}
            checked={channelType === CHANNEL_TEXT}
          />
          <ChannelTypeInput
            type={CHANNEL_VOICE}
            label="Voice"
            description="Talk to your friends with your lovely voice and listen to theirs"
            onChange={() => setChannelType(CHANNEL_VOICE)}
            checked={channelType === CHANNEL_VOICE}
          />
        </div>
      )}
      <TextInput
        label="Channel Name"
        name="channelname"
        type="text"
        value={channelName}
        required={true}
        onChange={setChannelName}
      />
      {submitError && <FormError error={submitError} />}
      <PrimaryButton text={isNew ? "Create Channel" : "Save Changes"} type="submit" loading={submitLoading} />
    </form>
  );
}

function ChannelTypeInput({ type, label, description, onChange, checked }) {
  return (
    <label htmlFor={type} className={"my-1 flex gap-3 rounded p-2 " + (checked ? "bg-gray-680" : "bg-gray-850")}>
      <span className="self-center text-sm text-gray-500">
        {type === CHANNEL_VOICE ? <HiVolumeUp /> : <FaHashtag />}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-medium">{label}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <input
        type="radio"
        name="channeltype"
        id={type}
        value={type}
        onChange={onChange}
        className="relative m-1 h-5 w-5 shrink-0 appearance-none self-center rounded-full border-2 border-gray-100 after:absolute after:left-[0.125rem] after:top-[0.125rem] after:h-3 after:w-3 after:scale-0 after:rounded-full after:bg-gray-100 after:transition-transform checked:after:scale-100"
        checked={checked}
      />
    </label>
  );
}

export default ChannelForm;
