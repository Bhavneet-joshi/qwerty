import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedLayout from "@/components/ProtectedLayout";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Key,
  Shield,
  User,
  Building,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";

export default function UserManagement() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPermissions, setShowPermissions] = useState(false);

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

  // Fetch all users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/users"],
    retry: false,
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (userId: string) => {
      await apiRequest("POST", `/api/users/${userId}/reset-password`);
    },
    onSuccess: () => {
      toast({
        title: "Password Reset",
        description: "Password has been reset successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password.",
        variant: "destructive",
      });
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      await apiRequest("PUT", `/api/users/${userId}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Role Updated",
        description: "User role has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await apiRequest("DELETE", `/api/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
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

  // Filter users
  const filteredUsers = ((users as any[]) || [])
    .filter((u: any) => {
      const matchesSearch = 
        u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "employee":
        return "bg-blue-100 text-blue-800";
      case "client":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "employee":
        return <User className="h-4 w-4" />;
      case "client":
        return <Building className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const handleResetPassword = (userId: string) => {
    if (confirm("Are you sure you want to reset this user's password?")) {
      resetPasswordMutation.mutate(userId);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-navyblue mb-2">User Management</h1>
                <p className="text-gray-600">
                  Manage users, roles, passwords, and access permissions.
                </p>
              </div>
              <Button className="bg-navyblue hover:bg-darkblue text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>
          </div>

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-navyblue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navyblue">{filteredUsers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {filteredUsers.filter((u: any) => u.role === "admin").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                <User className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredUsers.filter((u: any) => u.role === "employee").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
                <Building className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {filteredUsers.filter((u: any) => u.role === "client").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-navyblue">All Users</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 max-w-xs"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowPermissions(!showPermissions)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {showPermissions ? "Hide" : "Show"} Permissions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navyblue mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-navyblue text-white flex items-center justify-center text-sm font-medium">
                                  {user.firstName?.charAt(0) || "U"}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>
                              {getRoleIcon(user.role)}
                              <span className="ml-1 capitalize">{user.role}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {user.contactNumber || "Not provided"}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleResetPassword(user.id)}
                                disabled={resetPasswordMutation.isPending}
                              >
                                <Key className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={deleteUserMutation.isPending}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Access Permissions Table */}
          {showPermissions && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-navyblue">Employee Access Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contract/Project</TableHead>
                        <TableHead>Preparers</TableHead>
                        <TableHead>Reviewers</TableHead>
                        <TableHead>Read Access</TableHead>
                        <TableHead>Write Access</TableHead>
                        <TableHead>Edit Access</TableHead>
                        <TableHead>Delete Access</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Contract Template v1.0</TableCell>
                        <TableCell>
                          <Select>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select preparers" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredUsers
                                .filter((u: any) => u.role === "employee")
                                .map((employee: any) => (
                                  <SelectItem key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select reviewers" />
                            </SelectTrigger>
                            <SelectContent>
                              {filteredUsers
                                .filter((u: any) => u.role === "employee")
                                .map((employee: any) => (
                                  <SelectItem key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-golden hover:bg-goldenrod1 text-navyblue">
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}