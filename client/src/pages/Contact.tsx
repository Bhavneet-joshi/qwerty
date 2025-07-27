import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PublicLayout from "@/components/PublicLayout";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to your backend
      console.log("Contact form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We've received your message and will get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly via phone or email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-navyblue dark:text-golden mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ready to transform your business? Get in touch with our team of experts today.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-navyblue dark:text-golden flex items-center">
                        <MapPin className="mr-3 h-6 w-6" />
                        Visit Our Office
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Headquarters</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          HLSG Industries Pvt. Ltd.<br />
                          123 Business Park, Sector 62<br />
                          Noida, Uttar Pradesh 201309<br />
                          India
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-navyblue dark:text-golden flex items-center">
                        <Phone className="mr-3 h-6 w-6" />
                        Call Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">General Inquiries</h4>
                        <p className="text-gray-600 dark:text-gray-300">+91 120 456 7890</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Support</h4>
                        <p className="text-gray-600 dark:text-gray-300">+91 120 456 7891</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-navyblue dark:text-golden flex items-center">
                        <Mail className="mr-3 h-6 w-6" />
                        Email Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">General</h4>
                        <p className="text-gray-600 dark:text-gray-300">info@hlsgindustries.com</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Support</h4>
                        <p className="text-gray-600 dark:text-gray-300">support@hlsgindustries.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-navyblue dark:text-golden flex items-center">
                        <Clock className="mr-3 h-6 w-6" />
                        Business Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Monday - Friday</h4>
                        <p className="text-gray-600 dark:text-gray-300">9:00 AM - 6:00 PM IST</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Saturday</h4>
                        <p className="text-gray-600 dark:text-gray-300">10:00 AM - 4:00 PM IST</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Sunday</h4>
                        <p className="text-gray-600 dark:text-gray-300">Closed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-golden/20 dark:border-golden/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-navyblue dark:text-golden flex items-center">
                      <Send className="mr-3 h-6 w-6" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="John"
                                    className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Doe"
                                    className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    type="email" 
                                    placeholder="john@example.com"
                                    className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="+91 98765 43210"
                                    className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Your Company Name"
                                  className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="How can we help you?"
                                  className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Tell us about your project or inquiry..."
                                  rows={6}
                                  className="border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-golden hover:bg-goldenrod1 text-navyblue font-semibold py-3 text-lg transition-colors duration-200"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Find Us On The Map</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Located in the heart of Noida's business district, we're easily accessible by metro and road.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              {/* Interactive Map Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg max-w-md">
                    <MapPin className="h-12 w-12 text-golden mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-navyblue dark:text-golden mb-2">
                      HLSG Industries Headquarters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      123 Business Park, Sector 62<br />
                      Noida, Uttar Pradesh 201309
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-500 dark:text-gray-400">
                        <strong>Nearest Metro:</strong> Sector 62 (Blue Line)
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        <strong>Parking:</strong> Available on-site
                      </p>
                    </div>
                    <Button 
                      className="mt-4 bg-golden hover:bg-goldenrod1 text-navyblue"
                      onClick={() => window.open('https://maps.google.com/?q=Sector+62+Noida+Uttar+Pradesh', '_blank')}
                    >
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-400"></div>
                    ))}
                  </div>
                </div>
                
                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="animate-ping absolute h-6 w-6 rounded-full bg-red-400 opacity-75"></div>
                    <div className="relative h-6 w-6 rounded-full bg-red-600 border-2 border-white shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-golden transition-colors">
                      Satellite View
                    </button>
                    <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-golden transition-colors">
                      Street View
                    </button>
                    <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-golden transition-colors">
                      Directions
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Click to open full map view
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navyblue dark:text-golden mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find answers to common questions about our services and processes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">How do I get started?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simply contact us through this form or call our office. We'll schedule a consultation to discuss your needs and provide a tailored solution.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">What industries do you serve?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We serve a wide range of industries including healthcare, finance, manufacturing, technology, and more. Our solutions are customized for each sector.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">What is your response time?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly for immediate assistance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-golden/20 dark:border-golden/30">
                <CardHeader>
                  <CardTitle className="text-lg text-navyblue dark:text-golden">Do you offer support after implementation?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, we provide comprehensive post-implementation support including training, maintenance, and ongoing technical assistance to ensure your success.
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