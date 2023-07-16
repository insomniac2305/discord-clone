import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, collectionGroup, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

function useUpdateUser(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserReferences = async (referenceCollection, username, avatarUrl) => {
    let updateObject = {};
    if (username) {
      updateObject = {
        username: username,
      };
    }
    if (avatarUrl) {
      updateObject = {
        avatarUrl: avatarUrl,
        ...updateObject,
      };
    }

    const references = query(referenceCollection, where("userId", "==", auth.currentUser.uid));
    const referencesSnapshot = await getDocs(references);
    referencesSnapshot.forEach((doc) => {
      updateDoc(doc.ref, updateObject);
    });
  };

  const updateUser = async ({ email, username, password, avatarFile }) => {
    setLoading(true);

    try {
      if (email) {
        await updateEmail(auth.currentUser, email);
      }

      if (username || avatarFile) {
        if (username) {
          await updateProfile(auth.currentUser, {
            displayName: username,
          });
        }
        let avatarUrl;
        if (avatarFile) {
          const avatarPath = `users/${auth.currentUser.uid}/${avatarFile.name}`;
          const avatarRef = ref(storage, avatarPath);

          await uploadBytes(avatarRef, avatarFile);
          avatarUrl = await getDownloadURL(avatarRef);
          await updateProfile(auth.currentUser, {
            photoURL: avatarUrl,
          });
        }
        await updateUserReferences(collectionGroup(db, "messages"), username, avatarUrl);
        await updateUserReferences(collection(db, "serverMembers"), username, avatarUrl);
      }

      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      onSuccess();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [updateUser, loading, error];
}

export default useUpdateUser;
