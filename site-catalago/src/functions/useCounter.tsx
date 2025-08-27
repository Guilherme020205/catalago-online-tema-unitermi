import { useEffect, useState } from "react";

export default function useCounter(
  initialValue = 0,
  maxValue = 100,
  step = 1,
  delay = 1100
) {
  const [value, setValue] = useState(initialValue);
  const [started, setStarted] = useState(false); // controla se já iniciou

  useEffect(() => {
    let interval: number;
    let timeout: number;

    if (!started) { 
      timeout = setTimeout(() => {
        setStarted(true);
      }, delay);
    } else if (value < maxValue) {
      interval = setInterval(() => {
        setValue((prev) => prev + step);
      }, 1);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [started, value, maxValue, step]);

  return { value };
}
