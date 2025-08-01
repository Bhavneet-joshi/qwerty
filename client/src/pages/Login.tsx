import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import PublicLayout from "@/components/PublicLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { ChevronLeft, ChevronRight, LogIn, Shield, User, UserCheck, Smartphone, Mail, Phone, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  mobileOtp: z.string().length(6, "Mobile OTP must be 6 digits"),
  emailOtp: z.string().length(6, "Email OTP must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const steps = [
  { id: 1, title: "Credentials", icon: LogIn },
  { id: 2, title: "OTP Verification", icon: Shield }
];

// Mobile OTP Input Component
const MobileOTPInput = ({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled: boolean }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    
    const newValue = value.split('');
    newValue[index] = val;
    const newOTP = newValue.join('');
    onChange(newOTP);
    
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Phone className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-600">Mobile OTP</span>
        </div>
        <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your mobile</p>
      </div>
      <div className="flex justify-center space-x-1 sm:space-x-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border-2 border-green-200 focus:border-green-500 bg-green-50 dark:bg-green-950"
          />
        ))}
      </div>
    </div>
  );
};

// Email OTP Input Component
const EmailOTPInput = ({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled: boolean }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    
    const newValue = value.split('');
    newValue[index] = val;
    const newOTP = newValue.join('');
    onChange(newOTP);
    
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Mail className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-600">Email OTP</span>
        </div>
        <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your email</p>
      </div>
      <div className="flex justify-center space-x-1 sm:space-x-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border-2 border-blue-200 focus:border-blue-500 bg-blue-50 dark:bg-blue-950"
          />
        ))}
      </div>
    </div>
  );
};

const mockAccounts = {
  client: { email: "client@demo.com", password: "demo123", role: "Client" },
  employee: { email: "employee@demo.com", password: "demo123", role: "Employee" },
  admin: { email: "admin@demo.com", password: "demo123", role: "Admin" }
};

