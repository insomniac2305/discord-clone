import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnhSIUGf5kp0C87x4FnVwMjRqbMEk85H4",
  authDomain: "discord-clone-ea5ee.firebaseapp.com",
  projectId: "discord-clone-ea5ee",
  storageBucket: "discord-clone-ea5ee.appspot.com",
  messagingSenderId: "740021341487",
  appId: "1:740021341487:web:5c522761af1da70a46e5da",
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);
