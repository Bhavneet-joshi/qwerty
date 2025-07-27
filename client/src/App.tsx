import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeTransition } from "@/components/ui/theme-transition";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import About from "@/pages/About";
import AboutFounders from "@/pages/about/AboutFounders";
import AboutCompany from "@/pages/about/AboutCompany";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Policy from "@/pages/Policy";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Client pages
import Layout from "@/components/Layout";
import ClientDashboard from "@/pages/client/Dashboard";
import ClientProfile from "@/pages/client/Profile";
import ClientContracts from "@/pages/client/Contracts";
import ClientContractView from "@/pages/client/ContractView";

// Employee pages
import EmployeeDashboard from "@/pages/employee/Dashboard";
import EmployeeProfile from "@/pages/employee/Profile";
import EmployeeContracts from "@/pages/employee/Contracts";
import EmployeeContractSpecific from "@/pages/employee/ContractSpecific";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProfile from "@/pages/admin/Profile";
import AdminContracts from "@/pages/admin/Contracts";
import AdminContractSpecific from "@/pages/admin/ContractSpecific";
import AdminNewContract from "@/pages/admin/NewContract";
import AdminUserManagement from "@/pages/admin/UserManagement";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-navyblue"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/about/founders" component={AboutFounders} />
          <Route path="/about/company" component={AboutCompany} />
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route path="/policy" component={Policy} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </>
      ) : (
        <>
          {/* Client routes */}
          {(user as any)?.role === 'client' && (
            <Layout>
              <Route path="/" component={ClientDashboard} />
              <Route path="/dashboard" component={ClientDashboard} />
              <Route path="/profile" component={ClientProfile} />
              <Route path="/contracts" component={ClientContracts} />
              <Route path="/contracts/:id" component={ClientContractView} />
            </Layout>
          )}
          
          {/* Employee routes */}
          {(user as any)?.role === 'employee' && (
            <Layout>
              <Route path="/" component={ClientDashboard} />
              <Route path="/dashboard" component={ClientDashboard} />
              <Route path="/profile" component={ClientProfile} />
              <Route path="/contracts" component={ClientContracts} />
              <Route path="/contracts/:id" component={ClientContractView} />
            </Layout>
          )}
          
          {/* Admin routes */}
          {(user as any)?.role === 'admin' && (
            <Layout>
              <Route path="/" component={ClientDashboard} />
              <Route path="/dashboard" component={ClientDashboard} />
              <Route path="/profile" component={ClientProfile} />
              <Route path="/contracts" component={ClientContracts} />
              <Route path="/contracts/:id" component={ClientContractView} />
            </Layout>
          )}
        </>
      )}
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="hlsg-theme">
        <TooltipProvider>
          <ThemeTransition />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
