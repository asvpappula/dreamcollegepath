import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail, verifyEmail, auth } from "@/lib/firebase";
import { authApi } from "@/lib/api";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form states
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Validation states
  const [signInErrors, setSignInErrors] = useState<{[key: string]: string}>({});
  const [signUpErrors, setSignUpErrors] = useState<{[key: string]: string}>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignInChange = (field: string, value: string) => {
    setSignInForm(prev => ({ ...prev, [field]: value }));
    
    // Inline validation
    if (field === "email" && value && !validateEmail(value)) {
      setSignInErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    } else if (field === "email") {
      setSignInErrors(prev => ({ ...prev, email: "" }));
    }
    
    if (field === "password" && value && !validatePassword(value)) {
      setSignInErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
    } else if (field === "password") {
      setSignInErrors(prev => ({ ...prev, password: "" }));
    }
  };

  const handleSignUpChange = (field: string, value: string | boolean) => {
    setSignUpForm(prev => ({ ...prev, [field]: value }));
    
    // Inline validation
    if (field === "email" && typeof value === "string" && value && !validateEmail(value)) {
      setSignUpErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    } else if (field === "email") {
      setSignUpErrors(prev => ({ ...prev, email: "" }));
    }
    
    if (field === "password" && typeof value === "string" && value && !validatePassword(value)) {
      setSignUpErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
    } else if (field === "password") {
      setSignUpErrors(prev => ({ ...prev, password: "" }));
    }
    
    if (field === "confirmPassword" && typeof value === "string" && value && value !== signUpForm.password) {
      setSignUpErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (field === "confirmPassword") {
      setSignUpErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const idToken = await user.getIdToken();
      const upsertRes = await authApi.upsert(idToken);
      if (upsertRes.ok) {
        setSuccess("Successfully signed in with Google!");
        setTimeout(() => navigate("/profile"), 600);
      } else {
        throw new Error("Upsert failed");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    // Validate form
    const errors: {[key: string]: string} = {};
    if (!signInForm.email) errors.email = "Email is required";
    else if (!validateEmail(signInForm.email)) errors.email = "Please enter a valid email address";
    
    if (!signInForm.password) errors.password = "Password is required";
    else if (!validatePassword(signInForm.password)) errors.password = "Password must be at least 8 characters";
    
    setSignInErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }
    
    try {
      const cred = await signInWithEmail(signInForm.email, signInForm.password);
      const idToken = await cred.user.getIdToken();
      const upsertRes = await authApi.upsert(idToken);
      if (upsertRes.ok) {
        setSuccess("Successfully signed in!");
        setTimeout(() => navigate("/profile"), 600);
      } else {
        throw new Error("Upsert failed");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    // Validate form
    const errors: {[key: string]: string} = {};
    if (!signUpForm.email) errors.email = "Email is required";
    else if (!validateEmail(signUpForm.email)) errors.email = "Please enter a valid email address";
    
    if (!signUpForm.password) errors.password = "Password is required";
    else if (!validatePassword(signUpForm.password)) errors.password = "Password must be at least 8 characters";
    
    if (!signUpForm.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (signUpForm.password !== signUpForm.confirmPassword) errors.confirmPassword = "Passwords do not match";
    
    if (!signUpForm.acceptTerms) errors.acceptTerms = "You must accept the Terms of Service and Privacy Policy";
    
    setSignUpErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }
    
    try {
      const cred = await signUpWithEmail(signUpForm.email, signUpForm.password);
      // Send verification email
      try { await verifyEmail(cred.user); } catch {}
      const idToken = await cred.user.getIdToken();
      const upsertRes = await authApi.upsert(idToken);
      if (upsertRes.ok) {
        setSuccess("Account created! Please verify your email. Redirecting...");
        setTimeout(() => navigate("/welcome"), 800);
      } else {
        throw new Error("Upsert failed");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 pt-20">
        <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-display font-bold text-primary mb-2">
            Welcome to Dream College Path
          </h1>
          <p className="text-muted-foreground">
            Your journey to college success starts here
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Create Account</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Status Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-2 hover:bg-gray-50"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <Tabs value={activeTab} className="w-full">
              {/* Sign In Form */}
              <TabsContent value="signin" className="space-y-4 mt-0">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        className={`pl-10 h-12 ${signInErrors.email ? 'border-red-500' : ''}`}
                        value={signInForm.email}
                        onChange={(e) => handleSignInChange("email", e.target.value)}
                        aria-describedby={signInErrors.email ? "signin-email-error" : undefined}
                      />
                    </div>
                    {signInErrors.email && (
                      <p id="signin-email-error" className="text-sm text-red-500">{signInErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 h-12 ${signInErrors.password ? 'border-red-500' : ''}`}
                        value={signInForm.password}
                        onChange={(e) => handleSignInChange("password", e.target.value)}
                        aria-describedby={signInErrors.password ? "signin-password-error" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-10 w-10 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {signInErrors.password && (
                      <p id="signin-password-error" className="text-sm text-red-500">{signInErrors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Link 
                      to="/reset" 
                      className="text-sm text-primary hover:text-primary-light transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-secondary hover:bg-secondary-light text-secondary-foreground font-semibold text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-4 mt-0">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className={`pl-10 h-12 ${signUpErrors.email ? 'border-red-500' : ''}`}
                        value={signUpForm.email}
                        onChange={(e) => handleSignUpChange("email", e.target.value)}
                        aria-describedby={signUpErrors.email ? "signup-email-error" : undefined}
                      />
                    </div>
                    {signUpErrors.email && (
                      <p id="signup-email-error" className="text-sm text-red-500">{signUpErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className={`pl-10 pr-10 h-12 ${signUpErrors.password ? 'border-red-500' : ''}`}
                        value={signUpForm.password}
                        onChange={(e) => handleSignUpChange("password", e.target.value)}
                        aria-describedby={signUpErrors.password ? "signup-password-error" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-10 w-10 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {signUpErrors.password && (
                      <p id="signup-password-error" className="text-sm text-red-500">{signUpErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pl-10 h-12 ${signUpErrors.confirmPassword ? 'border-red-500' : ''}`}
                        value={signUpForm.confirmPassword}
                        onChange={(e) => handleSignUpChange("confirmPassword", e.target.value)}
                        aria-describedby={signUpErrors.confirmPassword ? "signup-confirm-password-error" : undefined}
                      />
                    </div>
                    {signUpErrors.confirmPassword && (
                      <p id="signup-confirm-password-error" className="text-sm text-red-500">{signUpErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="accept-terms"
                      checked={signUpForm.acceptTerms}
                      onCheckedChange={(checked) => handleSignUpChange("acceptTerms", checked === true)}
                      className={signUpErrors.acceptTerms ? 'border-red-500' : ''}
                      aria-describedby={signUpErrors.acceptTerms ? "accept-terms-error" : undefined}
                    />
                    <Label 
                      htmlFor="accept-terms" 
                      className="text-sm text-muted-foreground leading-5"
                    >
                      I accept the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary-light underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary-light underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {signUpErrors.acceptTerms && (
                    <p id="accept-terms-error" className="text-sm text-red-500">{signUpErrors.acceptTerms}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-secondary hover:bg-secondary-light text-secondary-foreground font-semibold text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>


            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3 flex flex-col items-center">
          <div className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link to="/contact" className="text-primary hover:text-primary-light underline">
              Contact Support
            </Link>
          </div>
          <Button
            variant="outline"
            className="text-sm text-muted-foreground border-gray-300 hover:bg-gray-50"
            onClick={() => navigate('/admin-login')}
          >
            Admin Login
          </Button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;