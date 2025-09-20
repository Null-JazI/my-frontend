import React, { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'tabs'
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'AI Garage Opening Detection',
      description: 'A tool that detects the license plate of a car and selectively opens the garage using Arduino and a custom trained AI model',
      image: '/api/placeholder/400/300',
      technologies: ['Arduino ESP8266', 'HTML', 'CSS', 'JavaScript', 'Python'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Dynamic Pricing Simulator',
      description: 'A guide that allows business analysts to simulate dynamic pricing strategies using Python and Streamlit',
      image: '/api/placeholder/400/300',
      technologies: ['Python Streamlit'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts',
      image: '/api/placeholder/400/300',
      technologies: ['JavaScript', 'API Integration', 'CSS3'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Social Media App',
      description: 'A modern social media platform with real-time messaging',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Socket.io', 'Express'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'AI-Powered Chatbot',
      description: 'An intelligent chatbot using natural language processing',
      image: '/api/placeholder/400/300',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const slideLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : projects.length - 1;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const slideRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      const newIndex = prev < projects.length - 1 ? prev + 1 : 0;
      return newIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getTransformStyle = () => {
    if (isMobile) {
      return {
        transform: `translateY(-${currentIndex * 100}%)`,
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    } else {
      // Adjust for showing 3 cards with center focus
      const offset = currentIndex * 33.333; // Each card takes 33.333% width
      return {
        transform: `translateX(calc(50% - ${offset}% - 16.666%))`, // Center the middle card
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }
  };

  const getCardStyle = (index) => {
    if (isMobile) return {};
    
    const distance = Math.abs(index - currentIndex);
    const isCenter = index === currentIndex;
    
    if (distance > 1) {
      return {
        opacity: 0,
        transform: 'scale(0.8)',
        pointerEvents: 'none'
      };
    }
    
    return {
      opacity: isCenter ? 1 : 0.4,
      transform: isCenter ? 'scale(1)' : 'scale(0.85)',
      pointerEvents: isCenter ? 'auto' : 'none',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <div className="py-20 px-4 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Title and View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 
            className={`text-4xl font-bold text-center md:text-left mb-4 md:mb-0 transition-all duration-1000 text-gray-900 dark:text-white ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            Featured Projects
          </h2>
          
          {/* View Mode Toggle */}
          <div className={`flex justify-center md:justify-end transition-all duration-700 delay-300 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'carousel'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('tabs')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'tabs'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Rendering Based on View Mode */}
        {viewMode === 'carousel' ? (
          <>
            {/* Navigation Arrows */}
            <div className={`flex justify-center mb-8 space-x-4 transition-all duration-700 delay-300 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              <button
                onClick={slideLeft}
                disabled={isAnimating}
                className="p-3 rounded-full transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobile ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  )}
                </svg>
              </button>
              
              <button
                onClick={slideRight}
                disabled={isAnimating}
                className="p-3 rounded-full transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobile ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  )}
                </svg>
              </button>
            </div>

            {/* Projects Container */}
            <div className={`relative overflow-hidden transition-all duration-700 delay-500 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}>
              
              {/* Desktop View - Horizontal Slider with 3 Cards Visible */}
              <div className="hidden md:block">
                <div className="relative h-[500px]">
                  <div 
                    className="flex absolute inset-0"
                    style={getTransformStyle()}
                  >
                    {projects.map((project, index) => (
                      <div 
                        key={index}
                        className="w-1/3 flex-shrink-0 px-4"
                        style={getCardStyle(index)}
                      >
                        <div className="max-w-sm mx-auto h-full">
                          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 h-full flex flex-col">
                            <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-t-xl">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                {project.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex} 
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-105"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="flex space-x-4">
                                <a 
                                  href={project.liveUrl} 
                                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                                >
                                  Live Demo
                                </a>
                                <a 
                                  href={project.githubUrl} 
                                  className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors duration-200 hover:underline"
                                >
                                  GitHub
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile View - Vertical Slider */}
              <div className="md:hidden">
                <div 
                  className="flex flex-col h-[500px]"
                  style={getTransformStyle()}
                >
                  {projects.map((project, index) => (
                    <div 
                      key={index}
                      className="w-full h-full flex-shrink-0 px-4 py-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl h-full transform transition-all duration-500 hover:scale-105">
                        <div className="aspect-w-16 aspect-h-9 mb-3 overflow-hidden rounded-t-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-32 object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium transform transition-all duration-300 hover:scale-105"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <a 
                              href={project.liveUrl} 
                              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline text-sm"
                            >
                              Live Demo
                            </a>
                            <a 
                              href={project.githubUrl} 
                              className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors duration-200 hover:underline text-sm"
                            >
                              GitHub
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className={`flex justify-center mt-8 space-x-2 transition-all duration-700 delay-700 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className={`text-center mt-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-700 delay-800 ${
              isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}>
              {currentIndex + 1} of {projects.length} projects
            </div>
          </>
        ) : (
          /* Tabs/List View */
          <div className={`transition-all duration-700 delay-500 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 ml-6">
                        <a 
                          href={project.liveUrl}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                          title="Live Demo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                        <a 
                          href={project.githubUrl}
                          className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                          title="GitHub Repository"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Projects;