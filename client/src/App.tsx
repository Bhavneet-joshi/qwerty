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
// Comment out individual about pages since we now have a single comprehensive About page
// import AboutFounders from "@/pages/about/AboutFounders";
// import AboutCompany from "@/pages/about/AboutCompany";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Policy from "@/pages/Policy";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Client pages
import Layout from "@/components/Layout";
import ProtectedLayout from "@/components/ProtectedLayout";
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
import UserManagement from "@/pages/admin/UserManagement";
import AdminContractSpecific from "@/pages/admin/ContractSpecific";
import AdminNewContract from "@/pages/admin/NewContract";

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
          {/* Comment out individual about routes since we now have a single comprehensive About page */}
          {/* <Route path="/about/founders" component={AboutFounders} /> */}
          {/* <Route path="/about/company" component={AboutCompany} /> */}
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route path="/policy" component={Policy} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </>
      ) : (
        <>
          {/* Admin routes */}
          {(user as any)?.role === 'admin' && (
            <ProtectedLayout>
              <Route path="/" component={AdminDashboard} />
              <Route path="/dashboard" component={AdminDashboard} />
              <Route path="/profile" component={AdminProfile} />
              <Route path="/contracts" component={AdminContracts} />
              <Route path="/users" component={UserManagement} />
              <Route path="/contracts/new" component={AdminNewContract} />
              <Route path="/contracts/:id" component={AdminContractSpecific} />
            </ProtectedLayout>
          )}

          {/* Employee routes */}
          {(user as any)?.role === 'employee' && (
            <ProtectedLayout>
              <Route path="/" component={EmployeeDashboard} />
              <Route path="/dashboard" component={EmployeeDashboard} />
              <Route path="/profile" component={EmployeeProfile} />
              <Route path="/contracts" component={EmployeeContracts} />
              <Route path="/contracts/:id" component={EmployeeContractSpecific} />
            </ProtectedLayout>
          )}

          {/* Client routes */}
          {(user as any)?.role === 'client' && (
            <ProtectedLayout>
              <Route path="/" component={ClientDashboard} />
              <Route path="/dashboard" component={ClientDashboard} />
              <Route path="/profile" component={ClientProfile} />
              <Route path="/contracts" component={ClientContracts} />
              <Route path="/contracts/:id" component={ClientContractView} />
            </ProtectedLayout>
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