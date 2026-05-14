"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { projects } from '@/data/portfolio';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <Container id="projects" className="bg-secondary/30">
      <SectionTitle
        title="Featured Projects"
        subtitle="Some of my recent work and side projects"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayedProjects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full group">
            {/* Project Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {project.featured && (
                <div className="absolute top-2 right-2 bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Featured
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {project.title}
              </h3>
              <p className="text-text-secondary mb-4">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  <FaGithub className="text-xl" />
                  <span className="text-sm">Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  <FaExternalLinkAlt className="text-lg" />
                  <span className="text-sm">Live Demo</span>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Show More/Less Button */}
      {projects.length > 3 && (
        <div className="text-center">
          <Button onClick={() => setShowAll(!showAll)} variant="outline">
            {showAll ? 'Show Less' : `Show All Projects (${projects.length})`}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Projects;
