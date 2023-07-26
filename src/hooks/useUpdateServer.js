import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

function useUpdateServer(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateServer = async (serverId, {serverName, serverIcon}) => {
    if (!serverId || (!serverName && !serverIcon)) return;

    setLoading(true);

    try {
      const serverRef = doc(db, "servers", serverId);
      let updateObject = {};

      if (serverName) {
        updateObject = {
          name: serverName,
        };
      }

      if (serverIcon) {
        const iconPath = `servers/${serverRef.id}/${serverIcon.name}`;
        const iconRef = ref(storage, iconPath);

        await uploadBytes(iconRef, serverIcon);
        const iconUrl = await getDownloadURL(iconRef);
        updateObject = {
          ...updateObject,
          iconUrl: iconUrl,
        };
      }

      await updateDoc(serverRef, updateObject);

      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  };

  return [updateServer, loading, error];
}

export default useUpdateServer;
