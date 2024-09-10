import { useAppStore } from "@/store/app";
import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

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
      if (currentOffset < previousOffsetY.current) {
        showTabBar(); // Immediately show the tab bar when scrolling up
      } else {
        hideTabBar(); // Hide the tab bar when scrolling down
      }
      previousOffsetY.current = currentOffset;
    },
    [hideTabBar, showTabBar]
  );

  useEffect(() => {
    const listenerId = scrollOffsetY.addListener(({ value }) => {
      handleScroll(value);
    });

    return () => {
      scrollOffsetY.removeListener(listenerId); // Clean up listener to prevent memory leaks
    };
  }, [scrollOffsetY, handleScroll]);

  return scrollOffsetY;
};
