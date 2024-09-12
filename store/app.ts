import AsyncStorage from "@react-native-async-storage/async-storage";
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

interface ThemeStore {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
}

export const useAppThemeStore = create<ThemeStore>((set) => ({
  isDarkTheme: false,
  toggleTheme: async () => {
    set((state) => {
      const newTheme = !state.isDarkTheme;
      AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
      return { isDarkTheme: newTheme };
    });
  },
  loadTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("theme");
    set({ isDarkTheme: savedTheme === "dark" });
  },
}));
