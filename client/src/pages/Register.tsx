import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import PublicLayout from "@/components/PublicLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerUserSchema } from "@shared/schema";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Smartphone, Shield, User, Key, Check, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RegisterFormData = z.infer<typeof registerUserSchema>;

const steps = [
  { id: 1, title: "Contact & Verification", icon: Smartphone },
  { id: 2, title: "OTP Verification", icon: Shield },
  { id: 3, title: "Personal Details", icon: User },
  { id: 4, title: "Password Creation", icon: Key },
  { id: 5, title: "Review & Submit", icon: Check }
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      address: "",
      captcha: "",
      otp: "",
      password: "",
      confirmPassword: "",
    }
  });

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    form.setValue("captcha", "");
  };

  const sendOTP = async () => {
    const contactNumber = form.getValues("contactNumber");
    const email = form.getValues("email");
    
    if (!contactNumber || !email) {
      toast({
        title: "Missing Information",
        description: "Please enter both mobile number and email to send OTP.",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${contactNumber} and ${email}`,
    });
  };

  const progress = (currentStep / steps.length) * 100;

  const validateAndNextStep = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        // Validate step 1: Mobile, Email, CAPTCHA
        const step1Fields = await form.trigger(["contactNumber", "email", "captcha"]);
        if (step1Fields && form.getValues("captcha") === captchaCode) {
          isValid = true;
        } else if (form.getValues("captcha") !== captchaCode) {
          form.setError("captcha", { message: "CAPTCHA does not match" });
        }
        break;
      case 2:
        // Validate step 2: OTP
        const step2Fields = await form.trigger(["otp"]);
        if (step2Fields && otpSent) {
          isValid = true;
        } else {
          toast({
            title: "OTP Required",
            description: "Please enter the OTP sent to your mobile and email.",
            variant: "destructive",
          });
        }
        break;
      case 3:
        // Validate step 3: Name and Address
        isValid = await form.trigger(["firstName", "lastName", "address"]);
        break;
      case 4:
        // Validate step 4: Password
        isValid = await form.trigger(["password", "confirmPassword"]);
        break;
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Remove OTP and CAPTCHA from submission data
      const { otp, captcha, confirmPassword, ...submitData } = data;
      
      console.log("Registration data:", submitData);
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Please wait for admin approval.",
      });
      
      // Redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    return {
      score: strength,
      label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength],
      color: ['red', 'orange', 'yellow', 'lightgreen', 'green'][strength]
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Information & Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter your mobile number and email to get started
              </p>
            </div>

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white">Mobile Number *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="+91 98765 43210" 
                      className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                        form.formState.errors.contactNumber ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white">Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="your.email@example.com"
                      className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                        form.formState.errors.email ? 'border-red-500 dark:border-red-500' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label className="text-gray-900 dark:text-white">CAPTCHA Verification *</Label>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-lg tracking-widest text-center min-w-[120px] rounded">
                  {captchaCode}
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshCaptcha}
                  className="border-golden text-golden hover:bg-golden hover:text-navyblue"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter CAPTCHA code"
                        className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                          form.formState.errors.captcha ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">OTP Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter the 6-digit code sent to your mobile and email
              </p>
            </div>

            {!otpSent ? (
              <div className="text-center">
                <Button 
                  type="button" 
                  onClick={sendOTP}
                  className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                >
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white">Enter OTP *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="123456" 
                          maxLength={6}
                          className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden text-center text-lg tracking-widest ${
                            form.formState.errors.otp ? 'border-red-500 dark:border-red-500' : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sent to: {form.getValues("contactNumber")} & {form.getValues("email")}
                  </span>
                  {countdown > 0 ? (
                    <span className="text-gray-500">Resend in {countdown}s</span>
                  ) : (
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={sendOTP}
                      className="text-navyblue dark:text-golden p-0 h-auto"
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Please provide your basic details
              </p>
            </div>

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
                        className="border-gray-300 dark:border-gray-600"
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
                        className="border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Mobile Number</Label>
                <Input 
                  value={form.getValues("contactNumber")} 
                  disabled 
                  className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <Label>Email Address</Label>
                <Input 
                  value={form.getValues("email")} 
                  disabled 
                  className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Enter your complete address"
                      rows={3}
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        const password = form.watch("password");
        const passwordStrength = password ? getPasswordStrength(password) : { score: 0, label: 'Very Weak', color: 'red' };
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create Password</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose a strong password to secure your account
              </p>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="Create a strong password"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium" style={{ color: passwordStrength.color }}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="Confirm your password"
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li className={password?.length >= 8 ? 'text-green-600' : ''}>
                  ✓ At least 8 characters long
                </li>
                <li className={/[A-Z]/.test(password || '') ? 'text-green-600' : ''}>
                  ✓ One uppercase letter
                </li>
                <li className={/[a-z]/.test(password || '') ? 'text-green-600' : ''}>
                  ✓ One lowercase letter
                </li>
                <li className={/\d/.test(password || '') ? 'text-green-600' : ''}>
                  ✓ One number
                </li>
                <li className={/[@$!%*?&]/.test(password || '') ? 'text-green-600' : ''}>
                  ✓ One special character (@$!%*?&)
                </li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review Your Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Please review your details before submitting
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</Label>
                  <p className="text-gray-900 dark:text-white">
                    {form.getValues("firstName")} {form.getValues("lastName")}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile Number</Label>
                  <p className="text-gray-900 dark:text-white">{form.getValues("contactNumber")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</Label>
                  <p className="text-gray-900 dark:text-white">{form.getValues("email")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Password</Label>
                  <p className="text-gray-900 dark:text-white">••••••••</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</Label>
                <p className="text-gray-900 dark:text-white">{form.getValues("address")}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <a href="/terms" className="text-navyblue dark:text-golden underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-navyblue dark:text-golden underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navyblue dark:text-golden mb-2">Create Your Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join HLSG Industries and access our comprehensive portal</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        step.id <= currentStep
                          ? "bg-navyblue dark:bg-golden border-navyblue dark:border-golden text-white dark:text-navyblue"
                          : "border-gray-300 dark:border-gray-600 text-gray-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div 
                        className={`w-12 h-0.5 mx-2 ${
                          step.id < currentStep 
                            ? "bg-navyblue dark:bg-golden" 
                            : "bg-gray-300 dark:bg-gray-600"
                        }`} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Form */}
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-navyblue dark:text-golden">
                Step {currentStep} of {steps.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    
                    {currentStep < steps.length ? (
                      <Button 
                        type="button" 
                        onClick={validateAndNextStep}
                        className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        className="bg-golden hover:bg-goldenrod1 text-navyblue dark:bg-golden dark:hover:bg-goldenrod1"
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}