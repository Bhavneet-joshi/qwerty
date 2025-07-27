import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Home, 
  FileText, 
  User, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Plus,
  BarChart3
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavigationItems = () => {
    const role = (user as any)?.role;
    
    switch (role) {
      case 'client':
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/contracts", label: "Contracts", icon: FileText },
        ];
      case 'employee':
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/contracts", label: "Contracts", icon: FileText },
        ];
      case 'admin':
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/profile", label: "Profile", icon: User },
          { href: "/contracts", label: "Contracts", icon: FileText },
          { href: "/contracts/new", label: "New Contract", icon: Plus },
          { href: "/users", label: "User Management", icon: Users },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => (
    <Link href={href}>
      <span
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
          location === href
            ? "bg-navyblue text-white dark:bg-golden dark:text-navyblue"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon className="h-5 w-5 mr-3" />
        {label}
      </span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Navigation Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/dashboard">
                <div className="flex items-center cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <span className="ml-3 text-lg font-bold text-navyblue dark:text-golden">HLSG Industries</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                        location === item.href
                          ? "bg-navyblue text-white dark:bg-golden dark:text-navyblue"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right side - Theme toggle and User menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full theme-transition hover:scale-105">
                    <Avatar className="h-10 w-10 theme-transition">
                      <AvatarImage src={(user as any)?.profileImageUrl} alt={`${(user as any)?.firstName} ${(user as any)?.lastName}`} />
                      <AvatarFallback className="bg-navyblue text-white dark:bg-golden dark:text-navyblue theme-transition">
                        {(user as any)?.firstName?.[0]}{(user as any)?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 theme-transition border-golden/20 dark:border-golden/30" align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {(user as any)?.firstName} {(user as any)?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(user as any)?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-golden/20 dark:bg-golden/30" />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer theme-transition hover:bg-golden/10 dark:hover:bg-golden/20">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-golden/20 dark:bg-golden/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 dark:text-red-400 theme-transition hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => window.location.href = "/api/logout"}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {sidebarOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 py-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                        location === item.href
                          ? "bg-navyblue text-white dark:bg-golden dark:text-navyblue"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Page Title Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {navigationItems.find(item => item.href === location)?.label || "Dashboard"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
              {(user as any)?.role} Portal
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Page content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}