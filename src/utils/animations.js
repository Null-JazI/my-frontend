// Animation utility functions and configurations

// Predefined animation variants for different components
export const animationVariants = {
    // Slide animations
    slideUp: {
      hidden: 'opacity-0 translate-y-8 scale-95',
      visible: 'opacity-100 translate-y-0 scale-100',
      transition: 'transition-all duration-700 ease-out'
    },
    
    slideDown: {
      hidden: 'opacity-0 -translate-y-8 scale-95',
      visible: 'opacity-100 translate-y-0 scale-100',
      transition: 'transition-all duration-700 ease-out'
    },
    
    slideLeft: {
      hidden: 'opacity-0 translate-x-8 scale-95',
      visible: 'opacity-100 translate-x-0 scale-100',
      transition: 'transition-all duration-700 ease-out'
    },
    
    slideRight: {
      hidden: 'opacity-0 -translate-x-8 scale-95',
      visible: 'opacity-100 translate-x-0 scale-100',
      transition: 'transition-all duration-700 ease-out'
    },
  
    // Fade animations
    fade: {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100',
      transition: 'transition-all duration-600 ease-out'
    },
  
    // Zoom animations
    zoomIn: {
      hidden: 'opacity-0 scale-50',
      visible: 'opacity-100 scale-100',
      transition: 'transition-all duration-600 ease-out'
    },
    
    zoomOut: {
      hidden: 'opacity-0 scale-150',
      visible: 'opacity-100 scale-100',
      transition: 'transition-all duration-600 ease-out'
    },
  
    // Rotate animations
    rotateIn: {
      hidden: 'opacity-0 rotate-12 scale-95',
      visible: 'opacity-100 rotate-0 scale-100',
      transition: 'transition-all duration-800 ease-out'
    },
  
    // Bounce animation
    bounce: {
      hidden: 'opacity-0 -translate-y-4 scale-95',
      visible: 'opacity-100 translate-y-0 scale-100',
      transition: 'transition-all duration-600 ease-bounce'
    },
  
    // Special effects
    blur: {
      hidden: 'opacity-0 blur-sm scale-95',
      visible: 'opacity-100 blur-0 scale-100',
      transition: 'transition-all duration-700 ease-out'
    }
  };
  
  // Stagger delay configurations
  export const staggerDelays = {
    fast: 50,
    normal: 100,
    slow: 150,
    verySlow: 200
  };
  
  // Common animation configurations
  export const animationConfigs = {
    // For hero sections
    hero: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      triggerOnce: true
    },
  
    // For cards and content blocks
    card: {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
      triggerOnce: true
    },
  
    // For skills and progress bars
    skills: {
      threshold: 0.3,
      rootMargin: '0px 0px -20px 0px',
      triggerOnce: true
    },
  
    // For images and media
    media: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      triggerOnce: true
    }
  };
  
  // Utility function to get animation classes
  export const getAnimationClasses = (variant, isVisible, delay = 0) => {
    const animation = animationVariants[variant] || animationVariants.slideUp;
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    return `${animation.transition} ${delayClass} ${
      isVisible ? animation.visible : animation.hidden
    }`;
  };
  
  // Create staggered animation classes
  export const createStaggeredClasses = (index, variant = 'slideUp', baseDelay = 100) => {
    const delay = index * baseDelay;
    return `${animationVariants[variant].transition} ${
      delay > 0 ? `delay-[${delay}ms]` : ''
    }`;
  };
  
  // Intersection observer options presets
  export const observerPresets = {
    immediate: {
      threshold: 0,
      rootMargin: '0px'
    },
    
    early: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    },
    
    normal: {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    },
    
    late: {
      threshold: 0.3,
      rootMargin: '0px 0px -20px 0px'
    },
    
    full: {
      threshold: 0.8,
      rootMargin: '0px'
    }
  };
  
  // Performance optimization utilities
  export const createThrottledScroll = (callback, delay = 16) => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  };
  
  // CSS-in-JS animations for complex effects
  export const keyframeAnimations = {
    slideUpFade: `
      @keyframes slideUpFade {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
    
    staggeredReveal: `
      @keyframes staggeredReveal {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    
    morphIn: `
      @keyframes morphIn {
        from {
          opacity: 0;
          transform: scale(0.8) rotate(5deg);
          filter: blur(4px);
        }
        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
          filter: blur(0);
        }
      }
    `
  };
  
  // Component-specific animation helpers
  export const componentAnimations = {
    // For project cards
    projectCard: (index) => ({
      variant: 'slideUp',
      delay: index * 100,
      config: animationConfigs.card
    }),
  
    // For skill badges
    skillBadge: (index) => ({
      variant: 'fade',
      delay: index * 50,
      config: animationConfigs.skills
    }),
  
    // For experience timeline
    experienceItem: (index) => ({
      variant: index % 2 === 0 ? 'slideLeft' : 'slideRight',
      delay: index * 150,
      config: animationConfigs.card
    }),
  
    // For social links
    socialLink: (index) => ({
      variant: 'zoomIn',
      delay: index * 100,
      config: animationConfigs.card
    })
  };