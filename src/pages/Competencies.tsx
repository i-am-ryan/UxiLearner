// Competencies page showing assessment progress
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { StatusChip } from '@/components/ui/status-chip';
import { Badge } from '@/components/ui/badge';
import { mockAPI } from '@/lib/mock-data';
import { Assessment } from '@/lib/types';

export default function Competencies() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const response = await mockAPI.assessments.getAll();
        if (response.success) {
          setAssessments(response.data);
        }
      } catch (error) {
        console.error('Failed to load assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssessments();
  }, []);

  const columns = [
    {
      key: 'title' as keyof Assessment,
      header: 'Assessment Name',
      sortable: true,
    },
    {
      key: 'date' as keyof Assessment,
      header: 'Date',
      sortable: true,
      render: (value: Date) => value.toLocaleDateString(),
    },
    {
      key: 'course' as keyof Assessment,
      header: 'Course',
      sortable: true,
    },
    {
      key: 'time' as keyof Assessment,
      header: 'Time',
    },
    {
      key: 'location' as keyof Assessment,
      header: 'Location',
    },
    {
      key: 'status' as keyof Assessment,
      header: 'Status',
      render: (value: string) => <StatusChip status={value as any} />,
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competencies</h1>
          <p className="text-muted-foreground mt-1">Track your assessment progress</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Competent in 34 of 36 assessments
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable
            data={assessments}
            columns={columns}
            searchable={true}
            filterable={true}
            exportable={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}