import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";
import MemberDashboard from "./pages/member/Dashboard";
import Courses from "./pages/member/Courses";
import CourseDetail from "./pages/member/CourseDetail";
import Lives from "./pages/member/Lives";
import Materials from "./pages/member/Materials";
import ChatbotBuilder from "./pages/member/ChatbotBuilder";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminLives from "./pages/admin/Lives";
import AdminMaterials from "./pages/admin/Materials";
import AdminChatbotBuilder from "./pages/admin/ChatbotBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Member Routes */}
            <Route path="/member" element={
              <ProtectedRoute allowedRole="member">
                <MemberLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MemberDashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="lives" element={<Lives />} />
              <Route path="materials" element={<Materials />} />
              <Route path="chatbot-builder" element={<ChatbotBuilder />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="lives" element={<AdminLives />} />
              <Route path="materials" element={<AdminMaterials />} />
              <Route path="chatbot-builder" element={<AdminChatbotBuilder />} />
            </Route>
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
