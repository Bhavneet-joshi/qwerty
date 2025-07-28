import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PublicLayout from "@/components/PublicLayout";
import { Link } from "wouter";
import { 
  ChartLine, 
  Cog, 
  Handshake, 
  Shield, 
  Users, 
  Rocket, 
  Database, 
  Cloud, 
  Zap, 
  Target,
  ArrowRight
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <ChartLine className="h-8 w-8 text-white" />,
      title: "Business Strategy",
      description: "Strategic planning and implementation to accelerate your business growth and market positioning.",
      features: [
        "Market Analysis & Research",
        "Competitive Intelligence",
        "Strategic Roadmap Development",
        "Performance Metrics & KPIs"
      ],
      category: "Strategy"
    },
    {
      icon: <Cog className="h-8 w-8 text-white" />,
      title: "Technology Solutions",
      description: "Advanced technology implementations and digital transformation services for modern enterprises.",
      features: [
        "Custom Software Development",
        "System Integration",
        "Digital Transformation",
        "Technology Consulting"
      ],
      category: "Technology"
    },
    {
      icon: <Handshake className="h-8 w-8 text-white" />,
      title: "Contract Management",
      description: "Comprehensive contract lifecycle management with digital collaboration and tracking capabilities.",
      features: [
        "Contract Lifecycle Management",
        "Digital Collaboration Tools",
        "Compliance Tracking",
        "Automated Workflows"
      ],
      category: "Management"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Risk Management",
      description: "Proactive risk assessment and mitigation strategies to protect your business interests.",
      features: [
        "Risk Assessment & Analysis",
        "Mitigation Strategies",
        "Compliance Management",
        "Security Auditing"
      ],
      category: "Security"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Consulting Services",
      description: "Expert advisory services to guide your organization through complex business challenges.",
      features: [
        "Business Process Optimization",
        "Change Management",
        "Organizational Development",
        "Performance Improvement"
      ],
      category: "Consulting"
    },
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "Innovation Labs",
      description: "Research and development services to bring innovative solutions to market faster.",
      features: [
        "Product Development",
        "Prototype Creation",
        "Innovation Workshops",
        "Market Testing"
      ],
      category: "Innovation"
    },
    {
      icon: <Database className="h-8 w-8 text-white" />,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with our advanced analytics solutions.",
      features: [
        "Data Visualization",
        "Predictive Analytics",
        "Business Intelligence",
        "Real-time Reporting"
      ],
      category: "Analytics"
    },
    {
      icon: <Cloud className="h-8 w-8 text-white" />,
      title: "Cloud Services",
      description: "Scalable cloud solutions to modernize your infrastructure and improve efficiency.",
      features: [
        "Cloud Migration",
        "Infrastructure as Code",
        "DevOps Implementation",
        "Cloud Security"
      ],
      category: "Cloud"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Process Automation",
      description: "Streamline operations with intelligent automation solutions tailored to your needs.",
      features: [
        "Workflow Automation",
        "Robotic Process Automation",
        "API Integration",
        "Custom Automation Tools"
      ],
      category: "Automation"
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navyblue dark:text-golden mb-6">Our Services</h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive solutions designed to transform your business and drive sustainable growth through innovation and expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <Card key={index} className="service-card bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-navyblue dark:bg-blue-600 rounded-lg flex items-center justify-center">
                        {service.icon}
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-navyblue dark:text-golden">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">{service.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-goldenrod1 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/contact">
                      <Button className="w-full text-navyblue border-navyblue hover:bg-navyblue hover:text-white dark:text-golden dark:border-golden dark:hover:bg-golden dark:hover:text-navyblue" variant="outline">
                        Get This Service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-navyblue dark:text-golden mb-6">Our Process</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A proven methodology that ensures successful project delivery and client satisfaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We analyze your business needs and challenges to create a tailored solution strategy."
                },
                {
                  step: "02",
                  title: "Strategy",
                  description: "Our experts develop a comprehensive plan aligned with your goals and timeline."
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "We execute the solution with precision, keeping you informed every step of the way."
                },
                {
                  step: "04",
                  title: "Support",
                  description: "Ongoing support and optimization to ensure long-term success and growth."
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-navyblue dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{process.step}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-navyblue dark:text-golden mb-4">{process.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-navyblue dark:text-golden mb-6">Industries We Serve</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our expertise spans across multiple industries, delivering specialized solutions for unique challenges.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                "Healthcare",
                "Finance",
                "Manufacturing",
                "Technology",
                "Education",
                "Retail",
                "Government",
                "Energy",
                "Transportation",
                "Real Estate",
                "Media",
                "Telecommunications"
              ].map((industry, index) => (
                <Card key={index} className="card-hover transition-all duration-200 text-center bg-white dark:bg-gray-800">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navyblue dark:bg-golden rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-navyblue dark:text-golden text-sm sm:text-base">{industry}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-navyblue dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-golden mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Let's discuss how our services can help you achieve your business objectives and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-navyblue bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-navyblue bg-goldenrod1 hover:bg-goldenrod2 rounded-lg transition-all duration-200 shadow-lg">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
