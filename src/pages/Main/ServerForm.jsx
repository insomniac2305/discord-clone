import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import IconPicker from "../../components/IconPicker";
import useCreateServer from "../../hooks/useCreateServer";
import useUpdateServer from "../../hooks/useUpdateServer";

function ServerForm({ onClose, isNew, serverId, currentName, currentIconUrl }) {
  const [serverName, setServerName] = useState(currentName || "");
  const [serverIcon, setServerIcon] = useState(currentIconUrl);
  const [createServer, createLoading, createError] = useCreateServer(onClose);
  const [updateServer, updateLoading, updateError] = useUpdateServer(onClose);

  const create = async (e) => {
    e.preventDefault();
    await createServer(serverName, serverIcon);
  };

  const update = async (e) => {
    e.preventDefault();
    await updateServer(serverId, {
      serverName: serverName !== currentName ? serverName : null,
      serverIcon: serverIcon !== currentIconUrl ? serverIcon : null,
    });
  };

  return (
    <form
      onSubmit={isNew ? create : update}
      className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
    >
      <h1 className="text-xl font-bold tracking-wide">
        {isNew ? "Create your own server" : "Edit " + currentName}
      </h1>
      <p className="text-center">
        Give your server its own personality with a name and an icon. You can change it later at any time.
      </p>
      <IconPicker onChange={setServerIcon} initialIconUrl={currentIconUrl} />
      <TextInput
        label="Servername"
        name="servername"
        type="text"
        value={serverName}
        required={true}
        onChange={setServerName}
      />
      {(createError || updateError) && (
        <p className="pb-2 text-sm text-red">There was an error: {createError?.message || updateError?.message}</p>
      )}
      <div className="mt-4 flex w-full justify-between">
        <button onClick={onClose} type="button" className="text-sm font-medium hover:underline">
          Cancel
        </button>
        <div className="w-28">
          <PrimaryButton text={isNew ? "Continue" : "Save"} type="submit" loading={createLoading || updateLoading} />
        </div>
      </div>
    </form>
  );
}

export default ServerForm;
