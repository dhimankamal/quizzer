import { User } from "@prisma/client";
import { create } from "zustand";

interface ProfileStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  profile: User | undefined;
  setProfile: (user: User) => void;
}

export const useProfileStore = create<ProfileStore>()(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  profile: undefined,
  setProfile: (profile: User) => set({ profile }),
}));
