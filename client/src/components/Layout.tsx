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

        {/* Footer */}
        <footer className="bg-[#1e3557] dark:bg-[#1e3557] text-white relative">
          {/* Social Media Bar */}
          <div className="bg-[#1e3557] py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <p className="text-sm">Get connected with us on social networks:</p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-[#1e3557] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-[#1e3557] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-[#1e3557] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Company Logo and Description */}
                <div className="lg:col-span-1">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xl">H</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">HLSG INDUSTRIES</h3>
                        <p className="text-xs text-gray-300">ACADEMY SERVICES FOR YOUR</p>
                        <p className="text-xs text-orange-400">BUSINESS INTELLIGENCE</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      HLSG INDUSTRIES offers comprehensive contract management solutions and business intelligence services for enterprises. Our platform provides streamlined workflows for document management, stakeholder collaboration, and compliance tracking. Led by experienced professionals who focus on delivering excellence.
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 uppercase">QUICK LINKS</h3>
                  <ul className="space-y-3">
                    <li><Link href="/dashboard"><span className="text-gray-300 hover:text-orange-400 transition-colors duration-200 cursor-pointer text-sm">Careers</span></Link></li>
                    <li><Link href="/profile"><span className="text-gray-300 hover:text-orange-400 transition-colors duration-200 cursor-pointer text-sm">Results</span></Link></li>
                    <li><Link href="/contracts"><span className="text-gray-300 hover:text-orange-400 transition-colors duration-200 cursor-pointer text-sm">Prev</span></Link></li>
                    <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Online Testing</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">About</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Contact</a></li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 uppercase">CONTACT</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <p className="font-medium">123 Business Park,</p>
                      <p>Sector 62, Noida</p>
                      <p>Uttar Pradesh, India</p>
                    </div>
                    <div className="space-y-2">
                      <p>contact@hlsgindustries.com</p>
                      <p>+91 120 456 7890</p>
                      <p>+91 120 456 7891</p>
                    </div>
                  </div>
                </div>

                {/* Location on Map */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 uppercase">LOCATION ON MAP</h3>
                  <div className="bg-gray-100 rounded-lg overflow-hidden h-48">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                      {/* Google Maps-like interface */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                        {/* Streets overlay */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-400"></div>
                          <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-400"></div>
                          <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-400"></div>
                          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-400"></div>
                          <div className="absolute left-16 top-0 h-full w-0.5 bg-gray-400"></div>
                        </div>
                        
                        {/* Location marker */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Map controls */}
                        <div className="absolute top-2 right-2 flex flex-col space-y-1">
                          <div className="w-6 h-6 bg-white rounded shadow flex items-center justify-center text-xs">+</div>
                          <div className="w-6 h-6 bg-white rounded shadow flex items-center justify-center text-xs">-</div>
                        </div>
                        
                        {/* View larger map link */}
                        <div className="absolute bottom-2 right-2">
                          <a href="#" className="text-xs bg-white px-2 py-1 rounded shadow text-blue-600 hover:underline">
                            View larger map
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#2a4a6b] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-sm text-gray-300">
                © 2024 Copyright
                <span className="font-semibold ml-1">HLSG Industries</span>
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}