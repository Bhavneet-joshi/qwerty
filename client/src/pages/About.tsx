import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";
import { Users, Building2, Target, Award, Globe, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-navyblue to-darkblue dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About HLSG Industries</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Leading the future of industrial excellence through innovation, integrity, and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/about/founders">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-darkblue dark:from-golden dark:to-goldenrod1 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-darkblue dark:from-golden dark:to-goldenrod1 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-full flex items-center justify-center mx-auto mb-4">
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
      </div>
    </PublicLayout>
  );
}