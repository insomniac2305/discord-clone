import { useState } from "react";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import IconPicker from "./IconPicker";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function NewServer({ onClose }) {
  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const newServerRef = await addDoc(collection(db, "servers"), {
        name: serverName,
        iconUrl: null,
        adminUid: auth.currentUser.uid,
      });

      if (serverIcon) {
        const iconPath = `servers/${newServerRef.id}/${serverIcon.name}`;
        const iconRef = ref(storage, iconPath);

        await uploadBytes(iconRef, serverIcon);
        const iconUrl = await getDownloadURL(iconRef);
        await updateDoc(newServerRef, {
          iconUrl: iconUrl,
        });
      }

      onClose();
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full flex-col items-center gap-5 bg-gray-800 px-4 py-6 text-gray-300 sm:h-auto sm:w-[30rem] sm:rounded sm:shadow-md"
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
      {error && <p className="pb-2 text-sm text-red">There was an error: {error.message}</p>}
      <div className="mt-4 flex w-full justify-between">
        <button onClick={onClose} type="button" className="text-sm font-medium hover:underline">
          Cancel
        </button>
        <div className="w-28">
          <PrimaryButton text="Create" type="submit" loading={loading} />
        </div>
      </div>
    </form>
  );
}

export default NewServer;
