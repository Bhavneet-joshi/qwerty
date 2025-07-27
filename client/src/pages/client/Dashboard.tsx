import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  FileText, 
  Plus, 
  Eye, 
  Download, 
  Calendar, 
  DollarSign, 
  Clock,
  TrendingUp,
  Activity
} from "lucide-react";
import { format } from "date-fns";

export default function ClientDashboard() {
  const { user, isLoading } = useAuth();

  // Fetch contracts summary
  const { data: contractsSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ["/api/contracts/summary"],
    enabled: !!user,
  });

  // Fetch recent contracts
  const { data: recentContracts, isLoading: contractsLoading } = useQuery({
    queryKey: ["/api/contracts/recent", 5],
    enabled: !!user,
  });

  if (isLoading || summaryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-navyblue"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <TrendingUp className="h-4 w-4" />;
      case "cancelled":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navyblue dark:text-golden">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName} {user?.lastName}
            </p>
          </div>
          <Link href="/contracts/request">
            <Button className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue">
              <Plus className="h-4 w-4 mr-2" />
              Request New Contract
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Contracts
              </CardTitle>
              <FileText className="h-4 w-4 text-navyblue dark:text-golden" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navyblue dark:text-golden">
                {contractsSummary?.total || 0}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All time contracts
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Contracts
              </CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {contractsSummary?.active || 0}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Currently running
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {contractsSummary?.inProgress || 0}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Under review
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-navyblue dark:text-golden" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navyblue dark:text-golden">
                ₹{contractsSummary?.totalValue?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Contract value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Contracts */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-navyblue dark:text-golden">Recent Contracts</CardTitle>
            <Link href="/contracts">
              <Button variant="outline" size="sm" className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden">
                View All Contracts
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {contractsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : recentContracts?.length > 0 ? (
              <div className="space-y-4">
                {recentContracts.map((contract: any) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-navyblue/10 dark:bg-golden/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-navyblue dark:text-golden" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {contract.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {contract.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(contract.contractDate), "MMM dd, yyyy")}
                          </span>
                          {contract.contractValue && (
                            <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                              <DollarSign className="h-3 w-3 mr-1" />
                              ₹{contract.contractValue.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusIcon(contract.status)}
                        <span className="ml-1 capitalize">{contract.status.replace('_', ' ')}</span>
                      </Badge>
                      <div className="flex space-x-2">
                        <Link href={`/contracts/${contract.id}`}>
                          <Button size="sm" variant="outline" className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        {contract.pdfUrl && (
                          <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No contracts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You haven't entered into any contracts yet. Request your first contract to get started.
                </p>
                <Link href="/contracts/request">
                  <Button className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue">
                    <Plus className="h-4 w-4 mr-2" />
                    Request New Contract
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}