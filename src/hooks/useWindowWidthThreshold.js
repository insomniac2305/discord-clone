import { useEffect, useRef, useState } from "react";

const useWindowWidthThreshold = (threshold) => {
  const [isBelowThreshold, setIsBelowThreshold] = useState(window.innerWidth <= threshold);
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth;
      if (currWidth <= threshold && prevWidth.current > threshold) {
        setIsBelowThreshold(true);
      } else if (currWidth > threshold && prevWidth.current <= threshold) {
        setIsBelowThreshold(false);
      }
      prevWidth.current = currWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isBelowThreshold;
};

export default useWindowWidthThreshold;
