import React from 'react';
import pfp from "../../assets/images/logos/pfp.png";
import { useRevealAnimation, useStaggeredAnimation } from '../../hooks/useIntersectionObserver';

const About = () => {
  const { targetRef: titleRef, animationClasses: titleClasses } = useRevealAnimation('up', {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { targetRef: contentRef, animationClasses: contentClasses } = useRevealAnimation('left', {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { targetRef: imageRef, animationClasses: imageClasses } = useRevealAnimation('right', {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { containerRef: badgesRef, isItemVisible } = useStaggeredAnimation(3, {
    threshold: 0.3,
    staggerDelay: 200
  });

  const badges = ['Frontend', 'Backend', 'Full Stack'];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 ${titleClasses}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div 
            ref={contentRef}
            className={`space-y-6 ${contentClasses}`}
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate developer with experience in building web applications using modern 
                technologies. I love creating clean, efficient, and user-friendly solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open source 
                projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Specialization Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 mt-8">
              {badges.map((badge, index) => (
                <span
                  key={badge}
                  className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg transform transition-all duration-500 ${
                    isItemVisible(index) 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-4 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { label: 'Projects Completed', value: '10+' },
                { label: 'Years Experience', value: '3+' }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md transform transition-all duration-700 ${
                    isItemVisible(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + badges.length) * 200}ms`
                  }}
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div 
            ref={imageRef}
            className={`relative ${imageClasses}`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl transform -rotate-3 opacity-20"></div>
              
              {/* Main image container */}
              <div className="relative bg-white dark:bg-gray-700 rounded-2xl p-2 shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="text-6xl"><img src={pfp} alt='Profile'></img></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-bounce">
                ⚡
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                🚀
              </div>
            </div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <span className="mr-2">🔧</span>
            <span className="font-medium">Explore My Skills</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;