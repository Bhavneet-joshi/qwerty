import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Link } from "wouter";
import ProtectedLayout from "@/components/ProtectedLayout";
import { 
  FileText, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  RefreshCw,
  User,
  MessageCircle,
  SortAsc,
  SortDesc,
  Building
} from "lucide-react";

export default function EmployeeContracts() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateRange, setDateRange] = useState<any>(null);

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

  // Fetch assigned contracts
  const { data: contracts, isLoading: contractsLoading, refetch } = useQuery({
    queryKey: ["/api/contracts/assigned"],
    retry: false,
  });

  // Fetch users for client filtering
  const { data: users } = useQuery({
    queryKey: ["/api/users"],
    retry: false,
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

  if (!isAuthenticated || (user as any)?.role !== "employee") {
    return null;
  }

  // Filter and sort contracts based on admin access
  const filteredContracts = ((contracts as any[]) || [])
    .filter((contract: any) => {
      const matchesSearch = 
        contract.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
      const matchesClient = clientFilter === "all" || contract.clientId === clientFilter;
      
      // Date filtering
      let matchesDate = true;
      if (dateRange?.from && dateRange?.to) {
        const contractDate = new Date(contract.contractDate);
        matchesDate = contractDate >= dateRange.from && contractDate <= dateRange.to;
      }
      
      return matchesSearch && matchesStatus && matchesClient && matchesDate;
    })
    .sort((a: any, b: any) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.contractDate).getTime() - new Date(b.contractDate).getTime();
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "client":
          comparison = (a.clientId || "").localeCompare(b.clientId || "");
          break;
        case "period":
          comparison = (a.duration || 0) - (b.duration || 0);
          break;
        default:
          return 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Get unique clients for filter
  const uniqueClients = Array.from(new Set(((contracts as any[]) || []).map((c: any) => c.clientId).filter(Boolean)));

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

  const getClientName = (clientId: string) => {
    const client = ((users as any[]) || []).find((u: any) => u.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : clientId;
  };

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
  };

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navyblue mb-2">List of Contracts</h1>
            <p className="text-gray-600">
              View and manage contracts assigned to you based on access provided by Admin.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-navyblue">Filter & Search Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contracts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={clientFilter} onValueChange={setClientFilter}>
                  <SelectTrigger>
                    <Building className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    {uniqueClients.map((clientId) => (
                      <SelectItem key={clientId} value={clientId}>
                        {getClientName(clientId)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  disabled={contractsLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${contractsLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date Range Filter
                  </label>
                  <Input
                    type="date"
                    placeholder="Start date"
                    onChange={(e) => setDateRange({ from: new Date(e.target.value), to: dateRange?.to })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Contract Date</SelectItem>
                      <SelectItem value="name">Contract Name</SelectItem>
                      <SelectItem value="client">Client Name</SelectItem>
                      <SelectItem value="period">Contract Period</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
                <FileText className="h-4 w-4 text-navyblue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-navyblue">{filteredContracts.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {filteredContracts.filter((c: any) => c.status === "active").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredContracts.filter((c: any) => c.status === "in_progress").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <FileText className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {filteredContracts.filter((c: any) => c.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-navyblue">Your Assigned Contracts</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {filteredContracts.length} contracts found
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {contractsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navyblue mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading contracts...</p>
                </div>
              ) : filteredContracts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No contracts found matching your criteria</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your filters or contact admin for contract assignments
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleSort("name")}
                        >
                          <div className="flex items-center">
                            Contract Name
                            {getSortIcon("name")}
                          </div>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleSort("date")}
                        >
                          <div className="flex items-center">
                            Contract Date
                            {getSortIcon("date")}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleSort("period")}
                        >
                          <div className="flex items-center">
                            Period (Months)
                            {getSortIcon("period")}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleSort("client")}
                        >
                          <div className="flex items-center">
                            Client
                            {getSortIcon("client")}
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContracts.map((contract: any) => (
                        <TableRow key={contract.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-navyblue">
                            {contract.name}
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-gray-600">
                            {contract.description || "No description"}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {formatDate(contract.contractDate)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {contract.duration || "N/A"}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {getClientName(contract.clientId)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(contract.status)}>
                              {contract.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Link href={`/contracts/${contract.id}`}>
                                <Button size="sm" className="bg-golden hover:bg-goldenrod1 text-navyblue">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Contract Page
                                </Button>
                              </Link>
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

          {/* Additional Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg text-navyblue">Access Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Your Contract Access</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      You can only view contracts that have been specifically assigned to you by the admin. 
                      Each contract page will show different action buttons based on your permissions level.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}