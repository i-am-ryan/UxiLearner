// Main layout component for UXi Education LMS
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Breadcrumbs } from './Breadcrumbs';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface LayoutProps {
  className?: string;
}

export function Layout({ className }: LayoutProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FB]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={cn('min-h-screen bg-[#F6F8FB] flex', className)}>
      {/* Fixed Full-Height Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-[#0B1220] text-white h-screen overflow-y-auto z-50">
        <Sidebar />
      </aside>
      
      {/* Main Content with Left Margin */}
      <main className="ml-72 min-h-screen bg-[#F6F8FB] flex-1 flex flex-col">
        <TopBar />
        <div className="px-6 py-4">
          <Breadcrumbs />
        </div>
        <div className="flex-1 px-6 pb-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Development only - Role switcher
export function DevRoleSwitcher() {
  // Development mode switcher is now hidden
  return null;
}