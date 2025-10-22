import React from "react";

import Divider from "./Divider";
import config from "../config/index.json";

const Education = () => {
  const { education } = config.education;

  return (
    <section className="bg-background py-8" id="education">
      <div className="container max-w-6xl mx-auto m-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
            {config.education.title}
          </h1>
          <Divider />
          <p className="text-center text-lg text-gray-600 mb-8">
            {config.education.subtitle}
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
          
          {education.map((edu, index) => (
            <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
              
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                  {/* Status badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    edu.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      edu.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    {edu.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>

                  {/* Degree and field */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {edu.degree}
                  </h3>
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    {edu.field}
                  </h4>

                  {/* Institution */}
                  <div className="mb-3">
                    <h5 className="font-semibold text-gray-700 mb-1">
                      {edu.institution}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      📍 {edu.location}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{edu.startDate}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{edu.endDate}</span>
                  </div>

                  {/* Level indicator */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      edu.level === 'undergraduate' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {edu.level === 'undergraduate' ? '🎓 Bachelor\'s' : '🎓 Engineering\'s'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {education.filter(edu => edu.status === 'completed').length}
              </div>
              <div className="text-gray-600">Degrees Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {education.filter(edu => edu.status === 'in progress').length}
              </div>
              <div className="text-gray-600">Currently Pursuing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {7}
              </div>
              <div className="text-gray-600">Years of Education</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
