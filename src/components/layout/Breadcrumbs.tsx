// Breadcrumbs navigation component
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    '': 'Dashboard',
    'dashboard': 'Dashboard',
    'competencies': 'Competencies',
    'homeworks': 'Homeworks',
    'schedule': 'Schedule',
    'progress': 'Progress Report',
    'attendance': 'Attendance',
    'course-plan': 'Course Plan',
    'libraries': 'Libraries',
    'finance': 'Finance',
    'profile': 'My Profile',
    'poe': 'Portfolio of Evidence',
    'admin': 'Admin',
    'students': 'Students',
    'assessments': 'Assessments',
    'courses': 'Courses',
    'batches': 'Batches',
    'analytics': 'Analytics'
  };

  if (pathnames.length === 0) {
    return (
      <nav className={cn('flex items-center space-x-2 text-sm text-muted-foreground', className)}>
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
      </nav>
    );
  }

  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      <Link
        to="/"
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbName = breadcrumbNameMap[pathname] || pathname;

        return (
          <div key={pathname} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{breadcrumbName}</span>
            ) : (
              <Link
                to={routeTo}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {breadcrumbName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}