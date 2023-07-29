import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function useCreateChannel(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createServer = async (serverId, channelName, channelType) => {
    setLoading(true);

    try {
      const serverChannelsCollection = collection(db, "serverChannels");

      await addDoc(serverChannelsCollection, {
        serverId: serverId,
        name: channelName,
        type: channelType,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  };

  return [createServer, loading, error];
}

export default useCreateChannel;
