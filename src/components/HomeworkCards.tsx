import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockHomework } from '@/lib/mock-data';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { differenceInDays, format } from 'date-fns';

const NAVY = '#0B1220';

const statusConfig = {
  'not-submitted': {
    label: 'Not Submitted',
    // keep red to signal risk; everything else is navy
    variant: 'destructive' as const,
    icon: AlertCircle,
    iconClass: 'text-rose-600',
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'outline' as const,
    icon: PlayCircle,
    iconClass: 'text-[#0B1220]',
  },
  'completed': {
    label: 'Completed',
    variant: 'default' as const,
    icon: CheckCircle,
    iconClass: 'text-white',
  },
};

// simple navy code pill to avoid the old reddish Badge style
function CodePill({ code }: { code?: string }) {
  if (!code) return null;
  return (
    <span
      className="inline-flex items-center rounded-full
                 border border-[#0B1220]/20 bg-white/90
                 px-2 py-0.5 text-[11px] font-medium text-[#0B1220]
                 shadow-sm"
    >
      {code}
    </span>
  );
}

export function HomeworkCards() {
  const getDaysUntilDue = (dueDate: Date) => {
    return differenceInDays(dueDate, new Date());
  };

  const getDueChip = (dueDate: Date, status: string) => {
    if (status === 'completed') return null;

    const days = getDaysUntilDue(dueDate);

    if (days < 0) {
      return (
        <Badge variant="destructive" className="text-xs">
          Overdue
        </Badge>
      );
    } else if (days === 0) {
      return (
        <Badge className="text-xs bg-[#0B1220] text-white">Due Today</Badge>
      );
    } else if (days <= 3) {
      return (
        <Badge
          variant="outline"
          className="text-xs border-[#0B1220] text-[#0B1220]"
        >
          Due in {days} day{days !== 1 ? 's' : ''}
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="text-xs border-[#0B1220]/30 text-[#0B1220]"
        >
          Due in {days} days
        </Badge>
      );
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'completed':
        return 100;
      case 'in-progress':
        return 50;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Homework</h3>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-[#0B1220] hover:bg-[#0B1220]/90 hover:text-white"
        >
          <Link to="/homeworks" className="flex items-center gap-1">
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockHomework.slice(0, 4).map((hw) => {
          const cfg = statusConfig[hw.status as keyof typeof statusConfig];
          const StatusIcon = cfg.icon;
          const dueChip = getDueChip(hw.dueDate, hw.status);
          const progress = getProgressValue(hw.status);

          return (
            <Card
              key={hw.id}
              className="group relative overflow-hidden cursor-pointer rounded-2xl
                         border border-slate-200 bg-white p-0 shadow-sm
                         transition-all duration-300
                         hover:-translate-y-[2px] hover:shadow-lg hover:border-[#0B1220]/25"
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${cfg.iconClass}`} />
                    {hw.status === 'completed' ? (
                      <span className="inline-flex items-center rounded-full bg-[#0B1220] px-2 py-0.5 text-xs font-medium text-white">
                        {cfg.label}
                      </span>
                    ) : hw.status === 'in-progress' ? (
                      <span className="inline-flex items-center rounded-full border border-[#0B1220] px-2 py-0.5 text-xs font-medium text-[#0B1220]">
                        {cfg.label}
                      </span>
                    ) : (
                      <Badge variant={cfg.variant} className="text-xs font-medium">
                        {cfg.label}
                      </Badge>
                    )}
                  </div>
                  {/* due chip on the right */}
                  <div className="shrink-0">{dueChip}</div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground transition-colors group-hover:text-[#0B1220]">
                      {hw.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {hw.description}
                    </p>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Due: {format(hw.dueDate, 'MMM d, yyyy')}</span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    {/* force inner bar navy */}
                    <Progress value={progress} className="h-2 [&>div]:bg-[#0B1220]" />
                  </div>

                  {/* Actions (hover) */}
                  <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs border-[#0B1220] text-[#0B1220] hover:bg-[#0B1220] hover:text-white"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Open
                    </Button>
                    {hw.status !== 'completed' && (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-[#0B1220] text-white hover:bg-[#0B1220]/90"
                      >
                        <PlayCircle className="mr-1 h-3 w-3" />
                        {hw.status === 'in-progress' ? 'Continue' : 'Start'}
                      </Button>
                    )}
                    {hw.status === 'in-progress' && (
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1 h-8 text-xs bg-[#0B1220] text-white hover:bg-[#0B1220]/90"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>

                {/* Course Code — moved to bottom-right to avoid overlap */}
                {hw.code && (
                  <div className="absolute bottom-3 right-3">
                    <CodePill code={hw.code} />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
