import React, { useState, useEffect } from 'react';
// Using simple SVG icons instead of lucide-react

const InteractiveTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);

  // Simple SVG icons
  const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  const GraduationCapIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  const timelineEvents = [
    {
      year: '2017',
      title: 'My First Project',
      type: 'milestone',
      icon: <CalendarIcon />,
      company: 'Personal',
      description: 'My first mobile app using MIT App Inventor. Simple LED Control.',
      color: 'from-pink-500 to-purple-600',
      achievements: ['Learned basics of app development']
    },
    {
      year: '2021',
      title: 'Entry in Web Development',
      type: 'work',
      icon: <BriefcaseIcon />,
      company: 'Personal',
      /*period: '2019 - 2020',*/
      description: 'Created my first portfolio website using HTML, CSS, and JavaScript.',
      color: 'from-green-500 to-emerald-600',
      achievements: ['Built 15+ responsive websites', 'Learned HTML, CSS, JavaScript', 'First professional coding experience']
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      type: 'work',
      icon: <BriefcaseIcon />,
      company: 'Startup Inc.',
      period: '2020 - 2022',
      description: 'My first fully functional project using MySQL and HTML CSS JavaScript.',
      color: 'from-blue-500 to-cyan-600',
      achievements: ['Mastered MERN stack', 'Led 3 major projects', 'Mentored 2 junior developers', 'Increased team productivity by 25%']
    },
    {
      year: '2024',
      title: 'New Company',
      type: 'work',
      icon: <GraduationCapIcon />,
      company: 'iSpy',
      period: '2024 - Present',
      description: 'Intelligent AI system for online security and assistance.',
      color: 'from-orange-500 to-red-600',
      achievements: ['40% performance improvement', 'Led team of 5 developers', 'Implemented TypeScript migration', 'Reduced bug reports by 60%']
    }
  ];

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % timelineEvents.length);
    setExpandedItem(null);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
    setExpandedItem(null);
  };

  const goToEvent = (index) => {
    setCurrentIndex(index);
    setExpandedItem(null);
  };

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevEvent();
      if (e.key === 'ArrowRight') nextEvent();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Journey Timeline
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">Navigate through the milestones and achievements</p>
        </div>

        {/* Mobile: Single Card View */}
        <div className="block lg:hidden">
          {/* Navigation Controls */}
          <div className="flex justify-center items-center mb-6 gap-4">
            <button
              onClick={prevEvent}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeftIcon />
            </button>
            
            <div className="text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm">
              {currentIndex + 1} of {timelineEvents.length}
            </div>
            
            <button
              onClick={nextEvent}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Single Card */}
          <div className="max-w-md mx-auto">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  {/* Icon and Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${event.color} text-white shadow-lg`}>
                      {event.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{event.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{event.company}</p>
                  {event.period && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{event.period}</p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{event.description}</p>
                  
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                  >
                    {expandedItem === index ? 'Show Less' : 'Show Achievements'}
                  </button>

                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedItem === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {event.achievements.map((achievement, achIndex) => (
                          <li 
                            key={achIndex}
                            className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          {/* Navigation Controls */}
          <div className="flex justify-center items-center mb-8 gap-4">
            <button
              onClick={prevEvent}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeftIcon />
            </button>
            
            <div className="text-gray-800 dark:text-gray-200 text-lg font-medium px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm">
              {currentIndex + 1} / {timelineEvents.length}
            </div>
            
            <button
              onClick={nextEvent}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Horizontal Timeline */}
          <div className="flex items-center justify-between space-x-4 mb-8">
            {timelineEvents.map((event, index) => (
              <React.Fragment key={index}>
                {/* Timeline Card */}
                <div
                  className={`flex-1 cursor-pointer transition-all duration-300 ${
                    index === currentIndex ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-90'
                  }`}
                  onClick={() => goToEvent(index)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
                    {/* Icon and Year */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${event.color} text-white shadow-lg`}>
                        {event.icon}
                      </div>
                      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{event.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{event.company}</p>
                    {event.period && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{event.period}</p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{event.description}</p>
                    
                    {index === currentIndex && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                      >
                        {expandedItem === index ? 'Show Less' : 'Show Achievements'}
                      </button>
                    )}

                    {/* Expanded Content */}
                    {index === currentIndex && (
                      <div className={`overflow-hidden transition-all duration-500 ${
                        expandedItem === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                          <h4 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {event.achievements.map((achievement, achIndex) => (
                              <li 
                                key={achIndex}
                                className="text-gray-600 dark:text-gray-300 text-xs flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow between cards */}
                {index < timelineEvents.length - 1 && (
                  <div className="flex-shrink-0 px-2">
                    <ArrowRightIcon className={`w-6 h-6 transition-all duration-300 ${
                      index === currentIndex || index + 1 === currentIndex
                        ? 'text-blue-500 dark:text-blue-400 scale-110'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Timeline Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => goToEvent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="text-center mt-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Use arrow keys or navigation buttons • Click cards or dots to explore
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;