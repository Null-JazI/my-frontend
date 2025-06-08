import React from 'react';

const About = () => {
  return (
    <div className="container-custom">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <p className="text-lg leading-relaxed">
              I'm a passionate developer with experience in building web applications
              using modern technologies. I love creating clean, efficient, and
              user-friendly solutions.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or sharing knowledge with
              the developer community.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                <span className="text-blue-800 dark:text-blue-200 font-medium">Frontend</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full">
                <span className="text-green-800 dark:text-green-200 font-medium">Backend</span>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">
                <span className="text-purple-800 dark:text-purple-200 font-medium">Full Stack</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 absolute"></div>
              <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center relative z-10">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;