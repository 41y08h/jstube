import { RefObject, useEffect } from "react";

export default function useOnScreen({
  target,
  onIntersect,
  enabled = true,
}: {
  target: RefObject<Element>;
  onIntersect: Function;
  enabled?: boolean;
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => enabled && entry.isIntersecting && onIntersect()
    );

    target.current && observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [target.current, onIntersect, enabled]);
}
