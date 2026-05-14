"use client";

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '@/data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    // For now, we'll just log the data
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container id="contact">
      <SectionTitle
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let's talk!"
      />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Let's work together
            </h3>
            <p className="text-text-secondary leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your visions. Feel free to reach out through the form or
              contact me directly.
            </p>
          </div>

          <Card>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <FaEnvelope className="text-xl text-accent" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-1">Email</h4>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl text-accent" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-1">Location</h4>
                <p className="text-text-secondary">{personalInfo.location}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-slate-700 rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-slate-700 rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-text-primary font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-slate-700 rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors duration-300"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-primary border border-slate-700 rounded-lg text-text-primary focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <FaPaperPlane />
              <span>Send Message</span>
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
};

export default Contact;
