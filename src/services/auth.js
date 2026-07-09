import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export async function loginAnonymous() {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Anonymous login failed:", error);
    throw error;
  }
}

export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
