import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { 
      href: "/about", 
      label: "About Us",
      dropdown: [
        { href: "/about/founders", label: "About Founders" },
        { href: "/about/company", label: "About Company" }
      ]
    },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact Us" },
    { href: "/policy", label: "Policy" },
  ];

  const NavLink = ({ href, label, dropdown }: { href: string; label: string; dropdown?: { href: string; label: string }[] }) => {
    if (dropdown) {
      return (
        <div className="relative group">
          <Link href={href}>
            <span className={`px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer hover:text-navyblue flex items-center ${
              location === href || dropdown.some(item => location === item.href) ? "text-navyblue dark:text-golden" : "text-gray-700 dark:text-gray-300"
            }`}>
              {label}
              <ChevronDown className="ml-1 h-4 w-4" />
            </span>
          </Link>
          <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {dropdown.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-navyblue dark:hover:text-golden cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <Link href={href}>
        <span
          className={`px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer hover:text-navyblue ${
            location === href ? "text-navyblue dark:text-golden" : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-r from-navyblue to-goldenrod1 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="ml-3 text-xl font-bold text-navyblue dark:text-golden">HLSG Industries</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} dropdown={item.dropdown} />
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden dark:hover:bg-golden dark:hover:text-navyblue"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue">
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <NavLink href={item.href} label={item.label} dropdown={item.dropdown} />
                      {item.dropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <span className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-navyblue dark:hover:text-golden cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full mb-2 border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden dark:hover:bg-golden dark:hover:text-navyblue"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.location.href = "/api/login";
                      }}
                    >
                      Login
                    </Button>
                    <Link href="/register">
                      <Button className="w-full bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue" onClick={() => setIsMenuOpen(false)}>
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

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

            {/* Site Map */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Site Map</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">About Us</span></Link></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">About Founders</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-golden transition-colors duration-200">News</a></li>
                <li><Link href="/contact"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Contact</span></Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/policy"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Privacy Policy</span></Link></li>
                <li><Link href="/policy"><span className="text-gray-300 hover:text-golden transition-colors duration-200 cursor-pointer">Data Protection</span></Link></li>
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
