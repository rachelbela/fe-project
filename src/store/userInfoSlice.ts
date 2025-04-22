import { UserInfo } from "@/types/entity";
import { create } from "zustand";

interface State {
  userInfo: UserInfo | null;
}

interface Action {
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserInfoStore = create<State & Action>()((set, get) => ({
  userInfo: null,
  setUserInfo(userInfo) {
    set({ userInfo: { ...userInfo } });
  },
}));

export const useUserPermission = () =>
  useUserInfoStore((state) => state.userInfo?.permissions);
