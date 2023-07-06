import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function useChannelMessages(channelId) {
  const [messages, setMessages] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!channelId) {
      return;
    }

    const unsubscribeMessages = onSnapshot(
      query(collection(db, "serverChannels/" + channelId + "/messages"), orderBy("timestamp")),
      (messageSnapshot) => {
        const messageData = messageSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setMessages(messageData);
        setError(undefined);
      },
      (snapshotError) => {
        setMessages(undefined);
        setError(snapshotError);
      }
    );

    return () => {
      unsubscribeMessages();
      setMessages(undefined);
    };
  }, [channelId]);

  useEffect(() => {
    if (!messages && !error) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [messages, error]);

  return [messages, loading, error];
}

export default useChannelMessages;
