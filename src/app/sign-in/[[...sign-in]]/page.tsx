'use client';

import { SignIn } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    fact: 'CodeSense AI analyzes over 1 million lines of code per second, helping developers identify potential issues before they become problems.',
  },
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    fact: 'Our GitHub integration has helped teams reduce code review time by 60% through AI-powered suggestions and automated checks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    fact: 'CodeSense\'s machine learning models are trained on over 1 billion public repositories, providing context-aware code completion.',
  },
];

export default function SignInPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0a192f]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[45%] p-6 lg:p-12 bg-white">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-semibold text-xl text-blue-600">CodeSense</span>
          </div>

          {/* Clerk Sign-In Component */}
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                    card: 'shadow-none',
                    headerTitle: 'text-2xl font-bold text-gray-900',
                    headerSubtitle: 'text-gray-600',
                    socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
                    formFieldInput: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500',
                    footerActionLink: 'text-blue-600 hover:text-blue-700',
                  },
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500 mt-8">
            ©2025 CodeSense. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="hidden lg:block w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">
                  Welcome to CodeSense
                </h2>
                <p className="text-xl font-light mb-12 max-w-2xl">
                  {slide.fact}
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="bg-white/10 hover:bg-white/20 border-none text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {carouselData.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentSlide
                            ? 'bg-white'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="bg-white/10 hover:bg-white/20 border-none text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
    </div>
  );
}
