"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { personalInfo, socialLinks } from '@/data/portfolio';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated greeting */}
        <div className="mb-6 animate-slide-down">
          <p className="text-accent text-lg md:text-xl font-medium">
            Hi, my name is
          </p>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-slide-up">
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-secondary mb-8 animate-slide-up">
          {personalInfo.title}
        </h2>

        {/* Bio */}
        <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-12 animate-fade-in">
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
          <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 animate-fade-in">
          <a
            href={socialLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent transition-all duration-300 text-2xl hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent transition-all duration-300 text-2xl hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={personalInfo.resume}
            download
            className="text-text-secondary hover:text-accent transition-all duration-300 text-2xl hover:scale-110"
            aria-label="Download Resume"
          >
            <FaFileDownload />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
