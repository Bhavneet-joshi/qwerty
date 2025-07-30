import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";
import { Users, Building2, Target, Award, Globe, ArrowRight, Mail, Phone, Linkedin, Twitter, Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  // Founders data
  const founders = [
    {
      name: "Rajesh Sharma",
      title: "Chairman & Managing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "With over 25 years of experience in industrial management and strategic planning, Rajesh has led HLSG Industries from a small startup to a leading enterprise. His vision for sustainable growth and innovation has been the driving force behind the company's success.",
      achievements: [
        "Led company growth from startup to ₹500+ crore enterprise",
        "Pioneered sustainable manufacturing practices in the industry",
        "Recipient of Industry Excellence Award 2023",
        "MBA from IIM Ahmedabad, B.Tech from IIT Delhi"
      ],
      expertise: ["Strategic Planning", "Industrial Management", "Sustainable Growth", "Innovation Leadership"],
      contact: {
        email: "rajesh.sharma@hlsgindustries.com",
        phone: "+91 98765 43210",
        linkedin: "https://linkedin.com/in/rajeshsharma",
        twitter: "https://twitter.com/rajeshsharma"
      }
    },
    {
      name: "Priya Patel",
      title: "Co-Founder & Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b512c2b4?w=400&h=400&fit=crop&crop=face",
      bio: "A technology visionary with deep expertise in digital transformation and automation. Priya has been instrumental in modernizing HLSG's operations and establishing our technological leadership in the contract management space.",
      achievements: [
        "Developed proprietary contract management platform",
        "Led digital transformation initiatives across organization",
        "Published 15+ research papers in industrial automation",
        "Ph.D. in Computer Science from Stanford University"
      ],
      expertise: ["Digital Transformation", "Automation", "Software Architecture", "AI/ML Implementation"],
      contact: {
        email: "priya.patel@hlsgindustries.com",
        phone: "+91 98765 43211",
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/priyapatel"
      }
    }
  ];

  // Logo animation state
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const logoElements = [
    {
      id: "h-letter",
      name: "H - Heritage",
      description: "The 'H' represents our Heritage - the strong foundation built over decades of excellence and tradition in industrial innovation.",
      color: "text-navyblue dark:text-golden",
      position: "transform translate-x-0 translate-y-0",
      delay: 0
    },
    {
      id: "l-letter", 
      name: "L - Leadership",
      description: "The 'L' symbolizes Leadership - our commitment to leading the industry through innovation, quality, and strategic vision.",
      color: "text-navyblue dark:text-golden",
      position: "transform translate-x-4 translate-y-0",
      delay: 1000
    },
    {
      id: "s-letter",
      name: "S - Solutions",
      description: "The 'S' stands for Solutions - our dedication to providing comprehensive, cutting-edge solutions for complex challenges.",
      color: "text-navyblue dark:text-golden", 
      position: "transform translate-x-8 translate-y-0",
      delay: 2000
    },
    {
      id: "g-letter",
      name: "G - Growth",
      description: "The 'G' represents Growth - our focus on sustainable expansion and continuous improvement for all stakeholders.",
      color: "text-navyblue dark:text-golden",
      position: "transform translate-x-12 translate-y-0", 
      delay: 3000
    },
    {
      id: "gradient-bg",
      name: "Golden Gradient",
      description: "The golden gradient background symbolizes prosperity, quality, and the bright future we're building together.",
      color: "bg-goldenrod1",
      position: "absolute inset-0 rounded-lg opacity-20",
      delay: 4000
    }
  ];

  const startAnimation = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setAnimationStep(0);
    
    logoElements.forEach((element, index) => {
      setTimeout(() => {
        if (!isPaused) {
          setAnimationStep(index + 1);
        }
      }, element.delay);
    });
    
    // Complete animation
    setTimeout(() => {
      if (!isPaused) {
        setAnimationStep(logoElements.length + 1);
        setIsPlaying(false);
      }
    }, 5000);
  };

  const pauseAnimation = () => {
    setIsPaused(true);
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(false);
    setIsPaused(false);
  };
  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-navyblue dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About HLSG Industries</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Leading the future of industrial excellence through innovation, integrity, and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </section>

        {/* Comment out Quick Navigation section since we're making it a single page */}
        {/*
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/about/founders">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-white dark:text-navyblue" />
                    </div>
                    <h3 className="text-2xl font-bold text-navyblue dark:text-golden mb-4">About Founders</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Meet the visionary leaders who built HLSG Industries from the ground up, combining decades of experience with innovative thinking.
                    </p>
                    <div className="flex items-center justify-center text-navyblue dark:text-golden group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold mr-2">Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Link>
              </Card>

              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/about/company">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building2 className="h-8 w-8 text-white dark:text-navyblue" />
                    </div>
                    <h3 className="text-2xl font-bold text-navyblue dark:text-golden mb-4">About Company</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Discover the meaning behind our brand through an interactive 3D journey of our logo elements and company values.
                    </p>
                    <div className="flex items-center justify-center text-navyblue dark:text-golden group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold mr-2">Watch Animation</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </section>
        */}

        {/* Company Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Founded with a vision to transform businesses through innovative solutions, HLSG Industries emerged from a simple belief: that technology and strategic thinking can solve the most complex business challenges.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our journey began when our founders recognized the growing need for comprehensive business solutions that bridge the gap between traditional practices and modern innovation.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Today, we stand as a testament to what's possible when vision meets execution, serving clients across industries with cutting-edge solutions and unwavering commitment to excellence.
                </p>
                
                {/* Comment out the navigation buttons since this is now a single page */}
                {/*
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/about/founders">
                    <Button className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue">
                      Meet Our Founders
                    </Button>
                  </Link>
                  <Link href="/about/company">
                    <Button variant="outline" className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden dark:hover:bg-golden dark:hover:text-navyblue">
                      Explore Our Brand
                    </Button>
                  </Link>
                </div>
                */}
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="HLSG Industries office" 
                  className="rounded-xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Foundation</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The principles that guide everything we do at HLSG Industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-navyblue dark:text-golden">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    To empower businesses with innovative solutions that drive growth, efficiency, and sustainable success in an ever-evolving marketplace.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-navyblue dark:text-golden">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    To be the global leader in transformative business solutions, setting new standards for innovation, quality, and client satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-navyblue dark:text-golden">Our Values</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Integrity, innovation, excellence, and collaboration form the cornerstone of our culture and guide every decision we make.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Impact</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and client success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">25+</div>
                <p className="text-gray-600 dark:text-gray-400">Years of Excellence</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">1000+</div>
                <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">50+</div>
                <p className="text-gray-600 dark:text-gray-400">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">99%</div>
                <p className="text-gray-600 dark:text-gray-400">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Animation Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Brand Story</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover the meaning behind our brand through an interactive journey of our logo elements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Animation Display */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-12 min-h-[400px] flex items-center justify-center overflow-hidden shadow-xl">
                  
                  {/* Gradient Background */}
                  <div className={`${animationStep >= 5 ? 'opacity-20' : 'opacity-0'} ${logoElements[4].color} ${logoElements[4].position} transition-all duration-1000 ease-in-out`}></div>
                  
                  {/* Logo Letters */}
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {logoElements.slice(0, 4).map((element, index) => (
                      <div
                        key={element.id}
                        className={`text-6xl font-bold ${element.color} transition-all duration-1000 ease-in-out ${
                          animationStep > index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                        style={{
                          transitionDelay: `${index * 200}ms`
                        }}
                      >
                        {element.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating particles effect */}
                  {animationStep >= 5 && (
                    <div className="absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-goldenrod1 rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Animation Controls */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    onClick={startAnimation}
                    disabled={isPlaying}
                    className="bg-navyblue hover:bg-darkblue text-white dark:bg-navyblue dark:hover:bg-darkblue"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isPlaying ? 'Playing...' : 'Start Animation'}
                  </Button>
                  <Button
                    onClick={pauseAnimation}
                    disabled={!isPlaying}
                    variant="outline"
                    className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-navyblue dark:text-navyblue"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={resetAnimation}
                    variant="outline"
                    className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-navyblue dark:text-navyblue"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              {/* Animation Description */}
              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  {logoElements.map((element, index) => (
                    <div
                      key={element.id}
                      className={`p-4 rounded-lg transition-all duration-500 ${
                        animationStep > index
                          ? 'bg-navyblue text-white dark:bg-goldenrod1 dark:text-navyblue shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <h3 className="text-lg font-bold mb-2">{element.name}</h3>
                      <p className="text-sm">{element.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Meet Our Founders</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Visionary leaders who built HLSG Industries from the ground up, combining decades of experience with innovative thinking.
              </p>
            </div>
            
            <div className="space-y-16">
              {founders.map((founder, index) => (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Founder Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-goldenrod1 text-navyblue px-6 py-3 rounded-lg shadow-lg">
                        <p className="font-semibold text-sm">{founder.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Founder Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div>
                      <h3 className="text-3xl font-bold text-navyblue dark:text-golden mb-2">{founder.name}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{founder.title}</p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{founder.bio}</p>
                    </div>

                    {/* Expertise */}
                    <div>
                      <h4 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-navyblue/10 dark:bg-goldenrod1/10 text-navyblue dark:text-golden border-navyblue/20 dark:border-goldenrod1/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {founder.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-goldenrod1 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact Information */}
                    <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-navyblue dark:text-golden text-lg">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{founder.contact.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{founder.contact.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Linkedin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <a href={founder.contact.linkedin} className="text-sm text-navyblue dark:text-golden hover:underline">LinkedIn</a>
                          </div>
                          <div className="flex items-center">
                            <Twitter className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <a href={founder.contact.twitter} className="text-sm text-navyblue dark:text-golden hover:underline">Twitter</a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}