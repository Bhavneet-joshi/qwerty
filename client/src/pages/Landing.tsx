import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import PublicLayout from "@/components/PublicLayout";
import { ChartLine, Cog, Handshake, Shield, Users, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  // Image carousel state - Required as per July 20th feedback
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Professional Team Meeting",
      description: "Collaborative solutions for your business"
    },
    {
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Modern Office Space",
      description: "Innovative workspace design"
    },
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Business Technology",
      description: "Cutting-edge solutions for growth"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navyblue dark:bg-gray-900"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-30 dark:opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-gray-100 mb-8 leading-tight">
              Building the Future,<br />
              <span className="text-goldenrod1 dark:text-yellow-400">Today</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12 max-w-4xl mx-auto font-medium">
              At HLSG Industries, we don't just envision the future—we build it
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium bg-goldenrod1 hover:bg-goldenrod2 text-navyblue dark:bg-goldenrod1 dark:hover:bg-goldenrod2 dark:text-navyblue rounded-lg transition-all duration-200 shadow-lg">
                  Explore Our Services
                </Button>
              </Link>
              <Button
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium bg-navyblue hover:bg-darkblue text-white dark:bg-navyblue dark:hover:bg-darkblue dark:text-white rounded-lg transition-all duration-200 shadow-lg"
                onClick={() => window.location.href = "/login"}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navyblue dark:text-golden mb-6">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive solutions tailored to drive your business forward with cutting-edge technology and expert guidance.
            </p>
            <Link href="/services">
              <Button className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium bg-navyblue hover:bg-darkblue text-white dark:bg-navyblue dark:hover:bg-darkblue dark:text-white rounded-lg transition-all duration-200 shadow-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navyblue dark:text-golden mb-6">About HLSG Industries</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded with a vision to transform businesses through innovative solutions, HLSG Industries has been at the forefront of technological advancement and strategic business development.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our commitment to excellence and future-focused approach has made us a trusted partner for organizations seeking to navigate the complexities of modern business landscapes.
              </p>
              
              {/* Comment out The Numbers section as requested in July 20th feedback */}
              {/*
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-navyblue dark:text-blue-400 mb-2">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navyblue dark:text-blue-400 mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Expert Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navyblue dark:text-blue-400 mb-2">99%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navyblue dark:text-blue-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
                </div>
              </div>
              */}
              
              {/* Consolidate two buttons into single button as requested in July 20th feedback */}
              <div className="flex justify-start">
                <Link href="/about">
                  <Button className="px-6 py-3 bg-navyblue hover:bg-darkblue text-white dark:bg-navyblue dark:hover:bg-darkblue dark:text-white rounded-lg transition-all duration-200">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
              {/* Comment out the original two separate buttons */}
              {/*
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button className="px-6 py-3 bg-navyblue hover:bg-darkblue text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-all duration-200">
                    About Our Founders
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="px-6 py-3 text-navyblue border-navyblue hover:bg-navyblue hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white">
                    Company History
                  </Button>
                </Link>
              </div>
              */}
            </div>
            
            {/* Image Carousel - Added as required in July 20th feedback */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-xl h-96">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                      index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                      transform: `translateX(${(index - currentSlide) * 100}%)`
                    }}
                  >
                    <img 
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">{image.title}</h3>
                      <p className="text-gray-200">{image.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Carousel Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-navyblue dark:bg-navyblue rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-navyblue dark:text-golden">Industry Leader</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Innovation Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navyblue dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-6">Ready to Build Your Future?</h2>
          <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            As a new company, we're eager to help transform your business with our innovative solutions and fresh perspective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg font-medium bg-goldenrod1 hover:bg-goldenrod2 text-navyblue dark:bg-goldenrod1 dark:hover:bg-goldenrod2 dark:text-navyblue rounded-lg transition-all duration-200 shadow-lg">
                Start Your Project
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg font-medium bg-navyblue hover:bg-darkblue text-white dark:bg-navyblue dark:hover:bg-darkblue dark:text-white rounded-lg transition-all duration-200 shadow-lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
