import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function useAddServerMember() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const addServerMember = async (userId, serverId, role, username, avatarUrl) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "serverMembers", `${serverId}_${userId}`), {
        userId,
        serverId,
        role,
        username,
        avatarUrl,
      });
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return [addServerMember, loading, error];
}

export default useAddServerMember;
