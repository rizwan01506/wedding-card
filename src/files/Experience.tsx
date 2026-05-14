"use client";

import React from 'react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { experiences } from '@/data/portfolio';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';

const Experience = () => {
  return (
    <Container id="experience">
      <SectionTitle
        title="Work Experience"
        subtitle="My professional journey and career milestones"
      />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card key={exp.id} className="relative">
            {/* Timeline connector */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-8 top-full h-8 w-0.5 bg-accent hidden md:block"></div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <FaBriefcase className="text-2xl text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary mt-2 md:mt-0">
                    <FaCalendar className="text-accent" />
                    <span>{exp.period}</span>
                    {exp.current && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Experience;
