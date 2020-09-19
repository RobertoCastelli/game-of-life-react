import { useRef, useEffect } from "react";

export const useInterval = (callback, grid, isRunning) => {
  const saveCallback = useRef();

  useEffect(() => {
    saveCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isRunning) {
      function tick() {
        saveCallback.current();
      }
      let interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
  }, [grid, isRunning]);
};
