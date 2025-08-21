// Status chip component for assessment and homework statuses
import { cn } from '@/lib/utils';

interface StatusChipProps {
  status: 'competent' | 'in-progress' | 'not-submitted' | 'completed' | 'pending';
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'competent':
      case 'completed':
        return 'status-competent';
      case 'in-progress':
      case 'pending':
        return 'status-progress';
      case 'not-submitted':
        return 'status-not-submitted';
      default:
        return 'status-progress';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'competent':
        return 'Competent';
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-submitted':
        return 'Not Submitted';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <span className={cn('status-chip', getStatusStyles(status), className)}>
      {getStatusText(status)}
    </span>
  );
}