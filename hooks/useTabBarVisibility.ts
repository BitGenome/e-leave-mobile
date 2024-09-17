import { useAppStore } from "@/store/app";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";

export const useTabBarVisibility = () => {
  const [hideTabBar, showTabBar] = useAppStore((state) => [
    state.hideTabBar,
    state.showTabBar,
  ]);

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

    return () => {
      scrollOffsetY.removeListener(listenerId);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      showTabBar();
    };
  }, [scrollOffsetY, handleScroll, showTabBar]);

  useFocusEffect(
    useCallback(() => {
      showTabBar();
    }, [showTabBar])
  );

  return scrollOffsetY;
};
