import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function useUpdateChannel(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateChannel = async (channelId, { channelName }) => {
    if (!channelId || !channelName) return;

    setLoading(true);

    try {
      const channelRef = doc(db, "serverChannels", channelId);

      await updateDoc(channelRef, {
        name: channelName,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err);
    }

    setLoading(false);
  };

  return [updateChannel, loading, error];
}

export default useUpdateChannel;
