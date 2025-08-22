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
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminAudit from "./pages/AdminAudit";
import AdminLogin from "./pages/AdminLogin";
import TutoringMath from "./pages/TutoringMath";
import TutoringScience from "./pages/TutoringScience";
import TutoringEnglish from "./pages/TutoringEnglish";
import TutoringHistory from "./pages/TutoringHistory";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

// Authentication components removed - using new AuthProvider and ProtectedRoute

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/counseling-college" element={<ServicesCounselingCollege />} />
              <Route path="/test-prep" element={<ServicesTestPrep />} />
              <Route path="/build-project" element={<BuildProject />} />
              {/* Chat route removed - no longer using chat functionality */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/submissions" element={<ProtectedRoute><AdminSubmissions /></ProtectedRoute>} />
              <Route path="/admin/audit" element={<ProtectedRoute><AdminAudit /></ProtectedRoute>} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/tutoring/math" element={<TutoringMath />} />
              <Route path="/tutoring/science" element={<TutoringScience />} />
              <Route path="/tutoring/english" element={<TutoringEnglish />} />
              <Route path="/tutoring/history" element={<TutoringHistory />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
