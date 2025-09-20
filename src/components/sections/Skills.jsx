import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const sectionRef = useRef(null);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 90 },
    { name: 'CSS/Tailwind', level: 85 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills one by one with staggered delay
          skills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 150);
          });
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

  return (
    <div className="container-custom" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className={`text-4xl font-bold mb-8 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-800 ${
                animatedSkills.includes(index)
                  ? 'opacity-100 transform translate-y-0 scale-100'
                  : 'opacity-0 transform translate-y-12 scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                transformOrigin: 'center bottom'
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                <span 
                  className={`text-sm text-gray-600 dark:text-gray-400 transition-all duration-500 ${
                    animatedSkills.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index * 150) + 400}ms` }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1200 ease-out ${
                    animatedSkills.includes(index) ? 'animate-pulse-once' : ''
                  }`}
                  style={{ 
                    width: animatedSkills.includes(index) ? `${skill.level}%` : '0%',
                    transitionDelay: `${(index * 150) + 200}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-once {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .animate-pulse-once {
          animation: pulse-once 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Skills;