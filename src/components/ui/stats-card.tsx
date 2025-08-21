import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  variant = 'default'
}: StatsCardProps) {
  const variants = {
    default: 'border-primary/20 bg-gradient-to-br from-white to-primary/5',
    success: 'border-success/20 bg-gradient-to-br from-white to-success/5',
    warning: 'border-warning/20 bg-gradient-to-br from-white to-warning/5',
    info: 'border-info/20 bg-gradient-to-br from-white to-info/5'
  };

  const iconVariants = {
    default: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10'
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-slate-700 hover:border-slate-700',
        variants[variant],
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-white/80">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold tracking-tight transition-colors group-hover:text-white">
                {value}
              </h3>
              {trend && (
                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    trend.isPositive
                      ? 'text-success group-hover:text-emerald-300'
                      : 'text-destructive group-hover:text-rose-300'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}% {trend.label}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                {description}
              </p>
            )}
          </div>
          <div
            className={cn(
              'p-3 rounded-xl transition-transform duration-200 group-hover:scale-110 transition-colors group-hover:bg-white/15 group-hover:text-white',
              iconVariants[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}