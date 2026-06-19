import { create } from "zustand";

export interface AuthUser {
  name: string;
  email: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
