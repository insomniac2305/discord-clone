import React, { useContext, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import IconPicker from "../../components/IconPicker";
import useBackendRequest from "../../hooks/useBackendRequest";
import AuthContext from "../../util/AuthContext";
import FormError from "../../components/FormError";

function ServerForm({ onClose, isNew, serverId, currentName, currentIconUrl }) {
  const [serverName, setServerName] = useState(currentName || "");
  const [serverIcon, setServerIcon] = useState(currentIconUrl);
  const { token } = useContext(AuthContext);
  const [submitServer, submitData, submitLoading, submitError] = useBackendRequest(
    serverId && !isNew ? `api/servers/${serverId}` : "api/servers"
  );

  useEffect(() => {
    if (submitData) {
      onClose();
    }
  }, [submitData]);

  const create = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", serverName);
    body.append("icon", serverIcon);
    await submitServer(token, "POST", body);
  };

  const update = async (e) => {
    e.preventDefault();
    const body = new FormData();
    serverName !== currentName && body.append("name", serverName);
    serverIcon !== currentIconUrl && body.append("icon", serverIcon);

    if (body.has("name") || body.has("icon")) await submitServer(token, "PUT", body);
  };

  return (
    <form
      onSubmit={isNew ? create : update}
      className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:shadow-md"
    >
      <h1 className="text-xl font-bold tracking-wide">{isNew ? "Create your own server" : "Edit " + currentName}</h1>
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
      {submitError && <FormError error={submitError} />}
      <div className="mt-4 flex w-full justify-between">
        <button onClick={onClose} type="button" className="text-sm font-medium hover:underline">
          Cancel
        </button>
        <div className="w-28">
          <PrimaryButton text={isNew ? "Continue" : "Save"} type="submit" loading={submitLoading} />
        </div>
      </div>
    </form>
  );
}

export default ServerForm;
