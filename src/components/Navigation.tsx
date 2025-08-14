import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { auth, logOut } from "@/lib/firebase";
import { authApi } from "@/lib/api";
import { onAuthStateChanged } from "firebase/auth";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logOut();
      await authApi.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 min-w-0" style={{ flex: '0 1 auto' }}>
          <Link to="/" className="flex items-center space-x-2 min-w-0">
            <span className="font-display font-semibold text-xl text-white whitespace-nowrap">
              DreamCollegePath
            </span>
          </Link>
        </div>
        {/* Center: Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 mx-8">
          <Link to="/" className="text-sm font-medium hover:text-white transition-colors px-1">
            Home
          </Link>
          
          {/* Programs Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-white transition-colors px-1">
              Programs
              <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/counseling-college">Counseling/College</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/test-prep">Test Prep (ACT/SAT)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/build-project">Build a Project</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-white transition-colors px-1">
              Services
              <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="#ap-math">AP Math</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#ap-physics">AP Physics</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#ap-chemistry">AP Chemistry</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#ap-biology">AP Biology</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* About/Contact Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-white transition-colors px-1">
              About
              <ChevronDown className="ml-1 h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        {/* Right: CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0" style={{ flex: '0 1 auto' }}>
          <Link to="/chat" className="text-sm font-medium hover:text-white transition-colors px-1">
            Chat
          </Link>
          {!isLoading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-secondary/80 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-secondary/80"
                onClick={handleLogin}
              >
                Login
              </Button>
            )
          )}
          <Button variant="hero" size="sm" asChild className="bg-white text-secondary hover:bg-gray-100">
            <Link to="/subscription">Get Started</Link>
          </Button>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Programs Section */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">Programs</div>
              <Link
                to="/counseling-college"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Counseling/College
              </Link>
              <Link
                to="/test-prep"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Test Prep (ACT/SAT)
              </Link>
              <Link
                to="/build-project"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Build a Project
              </Link>
            </div>
            
            {/* Services Section */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">Services</div>
              <a
                href="#ap-math"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AP Math
              </a>
              <a
                href="#ap-physics"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AP Physics
              </a>
              <a
                href="#ap-chemistry"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AP Chemistry
              </a>
              <a
                href="#ap-biology"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AP Biology
              </a>
            </div>
            
            {/* About Section */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-muted-foreground">About</div>
              <Link
                to="/about"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block py-2 pl-4 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            
            <Link
              to="/chat"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chat
            </Link>
            <div className="pt-4 space-y-2">
              {!isLoading && (
                user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </div>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )
              )}
              <Button variant="hero" className="w-full" asChild>
                <Link to="/subscription">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;