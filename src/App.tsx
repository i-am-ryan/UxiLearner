import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, DevRoleSwitcher } from "./components/layout/Layout";

// Auth / shell
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Dashboard & features
import Dashboard from "./pages/Dashboard";
import Competencies from "./pages/Competencies";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Assessment from "./pages/Assessment";
import Homework from "./pages/Homework";
import Finance from "./pages/Finance";
import Libraries from "./pages/Libraries";

// ✅ Wire the pages that were showing “Coming Soon”
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Progress from "./pages/Progress";
import Schedule from "./pages/Schedule";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            {/* Default to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Core routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="competencies" element={<Competencies />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="assessment/:courseId" element={<Assessment />} />
            <Route path="homeworks" element={<Homework />} />
            <Route path="libraries" element={<Libraries />} />
            
            <Route path="schedule" element={<Schedule />} />

            {/* Fixed: real components */}
            
            <Route path="profile" element={<Profile />} />
           

            {/* Optional placeholders you can flesh out later */}
            <Route path="schedule" element={<div>Schedule Page - Coming Soon</div>} />
            <Route path="progress" element={<div>Progress Page - Coming Soon</div>} />
            <Route path="attendance" element={<div>Progress Page - Coming Soon</div>} />
            <Route path="poe" element={<div>Progress Page - Coming Soon</div>} />
               <Route path="finance" element={<div>Progress Page - Coming Soon</div>} />
            <Route path="course-plan" element={<div>Course Plan Page - Coming Soon</div>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DevRoleSwitcher />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
