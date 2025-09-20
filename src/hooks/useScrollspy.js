import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.2,
    staggerDelay = 150,
    itemCount = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items with staggered delay
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, i]);
            }, i * staggerDelay);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, staggerDelay, itemCount]);

  return { ref, isVisible, animatedItems };
};