import { useState } from 'react';
import { TrendingUp, Calendar, Award, Target, Download, BarChart3, PieChart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const studentInfo = {
  name: 'Macy Fisher',
  studentId: '2021426861',
  intake: 'Elec_May_2021',
  qualification: 'Electrician Year 1',
  qualificationId: '90973',
  curriculumCode: '734101001',
  occupationalCertificate: 'Electrician',
  academicYear: 'Year 3 (Elec_May_2021)',
  campus: 'Johannesburg'
};

const progressData = {
  overall: {
    completionRate: 65,
    coursesCompleted: 13,
    totalCourses: 20,
    creditsEarned: 156,
    totalCredits: 240,
    gpa: 3.7,
    rank: 8,
    totalStudents: 45
  },
  courses: [
    {
      code: 'KM-01',
      name: 'Safety, Health, and Environmental',
      progress: 100,
      grade: 'A',
      credits: 15,
      status: 'completed',
      lastActivity: '2024-02-15'
    },
    {
      code: 'KM-02',
      name: 'Electrical Installation Materials',
      progress: 95,
      grade: 'A-',
      credits: 12,
      status: 'completed',
      lastActivity: '2024-02-28'
    },
    {
      code: 'KM-03',
      name: 'Fundamentals of Electricity',
      progress: 85,
      grade: 'B+',
      credits: 18,
      status: 'in-progress',
      lastActivity: '2024-03-15'
    },
    {
      code: 'KM-04',
      name: 'The Electricians world of work',
      progress: 20,
      grade: 'In Progress',
      credits: 10,
      status: 'in-progress',
      lastActivity: '2024-03-18'
    },
    {
      code: 'KM-05',
      name: 'Electrical Circuit Analysis',
      progress: 0,
      grade: 'Not Started',
      credits: 20,
      status: 'not-started',
      lastActivity: null
    },
    {
      code: 'KM-06',
      name: 'Motor Control Systems',
      progress: 75,
      grade: 'B',
      credits: 16,
      status: 'in-progress',
      lastActivity: '2024-03-10'
    },
    {
      code: 'KM-07',
      name: 'Power Systems and Distribution',
      progress: 60,
      grade: 'B-',
      credits: 22,
      status: 'in-progress',
      lastActivity: '2024-03-12'
    },
    {
      code: 'KM-08',
      name: 'Renewable Energy Systems',
      progress: 40,
      grade: 'C+',
      credits: 14,
      status: 'in-progress',
      lastActivity: '2024-03-08'
    }
  ],
  competencies: [
    { name: 'Electrical Safety', progress: 100, status: 'achieved' },
    { name: 'Circuit Analysis', progress: 85, status: 'in-progress' },
    { name: 'Installation Techniques', progress: 90, status: 'achieved' },
    { name: 'Motor Control', progress: 70, status: 'in-progress' },
    { name: 'Power Systems', progress: 55, status: 'in-progress' },
    { name: 'Renewable Energy', progress: 30, status: 'developing' },
    { name: 'Building Automation', progress: 15, status: 'developing' },
    { name: 'Project Management', progress: 25, status: 'developing' }
  ],
  assessments: [
    { module: 'KM-01', assessment: 'Safety Assessment 1', score: 92, maxScore: 100, date: '2024-01-20' },
    { module: 'KM-01', assessment: 'Safety Assessment 2', score: 88, maxScore: 100, date: '2024-02-10' },
    { module: 'KM-02', assessment: 'Materials Test', score: 85, maxScore: 100, date: '2024-02-25' },
    { module: 'KM-03', assessment: 'Circuit Analysis', score: 78, maxScore: 100, date: '2024-03-05' },
    { module: 'KM-06', assessment: 'Motor Control Practical', score: 82, maxScore: 100, date: '2024-03-12' }
  ]
};

const statusConfig = {
  completed: { color: 'bg-green-100 text-green-700', label: 'Completed' },
  'in-progress': { color: 'bg-yellow-100 text-yellow-700', label: 'In Progress' },
  'not-started': { color: 'bg-gray-100 text-gray-700', label: 'Not Started' }
};

const competencyStatusConfig = {
  achieved: { color: 'bg-green-100 text-green-700', label: 'Achieved' },
  'in-progress': { color: 'bg-yellow-100 text-yellow-700', label: 'In Progress' },
  developing: { color: 'bg-blue-100 text-blue-700', label: 'Developing' }
};

export default function Progress() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-year');

  const handleDownloadReport = () => {
    // Simulate progress report download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `progress_report_${studentInfo.studentId}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Academic Progress Report</h1>
            <p className="text-slate-600">Track your learning progress and academic achievements</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="current-semester">Current Semester</SelectItem>
                <SelectItem value="current-year">Current Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleDownloadReport}
              className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>

      {/* Student Information Card */}
      <Card className="bg-gradient-to-r from-[#0B1220] to-slate-800 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Student Information</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-white/70">Name:</span> <span className="text-white font-medium">{studentInfo.name}</span></div>
                <div><span className="text-white/70">Student ID:</span> <span className="text-white font-medium">{studentInfo.studentId}</span></div>
                <div><span className="text-white/70">Campus:</span> <span className="text-white font-medium">{studentInfo.campus}</span></div>
                <div><span className="text-white/70">Intake:</span> <span className="text-white font-medium">{studentInfo.intake}</span></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Qualification Details</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-white/70">Title:</span> <span className="text-white font-medium">{studentInfo.qualification}</span></div>
                <div><span className="text-white/70">Qualification ID:</span> <span className="text-white font-medium">{studentInfo.qualificationId}</span></div>
                <div><span className="text-white/70">Curriculum Code:</span> <span className="text-white font-medium">{studentInfo.curriculumCode}</span></div>
                <div><span className="text-white/70">Certificate:</span> <span className="text-white font-medium">{studentInfo.occupationalCertificate}</span></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Academic Standing</h3>
              <div className="space-y-1 text-sm">
                <div><span className="text-white/70">Year:</span> <span className="text-white font-medium">{studentInfo.academicYear}</span></div>
                <div><span className="text-white/70">GPA:</span> <span className="text-white font-medium">{progressData.overall.gpa}/4.0</span></div>
                <div><span className="text-white/70">Class Rank:</span> <span className="text-white font-medium">{progressData.overall.rank}/{progressData.overall.totalStudents}</span></div>
                <div><span className="text-white/70">Completion:</span> <span className="text-white font-medium">{progressData.overall.completionRate}%</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overall Progress</p>
                <p className="text-2xl font-bold text-[#0B1220]">{progressData.overall.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#0B1220]" />
            </div>
            <ProgressBar value={progressData.overall.completionRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Courses Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {progressData.overall.coursesCompleted}/{progressData.overall.totalCourses}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              {progressData.overall.totalCourses - progressData.overall.coursesCompleted} remaining
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Credits Earned</p>
                <p className="text-2xl font-bold text-blue-600">
                  {progressData.overall.creditsEarned}/{progressData.overall.totalCredits}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <ProgressBar 
              value={(progressData.overall.creditsEarned / progressData.overall.totalCredits) * 100} 
              className="mt-3 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Class Ranking</p>
                <p className="text-2xl font-bold text-purple-600">
                  #{progressData.overall.rank}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              out of {progressData.overall.totalStudents} students
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
          <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.courses.map(course => {
                  const status = statusConfig[course.status as keyof typeof statusConfig];
                  
                  return (
                    <div key={course.code} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">{course.code}</Badge>
                          <h4 className="font-medium text-slate-900">{course.name}</h4>
                          <Badge className={`text-xs ${status.color}`}>
                            {status.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                          <div>Credits: {course.credits}</div>
                          <div>Grade: <span className="font-medium text-slate-900">{course.grade}</span></div>
                          {course.lastActivity && (
                            <div>Last Activity: {new Date(course.lastActivity).toLocaleDateString()}</div>
                          )}
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <ProgressBar value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competency Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {progressData.competencies.map((competency, index) => {
                  const status = competencyStatusConfig[competency.status as keyof typeof competencyStatusConfig];
                  
                  return (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{competency.name}</h4>
                        <Badge className={`text-xs ${status.color}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">{competency.progress}%</span>
                        </div>
                        <ProgressBar value={competency.progress} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.assessments.map((assessment, index) => {
                  const percentage = Math.round((assessment.score / assessment.maxScore) * 100);
                  const gradeColor = percentage >= 80 ? 'text-green-600' : 
                                   percentage >= 70 ? 'text-yellow-600' : 
                                   percentage >= 60 ? 'text-orange-600' : 'text-red-600';
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <Badge variant="outline" className="text-xs">{assessment.module}</Badge>
                          <h4 className="font-medium text-slate-900">{assessment.assessment}</h4>
                        </div>
                        <div className="text-sm text-slate-500">
                          Date: {new Date(assessment.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${gradeColor}`}>
                          {assessment.score}/{assessment.maxScore}
                        </div>
                        <div className={`text-sm font-medium ${gradeColor}`}>
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {Math.round(progressData.assessments.reduce((sum, a) => sum + (a.score / a.maxScore * 100), 0) / progressData.assessments.length)}%
                    </div>
                    <div className="text-sm text-slate-600">Average Score</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {Math.max(...progressData.assessments.map(a => Math.round(a.score / a.maxScore * 100)))}%
                    </div>
                    <div className="text-sm text-slate-600">Highest Score</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {progressData.assessments.length}
                    </div>
                    <div className="text-sm text-slate-600">Assessments Taken</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}