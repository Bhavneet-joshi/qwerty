import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import ProtectedLayout from "@/components/ProtectedLayout";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Building,
  Calendar
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user as any)?.role !== "admin")) {
      toast({
        title: "Unauthorized",
        description: "You don't have admin access.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    retry: false,
  });

  // Fetch all contracts for recent activity
  const { data: contracts, isLoading: contractsLoading } = useQuery({
    queryKey: ["/api/contracts"],
    retry: false,
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
    retry: false,
  });

  if (isLoading || statsLoading) {
    return (
      <ProtectedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-navyblue"></div>
        </div>
      </ProtectedLayout>
    );
  }

  if (!isAuthenticated || (user as any)?.role !== "admin") {
    return null;
  }

  const recentContracts = (contracts as any[])?.slice(0, 5) || [];
  const contractStats = (stats as any) || { total: 0, active: 0, completed: 0, cancelled: 0, inProgress: 0 };
  const totalUsers = (users as any[])?.length || 0;
  const clientCount = (users as any[])?.filter((u: any) => u.role === "client").length || 0;
  const employeeCount = (users as any[])?.filter((u: any) => u.role === "employee").length || 0;
  const adminCount = (users as any[])?.filter((u: any) => u.role === "admin").length || 0;

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
      month: "short",
      day: "numeric"
    });
  };

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navyblue mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Overview of all system activities, contracts, and user management.
            </p>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                <FileText className="h-4 w-4 text-navyblue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navyblue">{contractStats.total}</div>
                <p className="text-xs text-gray-600">All contracts in system</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
                <p className="text-xs text-gray-600">Clients & Employees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{contractStats.active}</div>
                <p className="text-xs text-gray-600">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
                <DollarSign className="h-4 w-4 text-golden" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-golden">₹2.4M</div>
                <p className="text-xs text-gray-600">Total contract value</p>
              </CardContent>
            </Card>
          </div>

          {/* Contract Status Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{contractStats.active}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {contractStats.inProgress || recentContracts.filter((c: any) => c.status === "in_progress").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{contractStats.completed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{contractStats.cancelled}</div>
              </CardContent>
            </Card>
          </div>

          {/* User Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
                <Building className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{clientCount}</div>
                <p className="text-xs text-gray-600">Active client accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{employeeCount}</div>
                <p className="text-xs text-gray-600">Team members</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <Users className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {adminCount}
                </div>
                <p className="text-xs text-gray-600">Administrative users</p>
              </CardContent>
            </Card>
          </div>

          {/* Contract Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Contracts by Date */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-navyblue">Recent by Date</CardTitle>
              </CardHeader>
              <CardContent>
                {contractsLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentContracts.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No contracts</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...recentContracts]
                      .sort((a: any, b: any) => new Date(b.contractDate).getTime() - new Date(a.contractDate).getTime())
                      .slice(0, 5)
                      .map((contract: any) => (
                        <div key={`date-${contract.id}`} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-navyblue truncate">
                              {contract.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(contract.contractDate)}
                            </p>
                          </div>
                          <Link href={`/contracts/${contract.id}`}>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Contracts by Value */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-navyblue">Top by Value</CardTitle>
              </CardHeader>
              <CardContent>
                {contractsLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentContracts.length === 0 ? (
                  <div className="text-center py-6">
                    <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No contracts</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...recentContracts]
                      .filter((c: any) => c.contractValue)
                      .sort((a: any, b: any) => (b.contractValue || 0) - (a.contractValue || 0))
                      .slice(0, 5)
                      .map((contract: any) => (
                        <div key={`value-${contract.id}`} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-navyblue truncate">
                              {contract.name}
                            </p>
                            <p className="text-xs text-golden font-semibold">
                              ₹{(contract.contractValue || 0).toLocaleString()}
                            </p>
                          </div>
                          <Link href={`/contracts/${contract.id}`}>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contracts by Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-navyblue">Longest Duration</CardTitle>
              </CardHeader>
              <CardContent>
                {contractsLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentContracts.length === 0 ? (
                  <div className="text-center py-6">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No contracts</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...recentContracts]
                      .filter((c: any) => c.duration)
                      .sort((a: any, b: any) => (b.duration || 0) - (a.duration || 0))
                      .slice(0, 5)
                      .map((contract: any) => (
                        <div key={`duration-${contract.id}`} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-navyblue truncate">
                              {contract.name}
                            </p>
                            <p className="text-xs text-blue-600">
                              {contract.duration} {contract.duration === 1 ? 'month' : 'months'}
                            </p>
                          </div>
                          <Link href={`/contracts/${contract.id}`}>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navyblue">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Recent activity will appear here</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navyblue">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/contracts/new">
                  <Button className="w-full justify-start bg-navyblue hover:bg-darkblue text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Contract
                  </Button>
                </Link>
                
                <Link href="/users">
                  <Button className="w-full justify-start bg-golden hover:bg-goldenrod1 text-navyblue">
                    <Users className="mr-2 h-4 w-4" />
                    User Management
                  </Button>
                </Link>
                
                <Link href="/contracts">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    All Contracts
                  </Button>
                </Link>

                <Link href="/profile">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Profile
                  </Button>
                </Link>

                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-navyblue">System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">98.9%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-golden mb-2">45ms</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navyblue mb-2">256</div>
                  <div className="text-sm text-gray-600">Storage Available (GB)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
