import { useState } from 'react';
import { Calendar, Check, X, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const attendanceData = [
  {
    date: '2024-03-18',
    sessions: [
      { id: 1, subject: 'Electrical Safety Analysis', course: 'KM-01', time: '08:00-09:30', status: 'present', instructor: 'Prof. Smith' },
      { id: 2, subject: 'Circuit Analysis Lab', course: 'KM-03', time: '10:00-11:30', status: 'present', instructor: 'Dr. Johnson' },
      { id: 3, subject: 'Motor Control Systems', course: 'KM-06', time: '14:00-15:30', status: 'absent', instructor: 'Eng. Davis' }
    ]
  },
  {
    date: '2024-03-17',
    sessions: [
      { id: 4, subject: 'Power Systems Theory', course: 'KM-07', time: '09:00-10:30', status: 'present', instructor: 'Prof. Wilson' },
      { id: 5, subject: 'Renewable Energy Workshop', course: 'KM-08', time: '11:00-12:30', status: 'late', instructor: 'Dr. Brown' }
    ]
  },
  {
    date: '2024-03-16',
    sessions: [
      { id: 6, subject: 'Electrical Materials Study', course: 'KM-02', time: '08:30-10:00', status: 'present', instructor: 'Eng. Taylor' },
      { id: 7, subject: 'Building Management Systems', course: 'KM-09', time: '10:30-12:00', status: 'present', instructor: 'Prof. Anderson' },
      { id: 8, subject: 'Assessment Review', course: 'All', time: '14:00-16:00', status: 'present', instructor: 'Academic Team' }
    ]
  },
  {
    date: '2024-03-15',
    sessions: [
      { id: 9, subject: 'Safety Protocols Training', course: 'KM-01', time: '09:00-10:30', status: 'present', instructor: 'Safety Officer' },
      { id: 10, subject: 'Electrical Calculations', course: 'KM-03', time: '11:00-12:30', status: 'absent', instructor: 'Prof. Smith' }
    ]
  },
  {
    date: '2024-03-14',
    sessions: [
      { id: 11, subject: 'Weekly Progress Review', course: 'All', time: '08:00-09:30', status: 'present', instructor: 'Course Coordinator' },
      { id: 12, subject: 'Industry Standards', course: 'KM-04', time: '10:00-12:00', status: 'present', instructor: 'Industry Expert' }
    ]
  }
];

const statusConfig = {
  present: { label: 'Present', color: 'bg-green-100 text-green-700', icon: Check },
  absent: { label: 'Absent', color: 'bg-red-100 text-red-700', icon: X },
  late: { label: 'Late', color: 'bg-yellow-100 text-yellow-700', icon: Clock }
};

export default function Attendance() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  
  const calculateStats = () => {
    const allSessions = attendanceData.flatMap(day => day.sessions);
    const totalSessions = allSessions.length;
    const presentSessions = allSessions.filter(s => s.status === 'present').length;
    const lateSessions = allSessions.filter(s => s.status === 'late').length;
    const absentSessions = allSessions.filter(s => s.status === 'absent').length;
    
    const attendanceRate = Math.round(((presentSessions + lateSessions) / totalSessions) * 100);
    const punctualityRate = Math.round((presentSessions / totalSessions) * 100);
    
    return {
      totalSessions,
      presentSessions,
      lateSessions,
      absentSessions,
      attendanceRate,
      punctualityRate
    };
  };

  const stats = calculateStats();

  const getCourseAttendance = () => {
    const courseStats: Record<string, { present: number; total: number }> = {};
    
    attendanceData.forEach(day => {
      day.sessions.forEach(session => {
        if (!courseStats[session.course]) {
          courseStats[session.course] = { present: 0, total: 0 };
        }
        courseStats[session.course].total++;
        if (session.status === 'present' || session.status === 'late') {
          courseStats[session.course].present++;
        }
      });
    });

    return Object.entries(courseStats).map(([course, data]) => ({
      course,
      rate: Math.round((data.present / data.total) * 100),
      present: data.present,
      total: data.total
    }));
  };

  const courseAttendance = getCourseAttendance();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Attendance Record</h1>
            <p className="text-slate-600">Track your class attendance and punctuality</p>
          </div>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-week">Current Week</SelectItem>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-[#0B1220]">{stats.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#0B1220]" />
            </div>
            <Progress value={stats.attendanceRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Punctuality Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.punctualityRate}%</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={stats.punctualityRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Sessions</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-slate-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              {stats.presentSessions} present, {stats.absentSessions} absent
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Absent Sessions</p>
                <p className="text-2xl font-bold text-red-600">{stats.absentSessions}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              {stats.lateSessions} late arrivals
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Attendance Record */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((day) => (
                  <div key={day.date} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-900">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {day.sessions.length} sessions
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {day.sessions.map((session) => {
                        const status = statusConfig[session.status as keyof typeof statusConfig];
                        const StatusIcon = status.icon;
                        
                        return (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {session.course}
                                </Badge>
                                <span className="text-sm font-medium text-slate-900">
                                  {session.subject}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500">
                                {session.time} • {session.instructor}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${status.color}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course-wise Attendance */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseAttendance.map((course) => (
                  <div key={course.course} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {course.course}
                        </Badge>
                        <div className="text-sm text-slate-600">
                          {course.present}/{course.total} sessions
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#0B1220]">
                        {course.rate}%
                      </div>
                    </div>
                    <Progress value={course.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Guidelines */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Attendance Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">Minimum Requirement</div>
                    <div className="text-slate-600">80% attendance required for certification</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">Warning Level</div>
                    <div className="text-slate-600">Below 75% triggers academic warning</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <div>
                    <div className="font-medium text-slate-900">Critical Level</div>
                    <div className="text-slate-600">Below 70% may result in course repeat</div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
              >
                Request Leave of Absence
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}