import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import ProtectedLayout from "@/components/ProtectedLayout";
import { FileText, Clock, CheckCircle, AlertCircle, Users, MessageCircle, Eye, User } from "lucide-react";

export default function EmployeeDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

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

  // Fetch employee assigned contracts
  const { data: contracts, isLoading: contractsLoading } = useQuery({
    queryKey: ["/api/contracts/assigned"],
    retry: false,
  });

  if (isLoading || contractsLoading) {
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

  const assignedContracts = ((contracts as any[]) || []).slice(0, 5);
  const contractCount = ((contracts as any[]) || []).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navyblue mb-2">
              Welcome back, {(user as any)?.firstName}!
            </h1>
            <p className="text-gray-600">
              Manage your assigned contracts and track your progress.
            </p>
          </div>

          {/* Assignments Counter */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-navyblue flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                My Assignments Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-6xl font-bold text-navyblue mb-2">
                  {contractCount}
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Total Agreements Assigned to You
                </p>
                <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {((contracts as any[]) || []).filter((c: any) => c.status === "in_progress").length}
                    </div>
                    <p className="text-sm text-blue-600 font-medium">In Progress</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {((contracts as any[]) || []).filter((c: any) => c.status === "completed").length}
                    </div>
                    <p className="text-sm text-green-600 font-medium">Completed</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600">
                      {((contracts as any[]) || []).filter((c: any) => c.status === "active").length}
                    </div>
                    <p className="text-sm text-yellow-600 font-medium">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Agreements and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Agreements (Chronological) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-navyblue">
                    Five Most Recent Agreements
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Chronological Order
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {contractsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : assignedContracts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No agreements assigned yet</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Contact your admin to get contract assignments
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignedContracts
                      .sort((a: any, b: any) => new Date(b.contractDate).getTime() - new Date(a.contractDate).getTime())
                      .map((contract: any) => (
                        <div key={contract.id} className="group relative">
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-navyblue truncate">
                                {contract.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Date: {formatDate(contract.contractDate)} • 
                                Duration: {contract.duration || 'N/A'} months
                              </p>
                              <p className="text-xs text-gray-400">
                                {contract.description ? contract.description.substring(0, 60) + "..." : "No description"}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(contract.status)}>
                                {contract.status.replace('_', ' ')}
                              </Badge>
                              <Link href={`/contracts/${contract.id}`}>
                                <Button 
                                  size="sm" 
                                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-golden hover:bg-goldenrod1 text-navyblue"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                {/* Link to List of Contracts Page */}
                <div className="mt-6 pt-4 border-t">
                  <Link href="/contracts">
                    <Button className="w-full bg-navyblue hover:bg-darkblue text-white">
                      <FileText className="mr-2 h-4 w-4" />
                      Go to List of Contracts Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Employee Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navyblue">Employee Dashboard Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Link href="/contracts">
                    <Button className="w-full justify-start bg-navyblue hover:bg-darkblue text-white">
                      <FileText className="mr-3 h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">List of Contracts Page</div>
                        <div className="text-xs opacity-90">View all assigned contracts with filtering</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link href="/profile">
                    <Button className="w-full justify-start bg-golden hover:bg-goldenrod1 text-navyblue">
                      <User className="mr-3 h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">Employee Profile</div>
                        <div className="text-xs opacity-90">Update details, PAN, Aadhaar & request password change</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Client Comments</div>
                      <div className="text-xs text-gray-500">Reply to client feedback and comments</div>
                    </div>
                  </Button>

                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Pending Reviews</div>
                      <div className="text-xs text-gray-500">Track contracts awaiting your review</div>
                    </div>
                  </Button>

                  <Button className="w-full justify-start" variant="outline">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Recent Activity</div>
                      <div className="text-xs text-gray-500">View your recent contract interactions</div>
                    </div>
                  </Button>
                </div>

                {/* Statistics Summary */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-blue-50 rounded p-3">
                      <div className="text-lg font-bold text-blue-600">
                        {((contracts as any[]) || []).filter((c: any) => c.status === "in_progress").length}
                      </div>
                      <div className="text-xs text-blue-600">Active Work</div>
                    </div>
                    <div className="bg-green-50 rounded p-3">
                      <div className="text-lg font-bold text-green-600">
                        {((contracts as any[]) || []).filter((c: any) => c.status === "completed").length}
                      </div>
                      <div className="text-xs text-green-600">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}