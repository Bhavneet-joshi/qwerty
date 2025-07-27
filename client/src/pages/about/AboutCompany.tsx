import { useState, useEffect } from "react";
import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function AboutCompany() {
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
      color: "bg-gradient-to-r from-goldenrod1 to-golden",
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

  useEffect(() => {
    // Auto-start animation on component mount
    const timer = setTimeout(startAnimation, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-navyblue to-darkblue dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Discover the meaning behind our brand through an interactive journey of our logo elements.
              </p>
            </div>
          </div>
        </section>

        {/* Logo Animation Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Animation Display */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 min-h-[400px] flex items-center justify-center overflow-hidden">
                  
                  {/* Gradient Background */}
                  <div className={`${animationStep >= 5 ? 'opacity-20' : 'opacity-0'} ${logoElements[4].color} ${logoElements[4].position} transition-all duration-1000 ease-in-out`}></div>
                  
                  {/* Logo Letters */}
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {logoElements.slice(0, 4).map((element, index) => (
                      <div
                        key={element.id}
                        className={`
                          text-8xl font-bold transition-all duration-1000 ease-in-out transform
                          ${animationStep > index ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'}
                          ${animationStep === logoElements.length + 1 ? element.position : 'translate-x-0 translate-y-0'}
                          ${element.color}
                        `}
                        style={{
                          transitionDelay: `${index * 200}ms`,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {element.name.charAt(0)}
                      </div>
                    ))}
                  </div>

                  {/* Final Assembly Effect */}
                  {animationStep === logoElements.length + 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-navyblue dark:text-golden mb-4 animate-pulse">
                          HLSG
                        </div>
                        <div className="text-xl text-gray-600 dark:text-gray-300 font-semibold">
                          Industries
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Animation Controls */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    onClick={startAnimation}
                    disabled={isPlaying}
                    className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isPlaying ? 'Playing...' : 'Play Animation'}
                  </Button>
                  <Button
                    onClick={pauseAnimation}
                    disabled={!isPlaying}
                    variant="outline"
                    className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={resetAnimation}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Element Descriptions */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-4">The HLSG Story</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Each element of our logo represents a core value that defines who we are and guides our mission.
                  </p>
                </div>

                {logoElements.map((element, index) => (
                  <Card
                    key={element.id}
                    className={`
                      transition-all duration-500 border-l-4 
                      ${animationStep > index 
                        ? 'opacity-100 transform translate-x-0 border-l-golden dark:border-l-goldenrod1 bg-golden/5 dark:bg-goldenrod1/5' 
                        : 'opacity-50 transform translate-x-4 border-l-gray-200 dark:border-l-gray-700'
                      }
                    `}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">
                        {element.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {element.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Core Values</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These values, embodied in our logo, guide every decision we make and every relationship we build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {logoElements.slice(0, 4).map((element, index) => (
                <Card key={index} className="text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-navyblue dark:text-golden mb-4">
                      {element.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">
                      {element.name.split(' - ')[1]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {element.description.split(' - ')[1]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">By the Numbers</h2>
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
      </div>
    </PublicLayout>
  );
}