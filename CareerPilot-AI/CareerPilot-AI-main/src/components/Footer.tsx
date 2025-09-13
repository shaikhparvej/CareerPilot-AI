'use client';

import { AlertTriangle, Download, Globe, Heart, Linkedin, Mail, MapPin, Phone, Shield, Users } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Mock Interview', href: '/mock-interview' },
      { name: 'Grammar Check', href: '/grammar-check' },
      { name: 'Q&A', href: '/q-and-a' },
      { name: 'Online IDE', href: '/online-ide' },
      { name: 'Focus Mode', href: '/focus-mode' },
      { name: 'About Us', href: '#about' }
    ],
    services: [
      { name: 'AI Mock Interview', href: '/mock-interview' },
      { name: 'Language Learning', href: '/grammar-check' },
      { name: 'Code Practice', href: '/online-ide' },
      { name: 'Q&A Generation', href: '/q-and-a' },
      { name: 'Focus Timer', href: '/focus-mode' },
      { name: 'Study Materials', href: '/dashboard' }
    ],
    resources: [
      { name: 'Interview Guidelines', href: '/setup' },
      { name: 'Learning Resources', href: '/integrations' },
      { name: 'Setup Guide', href: '/setup' },
      { name: 'Integrations', href: '/integrations' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@careerpilot.ai' },
    { name: 'Website', icon: Globe, href: 'https://careerpilot.ai' }
  ];

  const handleContact = () => {
    const message = "Hi! I'm interested in learning more about CareerPilot AI platform.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        {/* Emergency Contact Section */}
        <div className="border-b border-white/10 relative z-10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                AI-Powered Learning Platform
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Get personalized learning assistance and interview preparation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                />
                <button
                  onClick={handleContact}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                CareerPilot AI
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                AI-Powered Interview Preparation Platform. Comprehensive learning journey with advanced AI technology, real-time feedback, and skill development tools.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <Phone className="text-blue-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-400">Support Hotline:</p>
                    <p className="font-semibold text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <Mail className="text-blue-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-400">Support Email:</p>
                    <p className="font-semibold text-white">support@careerpilot.ai</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <MapPin className="text-blue-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-400">Headquarters:</p>
                    <p className="font-semibold text-white">San Francisco, CA, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-blue-400/30 pb-2">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-blue-400/30 pb-2">Our Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-blue-400/30 pb-2">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-left flex items-center gap-2 hover:translate-x-1 transform transition-transform"
                    >
                      {link.name === 'Interview Guidelines' && <AlertTriangle className="h-4 w-4" />}
                      {link.name === 'Learning Resources' && <Users className="h-4 w-4" />}
                      {link.name === 'Setup Guide' && <Shield className="h-4 w-4" />}
                      {link.name === 'Integrations' && <Download className="h-4 w-4" />}
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 sm:mb-0">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-300 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>

              <div className="text-center sm:text-right">
                <p className="text-gray-300 text-sm">
                  © 2025 <span className="font-bold text-white">CareerPilot AI</span>. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  AI-Powered Interview Preparation Platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Made with <Heart className="inline h-4 w-4 text-red-400 animate-pulse" /> by{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                  CareerPilot Team
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          ↑
        </button>
      </footer>
    </>
  );
};

export default Footer;
