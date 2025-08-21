import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { mockStudent } from '@/lib/mock-data';
import { Download, User, GraduationCap, MapPin } from 'lucide-react';
import { StudentCard } from '@/components/StudentCard';

export function StudentSnapshot() {
  const { user } = useAuth();
  const [showStudentCard, setShowStudentCard] = useState(false);

  if (showStudentCard) {
    return <StudentCard onBack={() => setShowStudentCard(false)} />;
  }

  return (
    <Card className="glass-effect border border-white/40 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Profile Photo */}
          <div className="h-24 w-24 border-2 border-white/20 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/laura-chouette-d7wSG9uPev4-unsplash.jpg"
              alt={user?.name || "Profile"} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Student Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {user?.email}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>Main Campus</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {mockStudent.batch}
              </Badge>
            </div>

            {/* Qualification Block */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm text-foreground">Qualification Details</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Title</div>
                  <div className="font-medium">{mockStudent.program.name}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Qualification ID</div>
                  <div className="font-medium">{mockStudent.program.qualificationId}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Curriculum Code</div>
                  <div className="font-medium">{mockStudent.program.curriculumCode}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Academic Year</div>
                  <div className="font-medium">{mockStudent.program.academicYear}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-primary/10">
                <div className="text-muted-foreground text-xs">Occupational Certificate</div>
                <div className="font-medium text-sm">{mockStudent.program.occupationalCertificate}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                asChild
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-[#0B1220] hover:text-white hover:border-[#0B1220]"

              >
                <Link to="/profile">
                  <User className="h-3 w-3 mr-1" />
                  View Profile
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-[#0B1220] hover:text-white hover:border-[#0B1220]"

                onClick={() => setShowStudentCard(true)}
              >
                <Download className="h-3 w-3 mr-1" />
                Student Card
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}