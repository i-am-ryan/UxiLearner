import { useState } from 'react';
import { Upload, Eye, Download, Edit, Trash2, Plus, FileText, Image, Video, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const portfolioSections = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Basic personal and contact details',
    required: true,
    status: 'completed',
    progress: 100,
    artifacts: [
      { id: 1, name: 'Personal Details Form', type: 'document', uploadDate: '2024-01-15', status: 'approved' },
      { id: 2, name: 'Contact Information', type: 'document', uploadDate: '2024-01-15', status: 'approved' }
    ]
  },
  {
    id: 'academic-records',
    title: 'Academic Records',
    description: 'Educational qualifications and transcripts',
    required: true,
    status: 'completed',
    progress: 100,
    artifacts: [
      { id: 3, name: 'Matric Certificate', type: 'document', uploadDate: '2024-01-16', status: 'approved' },
      { id: 4, name: 'Previous Training Certificates', type: 'document', uploadDate: '2024-01-16', status: 'approved' }
    ]
  },
  {
    id: 'practical-work',
    title: 'Practical Work Evidence',
    description: 'Photos and videos of practical electrical work',
    required: true,
    status: 'in-progress',
    progress: 75,
    artifacts: [
      { id: 5, name: 'Circuit Installation Video', type: 'video', uploadDate: '2024-03-01', status: 'approved' },
      { id: 6, name: 'Safety Equipment Photos', type: 'image', uploadDate: '2024-03-05', status: 'pending' },
      { id: 7, name: 'Motor Control Wiring', type: 'image', uploadDate: '2024-03-10', status: 'pending' }
    ]
  },
  {
    id: 'assessments',
    title: 'Assessment Results',
    description: 'Test scores and assessment outcomes',
    required: true,
    status: 'in-progress',
    progress: 60,
    artifacts: [
      { id: 8, name: 'Circuit Analysis Test Results', type: 'document', uploadDate: '2024-02-20', status: 'approved' },
      { id: 9, name: 'Safety Assessment Score', type: 'document', uploadDate: '2024-03-01', status: 'approved' }
    ]
  },
  {
    id: 'workplace-learning',
    title: 'Workplace Learning',
    description: 'Evidence from workplace experiences and internships',
    required: true,
    status: 'pending',
    progress: 20,
    artifacts: [
      { id: 10, name: 'Workplace Learning Agreement', type: 'document', uploadDate: '2024-03-15', status: 'pending' }
    ]
  },
  {
    id: 'reflective-journal',
    title: 'Reflective Journal',
    description: 'Personal reflections on learning experiences',
    required: false,
    status: 'in-progress',
    progress: 40,
    artifacts: [
      { id: 11, name: 'Weekly Reflection - Week 1', type: 'document', uploadDate: '2024-02-01', status: 'approved' },
      { id: 12, name: 'Weekly Reflection - Week 2', type: 'document', uploadDate: '2024-02-08', status: 'approved' }
    ]
  },
  {
    id: 'competency-evidence',
    title: 'Competency Evidence',
    description: 'Evidence demonstrating specific competencies achieved',
    required: true,
    status: 'in-progress',
    progress: 65,
    artifacts: [
      { id: 13, name: 'KM-01 Competency Evidence', type: 'document', uploadDate: '2024-02-15', status: 'approved' },
      { id: 14, name: 'KM-03 Practical Evidence', type: 'video', uploadDate: '2024-03-01', status: 'pending' }
    ]
  },
  {
    id: 'industry-projects',
    title: 'Industry Projects',
    description: 'Real-world projects and case studies',
    required: false,
    status: 'not-started',
    progress: 0,
    artifacts: []
  }
];

const statusConfig = {
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  'pending': { label: 'Pending Review', color: 'bg-blue-100 text-blue-700', icon: Eye },
  'not-started': { label: 'Not Started', color: 'bg-gray-100 text-gray-700', icon: AlertCircle }
};

