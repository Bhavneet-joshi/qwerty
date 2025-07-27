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
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard">
            <div className="flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="ml-3 text-lg font-bold text-navyblue dark:text-golden">HLSG Industries</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {navigationItems.find(item => item.href === location)?.label || "Dashboard"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {(user as any)?.role} Portal
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={(user as any)?.profileImageUrl} alt={`${(user as any)?.firstName} ${(user as any)?.lastName}`} />
                      <AvatarFallback className="bg-navyblue text-white">
                        {(user as any)?.firstName?.[0]}{(user as any)?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {(user as any)?.firstName} {(user as any)?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(user as any)?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 dark:text-red-400"
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

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}