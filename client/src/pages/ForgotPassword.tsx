import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Mail, Phone, ArrowLeft, CheckCircle, User, Shield, Key, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PublicLayout from '@/components/PublicLayout';

// Form validation schemas
const loginIdSchema = z.object({
  loginId: z.string().min(1, 'Please enter your email or mobile number'),
});

const otpSchema = z.object({
  mobileOtp: z.string().length(6, 'Mobile OTP must be 6 digits'),
  emailOtp: z.string().length(6, 'Email OTP must be 6 digits'),
});

const newPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginIdForm = z.infer<typeof loginIdSchema>;
type OTPForm = z.infer<typeof otpSchema>;
type NewPasswordForm = z.infer<typeof newPasswordSchema>;

const steps = [
  { id: 1, title: "Enter Login ID", icon: User },
  { id: 2, title: "Verify OTP", icon: Shield },
  { id: 3, title: "Set New Password", icon: Key }
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
      <div className="flex justify-center space-x-2">
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
            className="w-12 h-12 text-center text-lg font-semibold border-2 border-green-200 focus:border-green-500 bg-green-50 dark:bg-green-950"
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
      <div className="flex justify-center space-x-2">
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
            className="w-12 h-12 text-center text-lg font-semibold border-2 border-blue-200 focus:border-blue-500 bg-blue-50 dark:bg-blue-950"
          />
        ))}
      </div>
    </div>
  );
};

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loginId, setLoginId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const loginIdForm = useForm<LoginIdForm>({
    resolver: zodResolver(loginIdSchema),
    defaultValues: { loginId: '' },
  });

  const otpForm = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { mobileOtp: '', emailOtp: '' },
  });

  const passwordForm = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const progress = (currentStep / steps.length) * 100;

  const validateAndNextStep = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        // Validate login ID
        const loginIdValid = await loginIdForm.trigger(["loginId"]);
        if (loginIdValid) {
          setLoginId(loginIdForm.getValues("loginId"));
          isValid = true;
        }
        break;
      case 2:
        // Validate both OTPs
        if (mobileOtpVerified && emailOtpVerified) {
          isValid = true;
        } else {
          toast({
            title: "OTP Verification Required",
            description: "Please verify both mobile and email OTP to continue.",
            variant: "destructive",
          });
        }
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

  const sendOTP = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOtpSent(true);
      setCountdown(30);
      
      toast({
        title: "OTP Sent",
        description: "Verification codes sent to both your mobile and email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: NewPasswordForm) => {
    setIsLoading(true);
    
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. You can now login with your new password.",
      });
      
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enter Your Login ID</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter your email address or mobile number to reset your password
              </p>
            </div>

            <Form {...loginIdForm}>
              <FormField
                control={loginIdForm.control}
                name="loginId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-navyblue dark:text-golden">Email or Mobile Number *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter your email or mobile number"
                        className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                          loginIdForm.formState.errors.loginId ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verify OTP</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Verify both mobile and email OTP to continue
              </p>
            </div>

            {!otpSent ? (
              <div className="text-center">
                <Button 
                  type="button" 
                  onClick={sendOTP}
                  disabled={isLoading}
                  className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                >
                  {isLoading ? "Sending..." : "Send OTP to Mobile & Email"}
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <Form {...otpForm}>
                  <div className="space-y-8">
                    {/* Mobile OTP */}
                    <div className="space-y-4">
                      <FormField
                        control={otpForm.control}
                        name="mobileOtp"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <MobileOTPInput 
                                value={field.value}
                                onChange={field.onChange}
                                disabled={false}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="text-center">
                      <Button
                        type="button"
                        onClick={() => {
                          const mobileOtp = otpForm.getValues("mobileOtp");
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
                        className={`w-full ${mobileOtpVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-navyblue hover:bg-darkblue'} text-white`}
                        disabled={mobileOtpVerified}
                      >
                        {mobileOtpVerified ? "✓ Mobile Verified" : "Verify Mobile OTP"}
                      </Button>
                    </div>
                  </div>

                    {/* Email OTP */}
                    <div className="space-y-4">
                      <FormField
                        control={otpForm.control}
                        name="emailOtp"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <EmailOTPInput 
                                value={field.value}
                                onChange={field.onChange}
                                disabled={false}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="text-center">
                      <Button
                        type="button"
                        onClick={() => {
                          const emailOtp = otpForm.getValues("emailOtp");
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
                        className={`w-full ${emailOtpVerified ? 'bg-green-600 hover:bg-green-700' : 'bg-navyblue hover:bg-darkblue'} text-white`}
                        disabled={emailOtpVerified}
                      >
                        {emailOtpVerified ? "✓ Email Verified" : "Verify Email OTP"}
                      </Button>
                      </div>
                    </div>
                  </div>
                </Form>
                
                <div className="text-center space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Codes sent to: <strong>{loginId}</strong>
                  </div>
                  <div>
                    {countdown > 0 ? (
                      <span className="text-gray-500 text-sm">Resend in {countdown}s</span>
                    ) : (
                      <Button 
                        type="button" 
                        variant="link" 
                        onClick={sendOTP}
                        className="text-navyblue dark:text-golden p-0 h-auto text-sm"
                      >
                        Resend Both OTPs
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Test OTP: <strong>123456</strong> for both mobile and email
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Set New Password</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a strong password for your account
              </p>
            </div>

            <Form {...passwordForm}>
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-navyblue dark:text-golden">New Password *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Enter new password"
                        className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                          passwordForm.formState.errors.password ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-navyblue dark:text-golden">Confirm New Password *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Confirm new password"
                        className={`border-gray-300 dark:border-gray-600 focus:border-golden dark:focus:border-golden ${
                          passwordForm.formState.errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>✓ At least 8 characters long</li>
                <li>✓ Contains both uppercase and lowercase letters</li>
                <li>✓ Contains at least one number</li>
                <li>✓ Contains at least one special character</li>
              </ul>
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
            <h1 className="text-3xl font-bold text-navyblue dark:text-golden mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-400">Follow the steps to reset your account password</p>
            
            {/* Back to Login Link */}
            <div className="mt-4">
              <Link href="/login">
                <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </span>
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
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

          {/* Main Form */}
          <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-navyblue dark:text-golden">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                      type="button"
                      onClick={() => passwordForm.handleSubmit(resetPassword)()}
                      disabled={isLoading}
                      className="bg-golden hover:bg-goldenrod1 text-navyblue dark:bg-golden dark:hover:bg-goldenrod1"
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}