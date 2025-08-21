// Sidebar navigation component for UXi Education LMS
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import {
  Home,
  BookOpen,
  Calendar,
  BarChart3,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ClipboardList,
  Library,
  CreditCard,
  User,
  FolderOpen,
  School,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const studentNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Competencies', href: '/competencies', icon: School },
  { name: 'Homeworks', href: '/homeworks', icon: ClipboardList },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Progress Report', href: '/progress', icon: BarChart3 },
  { name: 'Attendance', href: '/attendance', icon: Users },
  { name: 'Libraries', href: '/libraries', icon: Library },
  { name: 'Finance', href: '/finance', icon: CreditCard },
  { name: 'My Profile', href: '/profile', icon: User },
  { name: 'Portfolio of Evidence', href: '/poe', icon: FolderOpen },
];

const adminNavItems = [
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Portfolio of Evidence', href: '/admin/poe', icon: FolderOpen },
  { name: 'Assessments', href: '/admin/assessments', icon: ClipboardList },
  { name: 'Progress Reports', href: '/admin/progress', icon: BarChart3 },
  { name: 'Attendance', href: '/admin/attendance', icon: Calendar },
  { name: 'Course Plan', href: '/admin/courses', icon: GraduationCap },
  { name: 'Finance', href: '/admin/finance', icon: CreditCard },
  { name: 'Competencies', href: '/admin/competencies', icon: BookOpen },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn('flex flex-col h-full bg-[#0B1220] text-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/UXI.PNG" 
            alt="UXi Education" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-lg font-bold text-white">
              UXi Education
            </h1>
            <p className="text-xs text-white/60">Learning Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {user?.role === 'student' && (
          <>
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                ACADEMIC
              </h3>
              <div className="space-y-1">
                {navItems.slice(0, 8).map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                ADMINISTRATIVE
              </h3>
              <div className="space-y-1">
                {navItems.slice(8, 10).map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                SETTINGS
              </h3>
              <div className="space-y-1">
                {navItems.slice(10).map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isActive={isActive(item.href)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {user?.role === 'admin' && (
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={isActive(item.href)}
              />
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  isActive: boolean;
}

function NavItem({ item, isActive }: NavItemProps) {
  const { icon: Icon } = item;

  return (
    <Link
      to={item.href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200',
        'hover:bg-white/10',
        isActive
          ? 'bg-white/10 text-white font-medium'
          : 'text-white/90 hover:text-white'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{item.name}</span>
    </Link>
  );
}