import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHaBFD9SiMIkXYA4ztXAkShH5lElrjCyk",
  authDomain: "mohoberge-a2b3b.firebaseapp.com",
  projectId: "mohoberge-a2b3b",
  storageBucket: "mohoberge-a2b3b.firebasestorage.app",
  messagingSenderId: "650896213896",
  appId: "1:650896213896:web:6fecfd2eefdb23433ddc3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Méthodes d'authentification
export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { db, auth };