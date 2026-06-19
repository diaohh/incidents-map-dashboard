import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/shared/lib";

export async function signInWithGoogle() {
  if (!auth) return;
  await signInWithPopup(auth, googleProvider);
}

export async function signOutUser() {
  if (!auth) return;
  await signOut(auth);
}
