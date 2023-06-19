import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnhSIUGf5kp0C87x4FnVwMjRqbMEk85H4",
  authDomain: "discord-clone-ea5ee.firebaseapp.com",
  projectId: "discord-clone-ea5ee",
  storageBucket: "discord-clone-ea5ee.appspot.com",
  messagingSenderId: "740021341487",
  appId: "1:740021341487:web:5c522761af1da70a46e5da",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const storage = getStorage(app);

export { db, auth, storage };
