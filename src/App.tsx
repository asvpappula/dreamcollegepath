import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesCounselingCollege from "./pages/ServicesCounselingCollege";
import ServicesTestPrep from "./pages/ServicesTestPrep";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import BuildProject from "./pages/BuildProject";
// Chat component removed - no longer using chat functionality
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import TutoringMath from "./pages/TutoringMath";
import TutoringScience from "./pages/TutoringScience";
import TutoringEnglish from "./pages/TutoringEnglish";
import TutoringHistory from "./pages/TutoringHistory";
import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    authApi
      .me()
      .then((res) => {
        if (!mounted) return;
        setUser(res.user || null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    authApi
      .me()
      .then((res) => {
        if (!mounted) return;
        setUser(res.user || null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/counseling-college" element={<ServicesCounselingCollege />} />
            <Route path="/test-prep" element={<ServicesTestPrep />} />
            <Route path="/build-project" element={<BuildProject />} />
            {/* Chat route removed - no longer using chat functionality */}
            <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/tutoring/math" element={<TutoringMath />} />
            <Route path="/tutoring/science" element={<TutoringScience />} />
            <Route path="/tutoring/english" element={<TutoringEnglish />} />
            <Route path="/tutoring/history" element={<TutoringHistory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
