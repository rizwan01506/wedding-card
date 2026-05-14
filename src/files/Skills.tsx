"use client";

import React from 'react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { skills } from '@/data/portfolio';

const Skills = () => {
  const categories = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Others',
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <Container id="skills" className="bg-secondary/30">
      <SectionTitle
        title="Skills & Technologies"
        subtitle="Technologies and tools I work with"
      />

      <div className="space-y-12">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
              {categories[category as keyof typeof categories]}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill, index) => (
                <Card key={index}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-semibold">
                        {skill.name}
                      </span>
                      <span className="text-accent font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-accent to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Skills;
