import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesCounselingCollege from "./pages/ServicesCounselingCollege";
import ServicesTestPrep from "./pages/ServicesTestPrep";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import BuildProject from "./pages/BuildProject";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Admin from "./pages/Admin";
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

const App = () => (
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
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/subscription" element={<Subscription />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
