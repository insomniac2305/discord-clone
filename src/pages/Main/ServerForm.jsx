import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import IconPicker from "../../components/IconPicker";
import useCreateServer from "../../hooks/useCreateServer";

function ServerForm({ onClose }) {
  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState(null);
  const [createServer, createLoading, createError] = useCreateServer(onClose);

  const onSubmit = async (e) => {
    e.preventDefault();
    await createServer(serverName, serverIcon);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
    >
      <h1 className="text-xl font-bold tracking-wide">Create your own server</h1>
      <p className="text-center">
        Give your server its own personality with a name and an icon. You can change it later at any time.
      </p>
      <IconPicker onChange={setServerIcon} />
      <TextInput
        label="Servername"
        name="servername"
        type="text"
        value={serverName}
        required={true}
        onChange={setServerName}
      />
      {createError && <p className="pb-2 text-sm text-red">There was an error: {createError.message}</p>}
      <div className="mt-4 flex w-full justify-between">
        <button onClick={onClose} type="button" className="text-sm font-medium hover:underline">
          Cancel
        </button>
        <div className="w-28">
          <PrimaryButton text="Create" type="submit" loading={createLoading} />
        </div>
      </div>
    </form>
  );
}

export default ServerForm;
