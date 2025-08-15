import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, logOut } from "@/lib/firebase";
import { authApi } from "@/lib/api";
import { onAuthStateChanged } from "firebase/auth";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const programsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await authApi.me();
          setUser(response.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(event.target as Node)) {
        setIsProgramsOpen(false);
      }
    };

    // Close dropdown on Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProgramsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProgramsMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProgramsOpen(true);
  };

  const handleProgramsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProgramsOpen(false);
    }, 150);
  };

  const handleProgramsClick = () => {
    setIsProgramsOpen(!isProgramsOpen);
  };

  const handleProgramsKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsProgramsOpen(!isProgramsOpen);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-secondary text-secondary-foreground shadow-lg" style={{height: '72px'}}>
        <div className="mx-auto flex items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16" style={{height: '100%', maxWidth: '1200px'}}>
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-display font-semibold text-blue-600 whitespace-nowrap" style={{fontSize: 'clamp(22px, 2.2vw, 28px)'}}>
                DreamCollegePath
              </span>
            </Link>
          </div>
          
          {/* Center: Nav Links */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div 
              ref={programsRef}
              className="relative"
              onMouseEnter={handleProgramsMouseEnter}
              onMouseLeave={handleProgramsMouseLeave}
            >
              <button
                onClick={handleProgramsClick}
                onKeyDown={handleProgramsKeyDown}
                className="relative flex items-center text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-expanded={isProgramsOpen}
                aria-haspopup="true"
              >
                Programs 
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {isProgramsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link 
                    to="/services/counseling/college" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg mx-2"
                    onClick={() => setIsProgramsOpen(false)}
                  >
                    College Counseling
                  </Link>
                  <Link 
                    to="/services/test-prep" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg mx-2"
                    onClick={() => setIsProgramsOpen(false)}
                  >
                    Test Preparation
                  </Link>
                  <div className="px-2 py-1">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">Tutoring Programs</div>
                    <Link 
                      to="/tutoring/math" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg"
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      Math Tutoring
                    </Link>
                    <Link 
                      to="/tutoring/science" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg"
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      Science Tutoring
                    </Link>
                    <Link 
                      to="/tutoring/english" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg"
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      English Tutoring
                    </Link>
                    <Link 
                      to="/tutoring/history" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg"
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      History Tutoring
                    </Link>
                  </div>
                  <Link 
                    to="/build-project" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg mx-2"
                    onClick={() => setIsProgramsOpen(false)}
                  >
                    Build Project
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/about" 
              className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              to="/contact" 
              className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Right: Auth Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Chat link removed - no longer using chat functionality */}
            
            {user?.isAdmin && (
              <Link 
                to="/admin-login" 
                className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-1 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              >
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <User className="h-5 w-5 text-blue-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 py-2" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 rounded-lg mx-2">
                        <Settings className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <div className="h-px bg-gray-200 my-1 mx-2"></div>
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 rounded-lg mx-2 cursor-pointer"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                  >
                    Login
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link 
                    to="/subscription" 
                    className="relative text-lg font-medium text-blue-600 hover:text-blue-800 transition-all duration-300 py-2 px-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                  >
                    Get Started
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </>
              )
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-blue-600" />
            ) : (
              <Menu className="h-6 w-6 text-blue-600" />
            )}
          </button>
        </div>
      </header>
      
      <div className="w-full bg-gradient-to-r from-blue-800 to-blue-900 shadow-sm" style={{height: '3px'}}></div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto px-6 py-6 space-y-1" style={{maxWidth: '1200px'}}>
            <Link
              to="/"
              className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="space-y-1">
              <div className="py-3 px-4 text-lg font-medium text-blue-600">Programs</div>
              <div className="pl-4 space-y-1">
                <Link
                  to="/services/counseling/college"
                  className="block py-2 px-4 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  College Counseling
                </Link>
                <Link
                  to="/services/test-prep"
                  className="block py-2 px-4 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Test Preparation
                </Link>
                
                <div className="space-y-1">
                  <div className="py-2 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Tutoring Programs</div>
                  <div className="pl-4 space-y-1">
                    <Link
                      to="/tutoring/math"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Math Tutoring
                    </Link>
                    <Link
                      to="/tutoring/science"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Science Tutoring
                    </Link>
                    <Link
                      to="/tutoring/english"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      English Tutoring
                    </Link>
                    <Link
                      to="/tutoring/history"
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      History Tutoring
                    </Link>
                  </div>
                </div>
                
                <Link
                  to="/build-project"
                  className="block py-2 px-4 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Build Project
                </Link>
              </div>
            </div>
            
            <Link
              to="/about"
              className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            
            <Link
              to="/contact"
              className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="border-t border-gray-200 my-4"></div>
            
            {/* Chat link removed - no longer using chat functionality */}
            
            {user?.isAdmin && (
              <Link
                to="/admin-login"
                className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="space-y-1">
              {!isLoading && (
                user ? (
                  <>
                    <Link
                      to="/admin"
                      className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-3 px-4 text-lg font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-all duration-200 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/subscription"
                      className="block py-3 px-4 text-lg font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;