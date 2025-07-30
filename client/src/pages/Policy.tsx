import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, FileText, HelpCircle, Shield, Eye, EyeOff } from "lucide-react";

export default function Policy() {
  const [showDetailedView, setShowDetailedView] = useState(false);

  const handleDownload = (format: string) => {
    // In a real application, this would generate and download the actual policy document
    const content = generatePolicyContent();
    const blob = new Blob([content], { 
      type: format === 'pdf' ? 'application/pdf' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HLSG-Privacy-Policy-Terms.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePolicyContent = () => {
    return `HLSG Industries Privacy Policy & Terms of Service
Last Updated: January 30, 2025

PRIVACY POLICY

Information We Collect:
- Personal Information: Name, email, contact details, professional information
- Technical Information: IP address, browser type, device information, usage data

How We Use Your Information:
- Provide contract management services
- Process transactions and manage accounts
- Send service updates
- Improve platform through analytics
- Ensure security and prevent fraud
- Comply with legal obligations

Information Security:
- End-to-end encryption
- Secure database storage
- Regular security audits
- Employee training on data protection
- Incident response procedures

TERMS OF SERVICE

Data Retention:
- Account information: Active account duration plus 3 years
- Transaction records: 7 years for compliance
- Communication logs: 2 years for service improvement
- Usage analytics: Aggregated data retained indefinitely

Your Rights:
- Access and portability of your data
- Correction of inaccurate information
- Request deletion of your data
- Restrict processing activities
- Transfer data to another provider

Third-Party Sharing:
We do not sell personal information. We may share data with:
- Service providers for platform operation
- Legal authorities when required by law
- Business partners with explicit consent
- Successors in case of business transfer

Contact Information:
Data Protection Officer: privacy@hlsgindustries.com
Legal Team: legal@hlsgindustries.com
Address: HLSG Industries, Business District, Corporate City

© 2025 HLSG Industries. All rights reserved.`;
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Policy Header */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-navyblue dark:text-golden mb-4">Privacy Policy & Terms of Service</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Last updated: January 30, 2025
              </p>
              
              {/* Policy Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <Label htmlFor="policy-toggle" className="text-navyblue dark:text-golden font-medium">
                    Simple View
                  </Label>
                  <Switch
                    id="policy-toggle"
                    checked={showDetailedView}
                    onCheckedChange={setShowDetailedView}
                    className="data-[state=checked]:bg-goldenrod1"
                  />
                  <Label htmlFor="policy-toggle" className="text-navyblue dark:text-golden font-medium">
                    Detailed View
                  </Label>
                  <EyeOff className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Policy Section */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-navyblue dark:text-golden flex items-center">
                  <Download className="mr-3 h-6 w-6" />
                  Download Policy Documents
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Get a copy of our complete privacy policy and terms of service for your records.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload('pdf')}
                      className="bg-goldenrod1 hover:bg-goldenrod2 text-navyblue dark:bg-goldenrod1 dark:hover:bg-goldenrod2 dark:text-navyblue"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload('txt')}
                      className="border-goldenrod1 text-goldenrod1 hover:bg-goldenrod1 hover:text-navyblue dark:border-goldenrod1 dark:text-goldenrod1"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Text
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Documents are updated automatically when policies change.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Policy Content - Responsive View */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {showDetailedView ? (
              // Detailed View - Horizontal Layout
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Privacy Policy Column */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-navyblue dark:text-golden mb-6">Privacy Policy</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Information We Collect</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Personal Information:</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                              <li>Name, email address, and contact information</li>
                              <li>Professional details including company and job title</li>
                              <li>Account credentials and authentication data</li>
                              <li>Communication preferences and history</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Technical Information:</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                              <li>IP address, browser type, and device information</li>
                              <li>Usage patterns and interaction data</li>
                              <li>Cookies and similar tracking technologies</li>
                              <li>Performance and error logs</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">How We Use Your Information</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                          <li>Provide and maintain our contract management services</li>
                          <li>Process transactions and manage user accounts</li>
                          <li>Send important service updates and communications</li>
                          <li>Improve our platform through usage analytics</li>
                          <li>Ensure security and prevent fraudulent activities</li>
                          <li>Comply with legal obligations and regulatory requirements</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Information Security</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          We implement industry-standard security measures to protect your personal information:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                          <li>End-to-end encryption for data transmission</li>
                          <li>Secure database storage with access controls</li>
                          <li>Regular security audits and vulnerability assessments</li>
                          <li>Employee training on data protection best practices</li>
                          <li>Incident response procedures for data breaches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terms of Service Column */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-navyblue dark:text-golden mb-6">Terms of Service</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Data Retention</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                          <li>Account information: Duration of active account plus 3 years</li>
                          <li>Transaction records: 7 years for compliance purposes</li>
                          <li>Communication logs: 2 years for service improvement</li>
                          <li>Usage analytics: Aggregated data retained indefinitely</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Your Rights</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          Under applicable data protection laws, you have the following rights:
                        </p>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Access & Portability:</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                              <li>Request copies of your personal data</li>
                              <li>Export your data in a portable format</li>
                              <li>Transfer data to another service provider</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Control & Deletion:</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                              <li>Correct inaccurate information</li>
                              <li>Request deletion of your data</li>
                              <li>Restrict processing activities</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Third-Party Sharing</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                          <li>Service providers who help operate our platform</li>
                          <li>Legal authorities when required by law</li>
                          <li>Business partners with your explicit consent</li>
                          <li>Successors in case of business transfer</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-navyblue dark:text-golden mb-3">Contact Information</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          For questions about this policy or your privacy rights, contact us:
                        </p>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong className="text-gray-800 dark:text-gray-200">Data Protection Officer:</strong> privacy@hlsgindustries.com
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong className="text-gray-800 dark:text-gray-200">Legal Team:</strong> legal@hlsgindustries.com
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong className="text-gray-800 dark:text-gray-200">Address:</strong> HLSG Industries, Business District, Corporate City
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Simple View - Accordion Layout
              <div className="max-w-4xl mx-auto space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="privacy-basics" className="border border-golden/20 dark:border-golden/30 rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold text-navyblue dark:text-golden hover:text-goldenrod1">
                      <div className="flex items-center">
                        <Shield className="mr-3 h-5 w-5" />
                        What Information Do We Collect?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-4">
                      <p className="mb-3">We collect information that helps us provide better contract management services:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Your name, email, and contact details when you create an account</li>
                        <li>Company information and professional details for business purposes</li>
                        <li>Usage data to improve our platform and fix issues</li>
                        <li>Technical information like your browser type and IP address for security</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-use" className="border border-golden/20 dark:border-golden/30 rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold text-navyblue dark:text-golden hover:text-goldenrod1">
                      <div className="flex items-center">
                        <Eye className="mr-3 h-5 w-5" />
                        How Do We Use Your Information?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-4">
                      <p className="mb-3">Your information helps us:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Manage your contracts and documents securely</li>
                        <li>Send you important updates about your account</li>
                        <li>Provide customer support when you need help</li>
                        <li>Keep your account safe from unauthorized access</li>
                        <li>Improve our services based on how you use our platform</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-rights" className="border border-golden/20 dark:border-golden/30 rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold text-navyblue dark:text-golden hover:text-goldenrod1">
                      <div className="flex items-center">
                        <FileText className="mr-3 h-5 w-5" />
                        What Are Your Rights?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-4">
                      <p className="mb-3">You have full control over your information:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>View and download all the data we have about you</li>
                        <li>Correct any information that's wrong or outdated</li>
                        <li>Delete your account and all associated data</li>
                        <li>Move your data to another service provider</li>
                        <li>Contact us anytime with questions about your privacy</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-basics" className="border border-golden/20 dark:border-golden/30 rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold text-navyblue dark:text-golden hover:text-goldenrod1">
                      <div className="flex items-center">
                        <HelpCircle className="mr-3 h-5 w-5" />
                        Terms of Service Summary
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-4">
                      <p className="mb-3">Key points about using our service:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>We keep your account data for 3 years after you close your account</li>
                        <li>Transaction records are kept for 7 years to comply with business laws</li>
                        <li>We don't sell your personal information to third parties</li>
                        <li>We may share data only when required by law or with your permission</li>
                        <li>Contact privacy@hlsgindustries.com for any questions about your data</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </section>

        {/* Questions Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Common questions about our privacy practices and terms of service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">How secure is my data?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use enterprise-grade security including end-to-end encryption, secure data centers, and regular security audits. Your data is protected with the same standards used by major financial institutions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">Can I delete my account anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, you can delete your account at any time from your profile settings. We'll permanently remove your personal data within 30 days, except for records we're legally required to keep.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">Do you use cookies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use essential cookies for login and security, plus analytics cookies to improve our service. You can control cookie preferences in your browser settings or through our cookie banner.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">How do I contact your privacy team?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Email privacy@hlsgindustries.com for data protection questions or legal@hlsgindustries.com for terms of service inquiries. We respond to all privacy requests within 48 hours.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">What happens if policies change?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We'll notify you by email at least 30 days before any significant policy changes. You can also check this page anytime for the latest version and update date.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">Is my contract data private?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Absolutely. Contract documents and related data are encrypted and only accessible to authorized users within your organization. We never access your business content except for technical support when requested.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}