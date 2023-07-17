import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { CHANNEL_TEXT, CHANNEL_VOICE, ROLE_ADMIN } from "../util/Constants";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import useAddServerMember from "./useAddServerMember";

function useCreateServer(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addServerMember] = useAddServerMember();

  const createServer = async (serverName, serverIcon) => {
    setLoading(true);

    try {
      const newServerRef = await addDoc(collection(db, "servers"), {
        name: serverName,
        iconUrl: null,
      });

      const serverChannelsCollection = collection(db, "serverChannels");

      await addDoc(serverChannelsCollection, {
        serverId: newServerRef.id,
        name: "general",
        type: CHANNEL_TEXT,
      });

      await addDoc(serverChannelsCollection, {
        serverId: newServerRef.id,
        name: "general",
        type: CHANNEL_VOICE,
      });

      await addServerMember(
        auth.currentUser.uid,
        newServerRef.id,
        ROLE_ADMIN,
        auth.currentUser.displayName,
        auth.currentUser.photoURL
      );

      if (serverIcon) {
        const iconPath = `servers/${newServerRef.id}/${serverIcon.name}`;
        const iconRef = ref(storage, iconPath);

        await uploadBytes(iconRef, serverIcon);
        const iconUrl = await getDownloadURL(iconRef);
        await updateDoc(newServerRef, {
          iconUrl: iconUrl,
        });
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  };

  return [createServer, loading, error];
}

export default useCreateServer;
