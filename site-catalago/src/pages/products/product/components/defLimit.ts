import { useEffect, useState } from "react";

function useResponsiveLimit() {
  const [limit, setLimit] = useState("2");

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width < 768) setLimit("2"); // menor que md
      else if (width >= 768 && width < 1024) setLimit("3"); // md até lg
      else setLimit("5"); // lg ou maior
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return limit;
}

export default useResponsiveLimit;
