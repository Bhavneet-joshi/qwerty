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
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Our Office - Map Section (Left Side) */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-golden mb-4">OUR OFFICE</h3>
                <div className="bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                  <div className="relative h-48 bg-gradient-to-br from-blue-900 to-green-900">
                    {/* Simplified Map Interface */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-navyblue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Map Grid Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 grid-rows-3 h-full">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <div key={i} className="border border-gray-400"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Animated Location Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="animate-ping absolute h-3 w-3 rounded-full bg-golden opacity-75"></div>
                        <div className="relative h-3 w-3 rounded-full bg-golden border-2 border-white shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <p className="font-medium">📞 +91 120 456 7890</p>
                  <p>123 Business Park, Sector 62, Noida</p>
                </div>
              </div>

              {/* Say Hello Section (Middle) */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-golden mb-4">SAY HELLO</h3>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    If you are interested in working with us or just want to say hello simply drop us a line!
                  </p>
                  <p className="text-golden font-semibold">contact@hlsgindustries.com</p>
                </div>
              </div>

              {/* Subscribe Us Section (Right) */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-golden mb-4">SUBSCRIBE US</h3>
                <div className="space-y-4">
                  {/* Social Media Icons */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">f</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">t</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">in</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">g+</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">fl</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-golden hover:text-navyblue transition-colors cursor-pointer">
                      <span className="text-xs font-bold">pi</span>
                    </div>
                  </div>
                  
                  {/* Email Subscription */}
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL"
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:border-golden focus:outline-none"
                    />
                    <button className="w-full bg-gray-600 hover:bg-golden hover:text-navyblue text-white py-3 rounded-full font-semibold transition-colors duration-200">
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">H</span>
                  </div>
                  <span className="ml-3 text-xl font-bold">HLSG Industries</span>
                </div>
                <p className="text-gray-300 mb-6">
                  Building the future through innovative solutions and strategic partnerships.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-golden transition-colors duration-200">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-golden transition-colors duration-200">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-golden transition-colors duration-200">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-golden transition-colors duration-200">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/dashboard"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Dashboard</span></Link></li>
                  <li><Link href="/profile"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Profile</span></Link></li>
                  <li><Link href="/contracts"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Contracts</span></Link></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Support</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">About Founders</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">News</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Contact</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Data Protection</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Compliance</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                &copy; 2024 HLSG Industries. All rights reserved. | Designed with excellence for the future.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}