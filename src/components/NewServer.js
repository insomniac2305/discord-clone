import { useState } from "react";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import ImageUploadIcon from "./ImageUploadIcon";
import LinkButton from "./LinkButton";

function NewServer() {
  const [serverName, setServerName] = useState("");

  return (
    <form className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md">
      <h1 className="text-xl font-bold tracking-wide">Create your own server</h1>
      <p className="text-center">
        Give your server its own personality with a name and an icon. 
        You can change it later at any time.
      </p>
      <div className="relative">
        <ImageUploadIcon />
        <input className="absolute top-0 left-0 w-full h-full opacity-0" type="file" name="serverimage" id="serverimage" />
      </div>
      <TextInput
        label="Servername"
        name="servername"
        type="text"
        value={serverName}
        required={true}
        onChange={setServerName}
      />
      <div className="flex w-full justify-between mt-4">
        <LinkButton text="Cancel" />
        <div className="w-28">
          <PrimaryButton text="Create" type="submit" />
        </div>
      </div>
    </form>
  );
}

export default NewServer;
