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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Form validation schemas
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const mobileSchema = z.object({
  mobile: z.string().min(10, 'Please enter a valid mobile number').max(15, 'Mobile number is too long'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type EmailForm = z.infer<typeof emailSchema>;
type MobileForm = z.infer<typeof mobileSchema>;
type OTPForm = z.infer<typeof otpSchema>;

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
          <span className="text-sm font-medium text-green-600">Mobile Verification</span>
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
          <span className="text-sm font-medium text-blue-600">Email Verification</span>
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
  const [step, setStep] = useState<'contact' | 'otp' | 'success'>('contact');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'mobile'>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const mobileForm = useForm<MobileForm>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: '' },
  });

  const otpForm = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOTP = async () => {
    setIsLoading(true);
    
    try {
      const isEmail = verificationMethod === 'email';
      let contact: string;
      
      if (isEmail) {
        const emailData = emailForm.getValues();
        contact = emailData.email;
      } else {
        const mobileData = mobileForm.getValues();
        contact = mobileData.mobile;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContactInfo(contact);
      setStep('otp');
      setCountdown(30);
      
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${verificationMethod}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to send OTP. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (data: OTPForm) => {
    setIsLoading(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (data.otp === '123456') {
        setStep('success');
        toast({
          title: "OTP Verified",
          description: "Password reset link has been sent to your contact.",
        });
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(30);
      toast({
        title: "OTP Resent",
        description: `New verification code sent to your ${verificationMethod}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">HLSG Industries</h1>
          <p className="text-muted-foreground text-sm">Contract Management System</p>
        </div>

        {/* Back to Login Link */}
        <div className="flex justify-center">
          <Link href="/login">
            <span className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {step === 'contact' ? (
                <>
                  <Mail className="w-5 h-5 text-goldenrod1" />
                  Forgot Password
                </>
              ) : step === 'otp' ? (
                <>
                  <Phone className="w-5 h-5 text-goldenrod1" />
                  Verify OTP
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Success
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 'contact' 
                ? "Choose your preferred method to receive the verification code."
                : step === 'otp'
                ? `Enter the 6-digit code sent to your ${verificationMethod}.`
                : "Password reset instructions have been sent successfully."
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'contact' ? (
              <Tabs value={verificationMethod} onValueChange={(value) => setVerificationMethod(value as 'email' | 'mobile')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <Form {...emailForm}>
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                </TabsContent>

                <TabsContent value="mobile" className="space-y-4">
                  <Form {...mobileForm}>
                    <FormField
                      control={mobileForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your mobile number"
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                </TabsContent>

                <Button 
                  onClick={sendOTP}
                  className="w-full h-11 bg-gradient-to-r from-navyblue to-goldenrod1 hover:from-navyblue/90 hover:to-goldenrod1/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </Tabs>
            ) : step === 'otp' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Code sent to: <strong>{contactInfo}</strong>
                  </p>
                </div>

                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(verifyOTP)} className="space-y-6">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            {verificationMethod === 'mobile' ? (
                              <MobileOTPInput 
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isLoading}
                              />
                            ) : (
                              <EmailOTPInput 
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isLoading}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-navyblue to-goldenrod1 hover:from-navyblue/90 hover:to-goldenrod1/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </form>
                </Form>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{' '}
                    {countdown > 0 ? (
                      <span className="text-gray-500">Resend in {countdown}s</span>
                    ) : (
                      <button
                        onClick={resendOTP}
                        disabled={isLoading}
                        className="font-medium text-goldenrod1 hover:text-goldenrod1/80"
                      >
                        Resend OTP
                      </button>
                    )}
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setStep('contact')}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Change contact method
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    Password reset instructions have been sent to <strong>{contactInfo}</strong>
                  </AlertDescription>
                </Alert>

                <div className="text-center">
                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-navyblue to-goldenrod1 hover:from-navyblue/90 hover:to-goldenrod1/90">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Additional Help */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at{' '}
                <a href="mailto:contact@hlsgindustries.com" className="text-goldenrod1 hover:underline">
                  contact@hlsgindustries.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            For security reasons, we don't reveal whether an email address exists in our system.
          </p>
        </div>
      </div>
    </div>
  );
}