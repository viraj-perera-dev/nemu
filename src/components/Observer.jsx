import { useEffect } from 'react';

export function useIntersectionObserver(ref, options) {
    useEffect(() => {
        const shouldObserve = window.innerWidth < 768;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
        if (entry.isIntersecting && shouldObserve) {
          entry.target.classList.add('figure-visible');
        } else {
          entry.target.classList.remove('figure-visible');
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]); // Dependencies array ensures effect only reruns if ref or options change
}