export default function Login() {
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      mobileOtp: "",
      emailOtp: "",
    }
  });

  const handleMockLogin = (accountType: keyof typeof mockAccounts) => {
    const account = mockAccounts[accountType];
    form.setValue("email", account.email);
    form.setValue("password", account.password);
    
    toast({
      title: "Demo Account Selected",
      description: `${account.role} credentials loaded. Continue to next step.`,
    });
  };

  const sendOTP = async () => {
    const email = form.getValues("email");
    
    if (!email) {
      toast({
        title: "Missing Information",
        description: "Please enter your email to send OTP.",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP sending to both mobile and email
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
      title: "OTPs Sent",
      description: "Verification codes sent to your mobile and email",
    });
  };

  const progress = (currentStep / steps.length) * 100;

  const validateAndNextStep = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        // Validate step 1: Email and Password
        const step1Fields = await form.trigger(["email", "password"]);
        if (step1Fields) {
          isValid = true;
          if (!otpSent) {
            await sendOTP();
          }
        }
        break;
      case 2:
        // Validate step 2: Both Mobile and Email OTPs must be verified
        if (mobileOtpVerified && emailOtpVerified) {
          // Proceed with actual login
          await handleLogin();
          return;
        } else {
          toast({
            title: "OTP Verification Required",
            description: "Please verify both mobile and email OTPs to continue.",
            variant: "destructive",
          });
        }
        break;
      default:
        break;
    }
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const formData = form.getValues();
      const response = await fetch('/api/mock-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login Successful",
          description: data.message,
        });
        
        // Redirect to dashboard after successful mock login
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        toast({
          title: "Login Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navyblue dark:text-golden">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email address"
                          className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                            form.formState.errors.email ? 'border-red-500 dark:border-red-500' : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navyblue dark:text-golden">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                            form.formState.errors.password ? 'border-red-500 dark:border-red-500' : ''
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-golden focus:ring-golden border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="text-sm text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <Link href="/forgot-password" className="text-sm font-medium text-golden hover:text-goldenrod1">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </Form>

            {/* Demo Account Buttons - Commented out per user request
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or try demo accounts</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleMockLogin('client')}
                  className="text-xs px-2 py-1 h-8 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
                >
                  <User className="h-3 w-3 mr-1" />
                  Client
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleMockLogin('employee')}
                  className="text-xs px-2 py-1 h-8 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  Employee
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleMockLogin('admin')}
                  className="text-xs px-2 py-1 h-8 border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Demo accounts pre-fill login credentials. Password: <span className="font-mono">demo123</span>
                </p>
              </div>
            </div>
            */}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-golden" />
              </div>
              <h3 className="text-lg font-semibold text-navyblue dark:text-golden">Two-Factor Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Enter the verification codes sent to your mobile and email
              </p>
              <p className="text-sm font-medium text-navyblue dark:text-golden mt-1">
                {form.getValues("email")}
              </p>
            </div>

            <Form {...form}>
              <div className="space-y-8">
                {/* Mobile OTP */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="mobileOtp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MobileOTPInput
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-center px-4">
                    <Button
                      type="button"
                      onClick={() => {
                        const mobileOtp = form.getValues("mobileOtp");
                        if (mobileOtp === "123456") {
                          setMobileOtpVerified(true);
                          toast({
                            title: "Mobile OTP Verified",
                            description: "Mobile verification successful!",
                          });
                        } else {
                          toast({
                            title: "Invalid Mobile OTP",
                            description: "Please enter the correct code.",
                            variant: "destructive",
                          });
                        }
                      }}
                      className={`w-full min-h-[48px] text-base font-medium ${mobileOtpVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-navyblue hover:bg-darkblue'} text-white`}
                      disabled={mobileOtpVerified || isLoading}
                    >
                      {mobileOtpVerified ? "✓ Mobile Verified" : "Verify Mobile OTP"}
                    </Button>
                  </div>
                </div>

                {/* Email OTP */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="emailOtp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <EmailOTPInput
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-center px-4">
                    <Button
                      type="button"
                      onClick={() => {
                        const emailOtp = form.getValues("emailOtp");
                        if (emailOtp === "123456") {
                          setEmailOtpVerified(true);
                          toast({
                            title: "Email OTP Verified",
                            description: "Email verification successful!",
                          });
                        } else {
                          toast({
                            title: "Invalid Email OTP",
                            description: "Please enter the correct code.",
                            variant: "destructive",
                          });
                        }
                      }}
                      className={`w-full min-h-[48px] text-base font-medium ${emailOtpVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-navyblue hover:bg-darkblue'} text-white`}
                      disabled={emailOtpVerified || isLoading}
                    >
                      {emailOtpVerified ? "✓ Email Verified" : "Verify Email OTP"}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Didn't receive the codes?{" "}
                {countdown > 0 ? (
                  <span className="text-gray-500 flex items-center justify-center">
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Resend in {countdown}s
                  </span>
                ) : (
                  <button
                    onClick={sendOTP}
                    className="font-medium text-golden hover:text-goldenrod1 flex items-center justify-center mx-auto"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Resend OTPs
                  </button>
                )}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navyblue dark:text-golden">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 shadow-xl border border-golden/20">
            <CardHeader className="space-y-4">
              <CardTitle className="text-xl text-navyblue dark:text-golden text-center">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </CardTitle>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center ${
                          step.id <= currentStep ? "text-navyblue dark:text-golden" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            step.id <= currentStep
                              ? "bg-navyblue dark:bg-golden border-navyblue dark:border-golden text-white dark:text-navyblue"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="ml-2 text-sm font-medium hidden sm:block">
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {renderStepContent()}
              
              <div className="flex justify-between space-x-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousStep}
                    className="flex-1 border-golden text-golden hover:bg-golden hover:text-navyblue"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
                
                <Button
                  type="button"
                  onClick={validateAndNextStep}
                  disabled={isLoading}
                  className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-golden hover:bg-goldenrod1 text-navyblue font-semibold`}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : currentStep === steps.length ? (
                    "Sign In"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center space-y-2">
                <div>
                  <Link href="/forgot-password" className="text-sm font-medium text-golden hover:text-goldenrod1">
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-medium text-golden hover:text-goldenrod1">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}