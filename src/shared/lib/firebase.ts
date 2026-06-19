import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig, isFirebaseConfigured } from "@/shared/config";

const app = isFirebaseConfigured
  ? getApps()[0] ?? initializeApp(firebaseConfig as FirebaseOptions)
  : undefined;

export const auth = app ? getAuth(app) : undefined;
export const googleProvider = new GoogleAuthProvider();