const artifactStatusConfig = {
  'approved': { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  'pending': { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  'rejected': { label: 'Needs Revision', color: 'bg-red-100 text-red-700', icon: AlertCircle }
};

const typeIcons = {
  document: FileText,
  image: Image,
  video: Video
};

export default function Portfolio() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const overallProgress = Math.round(
    portfolioSections.reduce((sum, section) => sum + section.progress, 0) / portfolioSections.length
  );

  const completedSections = portfolioSections.filter(s => s.status === 'completed').length;
  const totalSections = portfolioSections.length;

  const handleUploadFile = () => {
    // Simulate file upload
    setIsUploadDialogOpen(false);
    alert('File uploaded successfully!');
  };

  const handleDownloadPortfolio = () => {
    // Simulate portfolio download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'portfolio_of_evidence.pdf';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Portfolio of Evidence</h1>
            <p className="text-slate-600">Document your learning journey and competency achievements</p>
          </div>
          <Button 
            onClick={handleDownloadPortfolio}
            className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Portfolio
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overall Progress</p>
                <p className="text-2xl font-bold text-[#0B1220]">{overallProgress}%</p>
              </div>
              <Star className="h-8 w-8 text-[#0B1220]" />
            </div>
            <Progress value={overallProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Sections Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedSections}/{totalSections}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              {totalSections - completedSections} remaining
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Artifacts</p>
                <p className="text-2xl font-bold text-slate-900">
                  {portfolioSections.reduce((sum, section) => sum + section.artifacts.length, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-slate-600" />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              Evidence items uploaded
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Alert */}
      {overallProgress < 80 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your portfolio is {overallProgress}% complete. Ensure all required sections are completed before the assessment deadline.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Sections */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioSections.map(section => {
                  const status = statusConfig[section.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;

                  return (
                    <div 
                      key={section.id}
                      className={`p-4 border border-slate-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                        selectedSection === section.id ? 'ring-2 ring-[#0B1220]' : ''
                      }`}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-900">{section.title}</h4>
                            {section.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{section.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${status.color}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {section.artifacts.length} artifacts
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-900 mb-1">
                            {section.progress}%
                          </div>
                          <Progress value={section.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Detail */}
        <div className="lg:col-span-1">
          {selectedSection ? (
            <div className="sticky top-6">
              {(() => {
                const section = portfolioSections.find(s => s.id === selectedSection)!;
                const status = statusConfig[section.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <Badge className={`text-xs ${status.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                        <p className="text-sm text-slate-600">{section.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Progress</h4>
                        <Progress value={section.progress} className="mb-2" />
                        <div className="flex justify-between text-sm text-slate-500">
                          <span>{section.progress}% Complete</span>
                          <span>{section.required ? 'Required' : 'Optional'}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-900">Artifacts ({section.artifacts.length})</h4>
                          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload Artifact</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="title">Title</Label>
                                  <Input id="title" placeholder="Artifact title" />
                                </div>
                                <div>
                                  <Label htmlFor="description">Description</Label>
                                  <Textarea id="description" placeholder="Brief description" />
                                </div>
                                <div>
                                  <Label htmlFor="file">File</Label>
                                  <Input id="file" type="file" />
                                </div>
                                <Button 
                                  onClick={handleUploadFile}
                                  className="w-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload Artifact
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        
                        {section.artifacts.length === 0 ? (
                          <div className="text-center py-6 text-slate-500">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                            <p className="text-sm">No artifacts uploaded yet</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.artifacts.map(artifact => {
                              const artifactStatus = artifactStatusConfig[artifact.status as keyof typeof artifactStatusConfig];
                              const TypeIcon = typeIcons[artifact.type as keyof typeof typeIcons];

                              return (
                                <div key={artifact.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                  <div className="flex items-center gap-2 flex-1">
                                    <TypeIcon className="h-4 w-4 text-slate-500" />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-medium text-slate-900 truncate">
                                        {artifact.name}
                                      </div>
                                      <div className="text-xs text-slate-500">
                                        {new Date(artifact.uploadDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-1">
                                    <Badge className={`text-xs ${artifactStatus.color}`}>
                                      {artifactStatus.label}
                                    </Badge>
                                    <div className="flex gap-1">
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="pt-4">
                        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload New Artifact
                            </Button>
                          </DialogTrigger>
                        </Dialog>
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
                <p className="text-slate-600">Select a portfolio section to view details and manage artifacts</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}