import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/shared/lib";
import { useAuthStore } from "./store";

export function useAuthListener() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (!auth) return;

    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              name: firebaseUser.displayName ?? firebaseUser.email ?? "Usuario",
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            }
          : null,
      );
    });
  }, [setUser]);
}
