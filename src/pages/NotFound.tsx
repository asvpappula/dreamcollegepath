import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-8xl font-display font-bold text-gradient">404</div>
        <h1 className="text-2xl font-display font-semibold">Page Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="space-y-4">
          <a href="/">
            <Button variant="hero" size="lg">
              Return to Home
            </Button>
          </a>
          <div className="text-sm text-muted-foreground">
            <a href="#contact" className="text-primary hover:underline">
              Contact us
            </a> if you need help finding something specific.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
