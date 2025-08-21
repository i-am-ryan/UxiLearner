import { useState } from 'react';
import { Clock, FileText, CheckCircle, AlertCircle, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const homework = [
  {
    id: 1,
    title: 'Electrical Safety Analysis Report',
    description: 'Analyze workplace safety protocols and write a comprehensive report on electrical safety measures.',
    course: 'KM-01',
    courseName: 'Safety, Health, and Environmental',
    dueDate: new Date('2024-03-25'),
    status: 'not-submitted',
    priority: 'high',
    estimatedTime: '3 hours',
    instructions: 'Complete a detailed analysis of electrical safety protocols in industrial environments.',
    attachments: ['safety_guidelines.pdf', 'report_template.docx']
  },
  {
    id: 2,
    title: 'Circuit Analysis Worksheet',
    description: 'Complete the circuit analysis problems focusing on AC and DC circuit calculations.',
    course: 'KM-03',
    courseName: 'Fundamentals of Electricity',
    dueDate: new Date('2024-03-28'),
    status: 'in-progress',
    priority: 'medium',
    estimatedTime: '2 hours',
    instructions: 'Solve all problems in the circuit analysis worksheet using proper calculation methods.',
    attachments: ['circuit_problems.pdf']
  },
  {
    id: 3,
    title: 'Material Properties Research',
    description: 'Research and compare different electrical materials and their applications.',
    course: 'KM-02',
    courseName: 'Electrical Installation Materials',
    dueDate: new Date('2024-04-02'),
    status: 'completed',
    priority: 'low',
    estimatedTime: '4 hours',
    instructions: 'Create a comparison chart of at least 10 different electrical materials.',
    attachments: ['material_guide.pdf', 'research_template.docx']
  },
  {
    id: 4,
    title: 'Motor Control System Design',
    description: 'Design a basic motor control system with safety interlocks and documentation.',
    course: 'KM-06',
    courseName: 'Motor Control Systems',
    dueDate: new Date('2024-04-05'),
    status: 'not-submitted',
    priority: 'high',
    estimatedTime: '5 hours',
    instructions: 'Design and document a complete motor control system including safety features.',
    attachments: ['design_specifications.pdf', 'cad_template.dwg']
  },
  {
    id: 5,
    title: 'Power Distribution Case Study',
    description: 'Analyze a real-world power distribution scenario and propose improvements.',
    course: 'KM-07',
    courseName: 'Power Systems and Distribution',
    dueDate: new Date('2024-04-08'),
    status: 'in-progress',
    priority: 'medium',
    estimatedTime: '3 hours',
    instructions: 'Study the provided case and write recommendations for system improvements.',
    attachments: ['case_study.pdf', 'analysis_template.docx']
  },
  {
    id: 6,
    title: 'Renewable Energy Project Proposal',
    description: 'Create a project proposal for implementing renewable energy in a commercial building.',
    course: 'KM-08',
    courseName: 'Renewable Energy Systems',
    dueDate: new Date('2024-04-12'),
    status: 'not-submitted',
    priority: 'medium',
    estimatedTime: '6 hours',
    instructions: 'Develop a comprehensive proposal including cost analysis and implementation timeline.',
    attachments: ['proposal_template.docx', 'cost_calculator.xlsx']
  }
];

const statusConfig = {
  'not-submitted': {
    label: 'Not Submitted',
    variant: 'destructive' as const,
    icon: AlertCircle,
    color: 'bg-red-100 text-red-700'
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'secondary' as const,
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700'
  },
  'completed': {
    label: 'Completed',
    variant: 'default' as const,
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700'
  }
};

const priorityConfig = {
  'high': { label: 'High Priority', color: 'bg-red-100 text-red-700' },
  'medium': { label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-700' },
  'low': { label: 'Low Priority', color: 'bg-green-100 text-green-700' }
};

export default function Homework() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedHomework, setSelectedHomework] = useState<number | null>(null);

  const getDaysUntilDue = (dueDate: Date): number => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDueChip = (dueDate: Date, status: string) => {
    if (status === 'completed') return null;
    
    const days = getDaysUntilDue(dueDate);
    if (days < 0) {
      return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
    } else if (days === 0) {
      return <Badge variant="destructive" className="text-xs">Due Today</Badge>;
    } else if (days <= 3) {
      return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">Due in {days} days</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Due in {days} days</Badge>;
  };

  const getProgressValue = (status: string): number => {
    switch (status) {
      case 'completed': return 100;
      case 'in-progress': return 50;
      default: return 0;
    }
  };

  const filteredHomework = homework.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDownloadAttachment = (filename: string) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    link.click();
  };

  const handleSubmitHomework = (id: number) => {
    // Simulate homework submission
    console.log(`Submitting homework ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Homework & Assignments</h1>
        <p className="text-slate-600">Manage your coursework and track submission deadlines</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search homework..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not-submitted">Not Submitted</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homework List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredHomework.map(item => {
            const status = statusConfig[item.status];
            const priority = priorityConfig[item.priority];
            
            return (
              <Card 
                key={item.id} 
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  selectedHomework === item.id ? 'ring-2 ring-[#0B1220]' : ''
                }`}
                onClick={() => setSelectedHomework(item.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.course}
                        </Badge>
                        <Badge className={`text-xs ${priority.color}`}>
                          {priority.label}
                        </Badge>
                        {getDueChip(item.dueDate, item.status)}
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#0B1220] transition-colors">
                        {item.title}
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">{item.courseName}</p>
                    </div>
                    <status.icon className={`h-5 w-5 ${
                      item.status === 'completed' ? 'text-green-500' :
                      item.status === 'in-progress' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {item.dueDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.estimatedTime}</span>
                        </div>
                      </div>
                      <Badge className={`text-xs ${status.color}`}>
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{getProgressValue(item.status)}%</span>
                      </div>
                      <Progress value={getProgressValue(item.status)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Homework Detail */}
        <div className="lg:col-span-1">
          {selectedHomework ? (
            <div className="sticky top-6">
              {(() => {
                const item = homework.find(h => h.id === selectedHomework)!;
                const status = statusConfig[item.status];
                
                return (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge className={`w-fit text-xs ${status.color}`}>
                        {status.label}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Instructions</h4>
                        <p className="text-sm text-slate-600">{item.instructions}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Course Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Course:</span>
                            <span className="text-slate-900">{item.course}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Due Date:</span>
                            <span className="text-slate-900">{item.dueDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Estimated Time:</span>
                            <span className="text-slate-900">{item.estimatedTime}</span>
                          </div>
                        </div>
                      </div>

                      {item.attachments.length > 0 && (
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {item.attachments.map((filename, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadAttachment(filename)}
                                className="w-full justify-start text-xs"
                              >
                                <FileText className="mr-2 h-3 w-3" />
                                {filename}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 space-y-2">
                        {item.status !== 'completed' && (
                          <>
                            <Button 
                              className="w-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                              onClick={() => handleSubmitHomework(item.id)}
                            >
                              {item.status === 'in-progress' ? 'Continue Work' : 'Start Assignment'}
                            </Button>
                            {item.status === 'in-progress' && (
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleSubmitHomework(item.id)}
                              >
                                Submit Assignment
                              </Button>
                            )}
                          </>
                        )}
                        {item.status === 'completed' && (
                          <Button variant="outline" className="w-full">
                            View Submission
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a homework assignment to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {filteredHomework.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No homework found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}