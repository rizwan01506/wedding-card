"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { socialLinks } from '@/data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconMap: { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
  };

  return (
    <footer className="bg-secondary border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors duration-300 text-xl"
                  aria-label={link.name}
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-text-secondary text-sm flex items-center gap-2">
            <span>© {currentYear} Mohd Rizwan. Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
