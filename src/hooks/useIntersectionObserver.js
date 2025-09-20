import { useState, useEffect, useRef } from 'react';

// Main intersection observer hook for scroll animations
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          if (defaultOptions.triggerOnce && !hasAnimated) {
            setHasAnimated(true);
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce, hasAnimated]);

  return {
    targetRef,
    isIntersecting: defaultOptions.triggerOnce ? hasAnimated || isIntersecting : isIntersecting,
    hasAnimated
  };
};

// Hook for animating multiple elements with stagger
export const useStaggeredAnimation = (itemCount, options = {}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    staggerDelay: 100,
    ...options
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate items with stagger effect
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * defaultOptions.staggerDelay);
          }
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.staggerDelay]);

  return {
    containerRef,
    visibleItems,
    isItemVisible: (index) => visibleItems.has(index)
  };
};

// Hook for reveal animations with different directions
export const useRevealAnimation = (direction = 'up', options = {}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver(options);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-800 ease-out';
    
    if (!isIntersecting) {
      switch (direction) {
        case 'up':
          return `${baseClasses} opacity-0 translate-y-8 scale-95`;
        case 'down':
          return `${baseClasses} opacity-0 -translate-y-8 scale-95`;
        case 'left':
          return `${baseClasses} opacity-0 translate-x-8 scale-95`;
        case 'right':
          return `${baseClasses} opacity-0 -translate-x-8 scale-95`;
        case 'fade':
          return `${baseClasses} opacity-0 scale-95`;
        case 'zoom':
          return `${baseClasses} opacity-0 scale-50`;
        default:
          return `${baseClasses} opacity-0 translate-y-8 scale-95`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0 scale-100`;
  };

  return {
    targetRef,
    isVisible: isIntersecting,
    animationClasses: getAnimationClasses()
  };
};

// Hook for scroll-based parallax effects
export const useParallax = (speed = 0.5) => {
  const [transform, setTransform] = useState('translateY(0)');
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setTransform(`translateY(${rate}px)`);
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed]);

  return {
    targetRef,
    transform,
    style: { transform }
  };
};

// Utility hook for counting up numbers when visible
export const useCountUp = (end, options = {}) => {
  const [count, setCount] = useState(0);
  const { targetRef, isIntersecting } = useIntersectionObserver();

  const defaultOptions = {
    duration: 2000,
    start: 0,
    ...options
  };

  useEffect(() => {
    if (!isIntersecting) return;

    const startTime = Date.now();
    const startValue = defaultOptions.start;
    const endValue = end;
    const duration = defaultOptions.duration;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.round(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [isIntersecting, end, defaultOptions.start, defaultOptions.duration]);

  return {
    targetRef,
    count,
    isAnimating: isIntersecting && count < end
  };
};