import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { mockStudent } from '@/lib/mock-data';
import { 
  Download, 
  User, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Home,
  CreditCard,
  BookOpen,
  Clock,
  Award
} from 'lucide-react';
import { StudentCard } from '@/components/StudentCard';

export default function Profile() {
  const { user } = useAuth();
  const [showStudentCard, setShowStudentCard] = useState(false);

  if (showStudentCard) {
    return <StudentCard onBack={() => setShowStudentCard(false)} />;
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Profile</h1>
        <p className="text-xl text-muted-foreground">Manage your personal information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="glass-effect border border-white/40 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                {/* Profile Photo */}
                <div className="h-32 w-32 mx-auto border-4 border-white/20 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/laura-chouette-d7wSG9uPev4-unsplash.jpg"
                    alt={user?.name || "Profile"} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    {mockStudent.batch}
                  </Badge>
                </div>

                <div className="flex gap-2">
                 
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-blue-900 hover:text-white hover:border-blue-900"
                    onClick={() => setShowStudentCard(true)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Student Card
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                  <p className="text-foreground font-medium">{mockStudent. id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user?.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    +27 11 123 4567
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Campus</label>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Main Campus
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="text-foreground font-medium">15 March 1998</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                    <p className="text-foreground font-medium">{mockStudent.program.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Qualification ID</label>
                    <p className="text-foreground font-medium">{mockStudent.program.qualificationId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Curriculum Code</label>
                    <p className="text-foreground font-medium">{mockStudent.program.curriculumCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                    <p className="text-foreground font-medium">{mockStudent.program.academicYear}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Occupational Certificate</label>
                    <p className="text-foreground font-medium">{mockStudent.program.occupationalCertificate}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold text-success">34</p>
                  <p className="text-xs text-muted-foreground">Completed Assessments</p>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                  <p className="text-2xl font-bold text-warning">2</p>
                  <p className="text-xs text-muted-foreground">Pending Assessments</p>
                </div>
                <div className="text-center p-4 bg-info/10 rounded-lg border border-info/20">
                  <Award className="h-6 w-6 mx-auto mb-2 text-info" />
                  <p className="text-2xl font-bold text-info">94%</p>
                  <p className="text-xs text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Home Address</label>
                  <p className="text-foreground">123 Education Street, Johannesburg, Gauteng, 2001</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                  <p className="text-foreground">Sarah Fisher (Mother) - +27 82 456 7890</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}