import { useState, useEffect } from "react";

const useIsVisible = (ref, disable = false) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current || disable) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export default useIsVisible;
