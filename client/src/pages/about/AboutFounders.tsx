import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";

export default function AboutFounders() {
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

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-navyblue to-darkblue dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Founders</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Visionary leaders who built HLSG Industries from the ground up, combining decades of experience 
                with innovative thinking to create lasting value.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <div className="absolute -bottom-6 -right-6 bg-golden dark:bg-goldenrod1 text-navyblue dark:text-white px-6 py-3 rounded-lg shadow-lg">
                        <p className="font-semibold text-sm">{founder.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Founder Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div>
                      <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-2">{founder.name}</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{founder.title}</p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{founder.bio}</p>
                    </div>

                    {/* Expertise */}
                    <div>
                      <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Areas of Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-navyblue/10 dark:bg-golden/10 text-navyblue dark:text-golden border-navyblue/20 dark:border-golden/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Key Achievements</h3>
                      <ul className="space-y-2">
                        {founder.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-golden dark:bg-goldenrod1 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-navyblue dark:text-golden" />
                            <a 
                              href={`mailto:${founder.contact.email}`}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden transition-colors"
                            >
                              {founder.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-navyblue dark:text-golden" />
                            <a 
                              href={`tel:${founder.contact.phone}`}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden transition-colors"
                            >
                              {founder.contact.phone}
                            </a>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Linkedin className="h-4 w-4 text-navyblue dark:text-golden" />
                            <a 
                              href={founder.contact.linkedin}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Twitter className="h-4 w-4 text-navyblue dark:text-golden" />
                            <a 
                              href={founder.contact.twitter}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Twitter Profile
                            </a>
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

        {/* Legacy Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Building a Legacy</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Together, our founders have created a company culture built on innovation, integrity, 
                and excellence. Their combined vision continues to drive HLSG Industries toward new 
                heights of success and industry leadership.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">25+</div>
                  <p className="text-gray-600 dark:text-gray-400">Years Combined Experience</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">500+</div>
                  <p className="text-gray-600 dark:text-gray-400">Company Valuation (Crores)</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-navyblue dark:text-golden mb-2">1000+</div>
                  <p className="text-gray-600 dark:text-gray-400">Employees Worldwide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}