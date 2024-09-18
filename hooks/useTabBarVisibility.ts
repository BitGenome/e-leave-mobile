import { useAppStore } from "@/store/app";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";

export const useTabBarVisibility = () => {
  const { hideTabBar, showTabBar } = useAppStore((state) => ({
    hideTabBar: state.hideTabBar,
    showTabBar: state.showTabBar,
  }));
  const navigation = useNavigation();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const previousOffsetY = useRef(0);
  // Memoize the scroll handler to avoid recreating the function on every render
  const handleScroll = useCallback(
    (currentOffset: number) => {
      if (currentOffset === 0) {
        previousOffsetY.current = currentOffset;
        return showTabBar();
      }
      if (currentOffset < previousOffsetY.current) {
        previousOffsetY.current = currentOffset;
        return showTabBar(); // Immediately show the tab bar when scrolling up
      }

      previousOffsetY.current = currentOffset;
      return hideTabBar(); // Hide the tab bar when scrolling down
    },
    [hideTabBar, showTabBar]
  );

  useEffect(() => {
    const listenerId = scrollOffsetY.addListener(({ value }) => {
      handleScroll(value);
    });

    // Keyboard event listeners
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      hideTabBar
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      showTabBar
    );

    const focusListener = navigation.addListener("focus", showTabBar);
    const blurListener = navigation.addListener("blur", showTabBar);

    return () => {
      scrollOffsetY.removeListener(listenerId);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      focusListener();
      blurListener();
      showTabBar();
    };
  }, [scrollOffsetY, handleScroll, showTabBar]);

  return scrollOffsetY;
};
