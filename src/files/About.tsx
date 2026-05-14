"use client";

import React from 'react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaCode className="text-4xl text-accent" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: <FaRocket className="text-4xl text-accent" />,
      title: "Fast Performance",
      description: "Building high-performance applications optimized for speed and user experience.",
    },
    {
      icon: <FaLightbulb className="text-4xl text-accent" />,
      title: "Creative Solutions",
      description: "Solving complex problems with innovative and elegant solutions.",
    },
  ];

  return (
    <Container id="about">
      <SectionTitle
        title="About Me"
        subtitle="Get to know more about who I am and what I do"
      />

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* Image/Avatar Section */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-accent to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-3 rounded-full font-bold shadow-lg">
              Full Stack Dev
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-text-primary">
            I'm a Full Stack Developer
          </h3>
          <p className="text-text-secondary leading-relaxed">
            With several years of experience in web development, I specialize in creating
            modern, responsive, and user-friendly applications. My journey in tech started
            with a curiosity about how websites work, and it has evolved into a passion for
            building products that make a difference.
          </p>
          <p className="text-text-secondary leading-relaxed">
            I work with modern technologies like React, Next.js, Node.js, and TypeScript to
            build full-stack applications. I'm constantly learning and staying updated with
            the latest trends in web development to deliver the best solutions.
          </p>
          <p className="text-text-secondary leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing my knowledge through technical writing and
            mentoring.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <Card key={index} className="text-center">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h4 className="text-xl font-bold text-text-primary mb-2">{item.title}</h4>
            <p className="text-text-secondary">{item.description}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default About;
