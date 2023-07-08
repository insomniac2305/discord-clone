import { useEffect, useState } from "react";
import { collection, documentId, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function useServerMembers(serverId) {
  const [memberships, setMemberships] = useState(undefined);
  const [serverMembers, setServerMembers] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!serverId) {
      return;
    }

    const unsubscribeMemberships = onSnapshot(
      query(collection(db, "serverMembers"), where("serverId", "==", serverId)),
      (membershipSnapshot) => {
        const membershipData = membershipSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      setMemberships(undefined);
    };
  }, [serverId]);

  useEffect(() => {
    if (!memberships || memberships.length === 0) {
      setServerMembers([]);
      return;
    }

    const unsubscribeMembers = onSnapshot(
      query(
        collection(db, "users"),
        where(
          documentId(),
          "in",
          memberships.map((membership) => membership.userId)
        )
      ),
      (memberSnapshot) => {
        const memberData = memberSnapshot.docs.map((doc) => {
          const serverMembership = memberships.find((membership) => membership.userId === doc.id);
          const userRole = serverMembership.role;
          return {
            id: doc.id,
            role: userRole,
            ...doc.data(),
          };
        });
        setServerMembers(memberData);
        setError(undefined);
      },
      (snapshotError) => {
        setServerMembers(undefined);
        setError(snapshotError);
      }
    );

    return () => {
      unsubscribeMembers();
      setServerMembers(undefined);
    };
  }, [memberships]);

  useEffect(() => {
    if ((!memberships || !serverMembers) && !error) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [memberships, serverMembers, error]);

  return [serverMembers, loading, error];
}

export default useServerMembers;
