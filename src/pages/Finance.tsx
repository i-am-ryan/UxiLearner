import { useState } from 'react';
import { CreditCard, DollarSign, Calendar, Download, AlertCircle, CheckCircle, Clock, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const financialData = {
  overview: {
    totalFees: 45000,
    paidAmount: 30000,
    outstandingBalance: 15000,
    nextPaymentDue: '2024-04-15',
    nextPaymentAmount: 7500
  },
  payments: [
    {
      id: 1,
      date: '2024-01-15',
      amount: 15000,
      description: 'First Semester Payment',
      method: 'Bank Transfer',
      status: 'completed',
      reference: 'PAY-2024-001'
    },
    {
      id: 2,
      date: '2024-02-15',
      amount: 15000,
      description: 'Second Semester Payment',
      method: 'Credit Card',
      status: 'completed',
      reference: 'PAY-2024-002'
    },
    {
      id: 3,
      date: '2024-04-15',
      amount: 7500,
      description: 'Partial Payment - Third Semester',
      method: 'Pending',
      status: 'pending',
      reference: 'PAY-2024-003'
    },
    {
      id: 4,
      date: '2024-05-15',
      amount: 7500,
      description: 'Final Payment - Third Semester',
      method: 'Pending',
      status: 'upcoming',
      reference: 'PAY-2024-004'
    }
  ],
  feeStructure: [
    {
      category: 'Tuition Fees',
      amount: 35000,
      description: 'Academic year tuition for Electrician NQF Level 4',
      dueDate: 'Semester basis'
    },
    {
      category: 'Registration Fee',
      amount: 2500,
      description: 'One-time registration and administrative fee',
      dueDate: 'Upon enrollment'
    },
    {
      category: 'Materials & Equipment',
      amount: 5000,
      description: 'Tools, safety equipment, and learning materials',
      dueDate: 'Before practical sessions'
    },
    {
      category: 'Assessment Fee',
      amount: 1500,
      description: 'Examination and assessment costs',
      dueDate: 'Before assessments'
    },
    {
      category: 'Certification Fee',
      amount: 1000,
      description: 'Final certification and graduation costs',
      dueDate: 'Upon completion'
    }
  ],
  scholarships: [
    {
      name: 'Merit Scholarship',
      amount: 5000,
      status: 'approved',
      description: 'Academic excellence scholarship for high achievers'
    },
    {
      name: 'Skills Development Grant',
      amount: 3000,
      status: 'pending',
      description: 'Government skills development funding'
    }
  ]
};

const statusConfig = {
  completed: { label: 'Paid', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Due', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700', icon: Calendar },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertCircle }
};

export default function Finance() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const { overview, payments, feeStructure, scholarships } = financialData;
  const paymentProgress = (overview.paidAmount / overview.totalFees) * 100;

  const handleDownloadReceipt = (paymentId: number) => {
    // Simulate receipt download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `receipt_${paymentId}.pdf`;
    link.click();
  };

  const handleMakePayment = () => {
    // Simulate payment process
    alert('Redirecting to payment gateway...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Financial Overview</h1>
        <p className="text-slate-600">Manage your tuition fees, payments, and financial aid</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Fees</p>
                <p className="text-2xl font-bold text-slate-900">
                  R{overview.totalFees.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#0B1220]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  R{overview.paidAmount.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">
                  R{overview.outstandingBalance.toLocaleString()}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Next Payment</p>
                <p className="text-lg font-bold text-[#0B1220]">
                  R{overview.nextPaymentAmount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  Due: {new Date(overview.nextPaymentDue).toLocaleDateString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-[#0B1220]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                R{overview.paidAmount.toLocaleString()} of R{overview.totalFees.toLocaleString()} paid
              </span>
              <span className="text-sm font-medium text-slate-900">
                {Math.round(paymentProgress)}%
              </span>
            </div>
            <Progress value={paymentProgress} className="h-3" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Payment Start</span>
              <span>Current Progress</span>
              <span>Full Payment</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Payment Alert */}
      {overview.outstandingBalance > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                Your next payment of <strong>R{overview.nextPaymentAmount.toLocaleString()}</strong> is due on{' '}
                <strong>{new Date(overview.nextPaymentDue).toLocaleDateString()}</strong>
              </span>
              <Button 
                size="sm" 
                className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                onClick={handleMakePayment}
              >
                Pay Now
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          <TabsTrigger value="aid">Financial Aid</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.filter(p => p.status === 'completed').slice(0, 3).map(payment => {
                    const status = statusConfig[payment.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;

                    return (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${status.color}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                            <span className="text-sm font-medium text-slate-900">
                              R{payment.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {payment.description} • {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.filter(p => p.status !== 'completed').map(payment => {
                    const status = statusConfig[payment.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;

                    return (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${status.color}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                            <span className="text-sm font-medium text-slate-900">
                              R{payment.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {payment.description} • Due: {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </div>
                        {payment.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                            onClick={handleMakePayment}
                          >
                            Pay Now
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map(payment => {
                  const status = statusConfig[payment.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;

                  return (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`text-xs ${status.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                          <span className="text-lg font-semibold text-slate-900">
                            R{payment.amount.toLocaleString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {payment.reference}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600 mb-1">{payment.description}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(payment.date).toLocaleDateString()} • Payment Method: {payment.method}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {payment.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadReceipt(payment.id)}
                          >
                            <Receipt className="h-3 w-3 mr-1" />
                            Receipt
                          </Button>
                        )}
                        {payment.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                            onClick={handleMakePayment}
                          >
                            <CreditCard className="h-3 w-3 mr-1" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeStructure.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">{fee.category}</h4>
                      <p className="text-sm text-slate-600 mb-2">{fee.description}</p>
                      <p className="text-xs text-slate-500">Due: {fee.dueDate}</p>
                    </div>
                    <div className="text-xl font-bold text-[#0B1220]">
                      R{fee.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between p-4 bg-[#0B1220] text-white rounded-lg mt-4">
                  <div>
                    <h4 className="font-semibold text-lg">Total Program Cost</h4>
                    <p className="text-sm text-white/80">All fees included</p>
                  </div>
                  <div className="text-2xl font-bold">
                    R{feeStructure.reduce((total, fee) => total + fee.amount, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aid" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Aid & Scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scholarships.map((scholarship, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900">{scholarship.name}</h4>
                        <Badge 
                          className={`text-xs ${
                            scholarship.status === 'approved' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {scholarship.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{scholarship.description}</p>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      R{scholarship.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-medium text-slate-900 mb-2">Need Financial Assistance?</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Explore additional scholarship opportunities and payment plans
                  </p>
                  <Button variant="outline">
                    Apply for Financial Aid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}