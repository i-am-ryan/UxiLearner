import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator'; // Added Separator
import { useAuth } from '@/lib/auth';
import { mockStudent } from '@/lib/mock-data';
import { ArrowLeft, Download, Printer, Share2, QrCode } from 'lucide-react'; // Changed Print to Printer

interface StudentCardProps {
  onBack: () => void;
}

export function StudentCard({ onBack }: StudentCardProps) {
  const { user } = useAuth();

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading student card...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="hover:bg-blue-900 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Student Card</h1>
            <p className="text-xl text-muted-foreground">Digital identification card</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrint}
            className="hover:bg-blue-900 hover:text-white hover:border-blue-900"
          >
            <Printer className="h-4 w-4 mr-2" /> {/* Changed Print to Printer */}
            Print
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="hover:bg-blue-900 hover:text-white hover:border-blue-900"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Student Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="relative overflow-hidden bg-[var(--uxi-navy)] text-white border-0 shadow-2xl">

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          <CardContent className="relative p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">UXi Education</h2>
                <p className="text-blue-100 text-sm">Learning Management System</p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                Student ID: {mockStudent.id}
              </Badge>
            </div>

            {/* Student Information */}
            <div className="flex items-start gap-6 mb-6">
              {/* Photo */}
              <div className="h-24 w-24 border-3 border-white/40 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src="/lovable-uploads/laura-chouette-d7wSG9uPev4-unsplash.jpg"
                  alt={user?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold">{user?.name}</h3>
                  <p className="text-blue-100">{user?.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-blue-200">Campus</p>
                    <p className="font-semibold">Main Campus</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Batch</p>
                    <p className="font-semibold">{mockStudent.batch}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Academic Year</p>
                    <p className="font-semibold">{mockStudent.program.academicYear}</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Valid Until</p>
                    <p className="font-semibold">Dec 2025</p>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="h-20 w-20 bg-white/90 rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode className="h-12 w-12 text-blue-900" />
              </div>
            </div>

            <Separator className="bg-white/20 mb-6" />

            {/* Qualification Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-100">Qualification Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-200">Programme</p>
                  <p className="font-medium">{mockStudent.program.name}</p>
                </div>
                <div>
                  <p className="text-blue-200">Qualification ID</p>
                  <p className="font-medium">{mockStudent.program.qualificationId}</p>
                </div>
                <div>
                  <p className="text-blue-200">Curriculum Code</p>
                  <p className="font-medium">{mockStudent.program.curriculumCode}</p>
                </div>
                <div>
                  <p className="text-blue-200">Certificate</p>
                  <p className="font-medium">{mockStudent.program.occupationalCertificate}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center text-xs text-blue-200">
              <p>© 2025 UXi Education. All rights reserved.</p>
              <p>Valid student identification card</p>
            </div>
          </CardContent>
        </Card>

        {/* Card Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Issue Date</label>
                <p className="font-medium">January 15, 2025</p>
              </div>
              <div>
                <label className="text-muted-foreground">Expiry Date</label>
                <p className="font-medium">December 31, 2025</p>
              </div>
              <div>
                <label className="text-muted-foreground">Card Version</label>
                <p className="font-medium">Digital v2.0</p>
              </div>
              <div>
                <label className="text-muted-foreground">Status</label>
                <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Card Usage</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Present this card for campus access</li>
                <li>• Use for library services and resources</li>
                <li>• Required for examination entry</li>
                <li>• Valid for student discounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}