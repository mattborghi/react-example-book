import { useEffect, useState, useRef } from "react";

// general hook independently of search
export const useSemiPersistentState = (key, initialState) => {
  const isMounted = useRef(false);
  
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    // Avoid calling useEffect on first render
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key])
  return [value, setValue];
}