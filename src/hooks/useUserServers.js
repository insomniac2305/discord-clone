import { useEffect, useState } from "react";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function useUserServers(userId) {
  const [memberships, setMemberships] = useState(undefined);
  const [servers, setServers] = useState(undefined);
  const [channels, setChannels] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribeMemberships = onSnapshot(
      query(collection(db, "serverMembers"), where("userId", "==", userId)),
      (membershipSnapshot) => {
        const membershipData = membershipSnapshot.docs.map((doc) => doc.data().serverId);
        setMemberships(membershipData);
        setError(undefined);
      },
      (snapshotError) => {
        setMemberships(undefined);
        setError(snapshotError);
      }
    );

    return () => {
      unsubscribeMemberships();
    };
  }, [userId]);

  useEffect(() => {
    if (!memberships) {
      setServers(undefined);
      return;
    }

    if (memberships.length === 0) {
      setServers([]);
      return;
    }

    const unsubscribeServers = onSnapshot(
      query(collection(db, "servers"), where(documentId(), "in", memberships)),
      (serverSnapshot) => {
        const serverData = serverSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setServers(serverData);
        setError(undefined);
      },
      (snapshotError) => {
        setServers(undefined);
        setError(snapshotError);
      }
    );

    const unsubscribeChannels = onSnapshot(
      query(collection(db, "serverChannels"), where("serverId", "in", memberships)),
      (channelSnapshot) => {
        const channelData = channelSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChannels(channelData);
        setError(undefined);
      },
      (snapshotError) => {
        setChannels(undefined);
        setError(snapshotError);
      }
    );

    return () => {
      unsubscribeServers();
      unsubscribeChannels();
    };
  }, [memberships]);

  useEffect(() => {
    if ((!memberships || !servers) && !error) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [memberships, servers, error]);

  return [servers, channels, loading, error];
}

export default useUserServers;
