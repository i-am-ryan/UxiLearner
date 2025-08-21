// Student Dashboard for UXi Education LMS
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/ui/stats-card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { StudentSnapshot } from '@/components/StudentSnapshot';
import { InteractiveCalendar } from "@/components/InteractiveCalendar";

import { HomeworkCards } from '@/components/HomeworkCards';
import { useAuth } from '@/lib/auth';
import { mockAPI, mockCalendarEvents } from '@/lib/mock-data';
import {
  BookOpen,
  ClipboardList,
  BarChart3,
  Users,
  FolderOpen,
  Clock,
  MapPin
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [currentDate] = useState(new Date());
  const [nextEvent, setNextEvent] = useState<any>(null);

  useEffect(() => {
    // Find next upcoming event
    const upcoming = mockCalendarEvents
      .filter(event => event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
    setNextEvent(upcoming);
  }, []);

  const progressPercentage = (34 / 36) * 100;

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-xl text-muted-foreground">Welcome back, {user?.name}! 🎓</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Attendance"
            value="94%"
            icon={Users}
            description="This month"
            variant="success"
            trend={{ value: 2, label: "vs last month", isPositive: true }}
          />
          <StatsCard
            title="Competencies"
            value="34/36"
            icon={BookOpen}
            description="Completed"
            variant="info"
          />
          <StatsCard
            title="Remaining"
            value="2"
            icon={Clock}
            description="Assessments"
            variant="warning"
          />
          <StatsCard
            title="Progress"
            value="94%"
            icon={BarChart3}
            description="Overall completion"
            variant="success"
          />
        </div>
      </div>

      {/* Student Snapshot */}
      <StudentSnapshot />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Summary */}
          <Card className="card-elevated glow-on-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {/* NAVY icon */}
                <BarChart3 className="h-5 w-5 text-[var(--uxi-navy)]" />
                <span>Academic Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Competency</span>
                      <span className="text-sm text-muted-foreground">34 of 36 assessments</span>
                    </div>
                    {/* Force inner bar to navy */}
                    <Progress value={progressPercentage} className="h-3 [&>div]:bg-[var(--uxi-navy)]" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {progressPercentage.toFixed(0)}% Complete - Excellent progress! 🌟
                    </p>
                  </div>
                </div>
                <div className="ml-8">
                  <ProgressRing progress={progressPercentage} size={100} color="success" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Event */}
          {nextEvent && (
            <Card className="border-l-4 border-l-[var(--uxi-navy)]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[var(--uxi-navy)]" />
                  <span>Next Event</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{nextEvent.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{nextEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{nextEvent.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
         <Card>
  <CardHeader>
    <CardTitle>Quick Actions</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Filled navy */}
      <Button
        asChild
        className="group justify-start h-auto p-4
                   !bg-[#0B1220] !text-white !border-[#0B1220]
                   hover:!bg-[#0B1220]/90 focus-visible:ring-2 focus-visible:ring-[#0B1220]
                   transition-colors"
      >
        <Link to="/poe">
          <FolderOpen className="h-5 w-5 mr-3 text-white transition-colors" />
          <div className="text-left">
            <div className="font-medium text-white">View Portfolio of Evidence</div>
            <div className="text-xs text-white/80">Access your PoE documents</div>
          </div>
        </Link>
      </Button>

      {/* Outline navy */}
      <Button
        asChild
        variant="outline"
        className="group justify-start h-auto p-4
                   !border-[#0B1220] !text-[#0B1220]
                   hover:!bg-[#0B1220] hover:!text-white
                   focus-visible:ring-2 focus-visible:ring-[#0B1220]
                   transition-colors"
      >
        <Link to="/homeworks">
          <ClipboardList className="h-5 w-5 mr-3 text-[#0B1220] group-hover:text-white transition-colors" />
          <div className="text-left">
            <div className="font-medium">Submit Homework</div>
            <div className="text-xs opacity-80 group-hover:text-white/80">
              View pending assignments
            </div>
          </div>
        </Link>
      </Button>
    </div>
  </CardContent>
</Card>

          {/* Enhanced Homework Cards */}
          <HomeworkCards />
        </div>

        {/* Right Column - Interactive Calendar */}
        <div className="space-y-6">
          <InteractiveCalendar />
        </div>
      </div>
    </div>
  );
}
