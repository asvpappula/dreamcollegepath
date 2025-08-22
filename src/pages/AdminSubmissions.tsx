import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye, ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  formType: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export default function AdminSubmissions() {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formTypeFilter, setFormTypeFilter] = useState('all');

  // Route guard for admin access
  useEffect(() => {
    if (!loading) {
      if (!currentUser || !userData?.isAdmin) {
        navigate('/admin-login');
        return;
      }
    }
  }, [currentUser, userData, loading, navigate]);

  // Mock data for now - you can replace this with actual API calls
  useEffect(() => {
    const fetchSubmissions = async () => {
      // Simulate API call
      setTimeout(() => {
        setSubmissions([
          {
            id: '1',
            userId: 'user1',
            userName: 'Jane Smith',
            userEmail: 'jane@student.com',
            formType: 'College Application',
            status: 'pending',
            submittedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            userId: 'user2',
            userName: 'Bob Wilson',
            userEmail: 'bob@student.com',
            formType: 'Scholarship Application',
            status: 'reviewed',
            submittedAt: '2024-01-14T09:15:00Z',
            reviewedAt: '2024-01-15T14:20:00Z',
            reviewedBy: 'admin@dreamcollegepath.com'
          },
          {
            id: '3',
            userId: 'user3',
            userName: 'Alice Johnson',
            userEmail: 'alice@student.com',
            formType: 'Profile Update',
            status: 'approved',
            submittedAt: '2024-01-13T14:20:00Z',
            reviewedAt: '2024-01-14T10:30:00Z',
            reviewedBy: 'admin@dreamcollegepath.com'
          },
          {
            id: '4',
            userId: 'user4',
            userName: 'Charlie Brown',
            userEmail: 'charlie@student.com',
            formType: 'College Application',
            status: 'rejected',
            submittedAt: '2024-01-12T11:45:00Z',
            reviewedAt: '2024-01-13T16:15:00Z',
            reviewedBy: 'admin@dreamcollegepath.com'
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    if (currentUser && userData?.isAdmin) {
      fetchSubmissions();
    }
  }, [currentUser, userData]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.formType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesFormType = formTypeFilter === 'all' || submission.formType === formTypeFilter;
    
    return matchesSearch && matchesStatus && matchesFormType;
  });

  const handleExport = () => {
    const csv = [
      ['User Name', 'Email', 'Form Type', 'Status', 'Submitted', 'Reviewed', 'Reviewed By'],
      ...filteredSubmissions.map(submission => [
        submission.userName,
        submission.userEmail,
        submission.formType,
        submission.status,
        new Date(submission.submittedAt).toLocaleDateString(),
        submission.reviewedAt ? new Date(submission.reviewedAt).toLocaleDateString() : '',
        submission.reviewedBy || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'reviewed': return 'default';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading || !currentUser || !userData?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Form Submissions</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Submissions</h2>
                <p className="text-gray-600">Review and manage form submissions</p>
              </div>
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Form Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Forms</SelectItem>
                      <SelectItem value="College Application">College Application</SelectItem>
                      <SelectItem value="Scholarship Application">Scholarship Application</SelectItem>
                      <SelectItem value="Profile Update">Profile Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Form Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Reviewed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.userName}</div>
                            <div className="text-sm text-gray-500">{submission.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span>{submission.formType}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(submission.status)}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {submission.reviewedAt ? (
                            <div>
                              <div className="text-sm">{new Date(submission.reviewedAt).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-500">{submission.reviewedBy}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredSubmissions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No submissions found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}