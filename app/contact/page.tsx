'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const collectionCards = [
    { name: 'BRIDESMAID', img: '/redcolorkipic.png' },
    { name: 'HALDI', img: '/yellowkipic.png' },
    { name: 'KOCKTAIL', img: '/darkblue.png' },
    { name: 'MEHNADI', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400' },
    { name: 'RECEPTION', img: '/darkred.png' },
    { name: 'SANGIT', img: '/bluecolorkipic.png' }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 overflow-x-hidden">
      
      {/* 1. Top Header Banner */}
      <div className="relative w-full h-[350px] sm:h-[480px] bg-gray-900 overflow-hidden flex items-center justify-center">
        <img 
          src="/collectionhomepage1.png" 
          alt="Collection Header Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-amber-300 uppercase tracking-widest text-xs font-semibold mb-2 block">Get In Touch With Us</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-md">We Are Here To Help You</h1>
          <p className="text-gray-100 text-sm sm:text-base font-light drop-shadow">
            Have questions about our designer wear or custom tailoring? Connect with our team anytime.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 2. Infinite Continuous Sliding Cards Section */}
        <div className="mb-20 overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Explore Our Categories</h2>
            <div className="w-16 h-1 bg-[#b9381e] mx-auto mt-2 rounded-full"></div>
            <p className="text-xs text-gray-500 mt-1">Continuous automatic sliding showcase of our exclusive collections</p>
          </div>

          {/* Marquee Animation Wrapper */}
          <div className="relative w-full overflow-hidden flex">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 25s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="animate-marquee flex gap-6">
              {[...collectionCards, ...collectionCards].map((card, i) => (
                <div 
                  key={i} 
                  className="w-[260px] sm:w-[280px] flex-shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-center group"
                >
                  <div className="h-64 sm:h-72 rounded-xl overflow-hidden mb-3 relative bg-gray-100">
                    <img 
                      src={card.img} 
                      alt={card.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-gray-800 tracking-wider py-1">{card.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Three Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Our Location</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Sumit Digitech Pvt Ltd<br />India</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Phone & Support</h3>
            <p className="text-gray-600 text-sm leading-relaxed">+91 83859 73582<br />Mon - Sat: 9:00 AM - 7:00 PM</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">support@sumitdigitech.com<br />info@sumitdigitech.com</p>
          </div>
        </div>

        {/* 4. Contact Form & Side Image (Image Fully Visible without cropping) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <span className="text-[#b9381e] font-semibold text-xs uppercase tracking-wider block mb-2">Send Message</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Drop Us A Line</h2>
            <p className="text-gray-600 text-sm mb-8">
              Fill out the form below and our team will get back to you within 24 business hours.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#b9381e] transition-colors shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#b9381e] transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#b9381e] transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Your Message</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#b9381e] transition-colors shadow-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#b9381e] hover:bg-[#a03019] text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* hiran.png with object-contain to prevent cutting/cropping */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md h-[480px] w-full bg-[#fbf9f6] flex items-center justify-center border border-gray-100">
              <img 
                src="/hiran.png" 
                alt="Exclusive Experience" 
                className="w-full h-full object-contain p-2"
                onError={(e) => { (e.target as HTMLImageElement).src = '/darkblue.png'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 pointer-events-none">
                <div className="text-white">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest block mb-1">Exclusive Experience</span>
                  <h4 className="text-xl font-serif font-bold">Discover Handcrafted Perfection</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Google Map Section for Sumit Digitech Pvt Ltd */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="mb-4 px-4 pt-2">
            <h3 className="text-xl font-serif font-bold text-gray-900">Find Us On Google Map</h3>
            <p className="text-xs text-gray-500">Sumit Digitech Pvt Ltd Location</p>
          </div>
          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-100">
            <iframe
              title="Sumit Digitech Pvt Ltd Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5!2d75.8!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMlDCsDU0JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}