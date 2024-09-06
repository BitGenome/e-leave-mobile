import { create } from "zustand";

interface AppState {
  isTabbarVisible: boolean;
}

interface AppAction {
  showTabBar: () => void;
  hideTabBar: () => void;
}

const initialAppState: AppState = {
  isTabbarVisible: true,
};

export const useAppStore = create<AppState & AppAction>((set) => ({
  ...initialAppState,
  showTabBar: () => set({ isTabbarVisible: true }),
  hideTabBar: () => set({ isTabbarVisible: false }),
}));
