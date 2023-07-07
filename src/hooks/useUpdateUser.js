import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collectionGroup, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

function useUpdateUser(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMessagesAuthor = async (name, avatarUrl) => {
    let updateObject = {};
    if (name) {
      updateObject = {
        authorName: name,
      };
    }
    if (avatarUrl) {
      updateObject = {
        authorAvatarUrl: avatarUrl,
        ...updateObject,
      };
    }

    const messages = query(collectionGroup(db, "messages"), where("authorUid", "==", auth.currentUser.uid));
    const messagesSnapshot = await getDocs(messages);
    messagesSnapshot.forEach((doc) => {
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
        await updateMessagesAuthor(username, avatarUrl);
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
