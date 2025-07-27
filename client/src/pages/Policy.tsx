import PublicLayout from "@/components/PublicLayout";

export default function Policy() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Policy Header */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-navyblue dark:text-golden mb-4">Privacy Policy & Terms of Service</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last updated: January 26, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content - Expanded Horizontally */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}