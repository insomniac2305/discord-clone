import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function useCreateMessage() {
  const [error, setError] = useState(undefined);

  const createMessage = async (channelId, text, authorUid, authorName, authorAvatarUrl) => {
    try {
      await addDoc(collection(db, "serverChannels/" + channelId + "/messages"), {
        text: text,
        timestamp: Timestamp.now(),
        authorUid: authorUid,
        authorName: authorName,
        authorAvatarUrl: authorAvatarUrl,
      });
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return [createMessage, error];
}

export default useCreateMessage;
