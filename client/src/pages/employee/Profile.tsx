import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProtectedLayout from "@/components/ProtectedLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Key, 
  Camera, 
  AlertCircle,
  Shield,
  Building,
  Calendar,
  FileText,
  Clock,
  CheckCircle
} from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  panNumber: z.string().length(10, "PAN number must be 10 characters"),
  aadhaarNumber: z.string().length(12, "Aadhaar number must be 12 digits"),
  employeeId: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EmployeeProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("personal");
  const [passwordChangeRequested, setPasswordChangeRequested] = useState(false);

  // Redirect if not authenticated or not employee
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user as any)?.role !== "employee")) {
      toast({
        title: "Unauthorized",
        description: "You don't have employee access.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: (user as any)?.firstName || "",
      lastName: (user as any)?.lastName || "",
      email: (user as any)?.email || "",
      contactNumber: (user as any)?.contactNumber || "",
      address: (user as any)?.address || "",
      panNumber: (user as any)?.panNumber || "",
      aadhaarNumber: (user as any)?.aadhaarNumber || "",
      employeeId: (user as any)?.employeeId || "",
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      await apiRequest("PUT", `/api/users/${(user as any)?.id}/profile`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Request password change mutation
  const requestPasswordChangeMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/users/request-password-change", {
        userId: (user as any)?.id,
        reason: "Employee password change request from profile page"
      });
    },
    onSuccess: () => {
      setPasswordChangeRequested(true);
      toast({
        title: "Request Submitted",
        description: "Your password change request has been sent to the admin for approval.",
      });
    },
    onError: () => {
      toast({
        title: "Request Failed",
        description: "Failed to submit password change request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-navyblue"></div>
        </div>
      </ProtectedLayout>
    );
  }

  if (!isAuthenticated || (user as any)?.role !== "employee") {
    return null;
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navyblue mb-2">Employee Profile</h1>
            <p className="text-gray-600">
              Manage your employee details, documents, and security settings.
            </p>
          </div>

          {/* Profile Overview Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={(user as any)?.profilePhoto} />
                    <AvatarFallback className="bg-navyblue text-white text-2xl">
                      {(user as any)?.firstName?.charAt(0) || "E"}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-golden hover:bg-goldenrod1 text-navyblue"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-navyblue">
                    {(user as any)?.firstName} {(user as any)?.lastName}
                  </h2>
                  <p className="text-gray-600 mb-2">{(user as any)?.email}</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-blue-100 text-blue-800">
                      <User className="h-3 w-3 mr-1" />
                      Employee
                    </Badge>
                    <Badge variant="outline">
                      <Building className="h-3 w-3 mr-1" />
                      ID: {(user as any)?.employeeId || "Not Assigned"}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-medium">
                    {new Date((user as any)?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-navyblue">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
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
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="employeeId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employee ID</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly className="bg-gray-50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="bg-navyblue hover:bg-darkblue text-white"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-navyblue">Identity Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            PAN Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="ABCDE1234F"
                              className="uppercase"
                              maxLength={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aadhaarNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Aadhaar Number
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="1234 5678 9012"
                              maxLength={12}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your identity documents are encrypted and stored securely. They are only visible to authorized personnel.
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4">
                    <Button 
                      onClick={() => form.handleSubmit(onSubmit)()}
                      className="bg-golden hover:bg-goldenrod1 text-navyblue"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? "Updating..." : "Save Documents"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-navyblue">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Password Change Request</h3>
                        <p className="text-sm text-gray-600">
                          Request admin to change your password for security reasons
                        </p>
                      </div>
                      <Button
                        onClick={() => requestPasswordChangeMutation.mutate()}
                        disabled={requestPasswordChangeMutation.isPending || passwordChangeRequested}
                        variant={passwordChangeRequested ? "outline" : "default"}
                        className={passwordChangeRequested ? "" : "bg-navyblue hover:bg-darkblue text-white"}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        {passwordChangeRequested ? "Request Sent" : "Request Password Change"}
                      </Button>
                    </div>
                  </div>

                  {passwordChangeRequested && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your password change request has been submitted to the admin. You will be notified once it's processed.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Last Login</h3>
                        <p className="text-sm text-gray-600">
                          Track your recent login activity
                        </p>
                      </div>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Today, 2:30 PM
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Account Status</h3>
                        <p className="text-sm text-gray-600">
                          Your employee account is active and verified
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-navyblue">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Email Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Receive notifications about contract assignments and updates
                        </p>
                      </div>
                      <Button variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Contract Preferences</h3>
                        <p className="text-sm text-gray-600">
                          Set your working preferences and availability
                        </p>
                      </div>
                      <Button variant="outline">
                        Update
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navyblue">Privacy Settings</h3>
                        <p className="text-sm text-gray-600">
                          Control who can see your profile information
                        </p>
                      </div>
                      <Button variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Any changes to critical settings may require admin approval before they take effect.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedLayout>
  );
}