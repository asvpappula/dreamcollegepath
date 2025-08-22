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
import { Search, Download, ArrowLeft, Activity, User, FileText, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export default function AdminAudit() {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');

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
    const fetchAuditLogs = async () => {
      // Simulate API call
      setTimeout(() => {
        setAuditLogs([
          {
            id: '1',
            userId: 'admin1',
            userName: 'John Doe',
            userEmail: 'john@dreamcollegepath.com',
            action: 'LOGIN',
            resource: 'AUTH',
            details: 'Admin user logged in successfully',
            timestamp: '2024-01-15T10:30:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
          },
          {
            id: '2',
            userId: 'user1',
            userName: 'Jane Smith',
            userEmail: 'jane@student.com',
            action: 'CREATE',
            resource: 'SUBMISSION',
            resourceId: 'sub_123',
            details: 'Created new college application submission',
            timestamp: '2024-01-15T09:15:00Z',
            ipAddress: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          {
            id: '3',
            userId: 'admin1',
            userName: 'John Doe',
            userEmail: 'john@dreamcollegepath.com',
            action: 'UPDATE',
            resource: 'USER',
            resourceId: 'user_456',
            details: 'Updated user profile information',
            timestamp: '2024-01-15T08:45:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
          },
          {
            id: '4',
            userId: 'user2',
            userName: 'Bob Wilson',
            userEmail: 'bob@student.com',
            action: 'DELETE',
            resource: 'SUBMISSION',
            resourceId: 'sub_789',
            details: 'Deleted draft submission',
            timestamp: '2024-01-15T07:20:00Z',
            ipAddress: '192.168.1.102',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
          },
          {
            id: '5',
            userId: 'admin1',
            userName: 'John Doe',
            userEmail: 'john@dreamcollegepath.com',
            action: 'APPROVE',
            resource: 'SUBMISSION',
            resourceId: 'sub_101',
            details: 'Approved scholarship application',
            timestamp: '2024-01-14T16:30:00Z',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
          },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    if (currentUser && userData?.isAdmin) {
      fetchAuditLogs();
    }
  }, [currentUser, userData]);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesResource = resourceFilter === 'all' || log.resource === resourceFilter;
    
    return matchesSearch && matchesAction && matchesResource;
  });

  const handleExport = () => {
    const csv = [
      ['Timestamp', 'User', 'Email', 'Action', 'Resource', 'Details', 'IP Address'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.userName,
        log.userEmail,
        log.action,
        log.resource,
        log.details,
        log.ipAddress
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-log.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN':
      case 'LOGOUT':
        return <User className="w-4 h-4" />;
      case 'CREATE':
      case 'UPDATE':
      case 'DELETE':
        return <FileText className="w-4 h-4" />;
      case 'APPROVE':
      case 'REJECT':
        return <Activity className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'CREATE':
      case 'APPROVE':
        return 'default';
      case 'UPDATE':
        return 'secondary';
      case 'DELETE':
      case 'REJECT':
        return 'destructive';
      case 'LOGIN':
      case 'LOGOUT':
        return 'outline';
      default:
        return 'secondary';
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
              <h1 className="text-xl font-bold text-gray-900">Audit Log</h1>
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
                <h2 className="text-2xl font-bold text-gray-900">System Activity</h2>
                <p className="text-gray-600">Track user actions and system changes</p>
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
                      placeholder="Search audit logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="LOGIN">Login</SelectItem>
                      <SelectItem value="LOGOUT">Logout</SelectItem>
                      <SelectItem value="CREATE">Create</SelectItem>
                      <SelectItem value="UPDATE">Update</SelectItem>
                      <SelectItem value="DELETE">Delete</SelectItem>
                      <SelectItem value="APPROVE">Approve</SelectItem>
                      <SelectItem value="REJECT">Reject</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={resourceFilter} onValueChange={setResourceFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Resource" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Resources</SelectItem>
                      <SelectItem value="AUTH">Auth</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="SUBMISSION">Submission</SelectItem>
                      <SelectItem value="SYSTEM">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{log.userName}</div>
                            <div className="text-xs text-gray-500">{log.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getActionIcon(log.action)}
                            <Badge variant={getActionBadgeVariant(log.action)}>
                              {log.action}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-mono">{log.resource}</span>
                          {log.resourceId && (
                            <div className="text-xs text-gray-500">{log.resourceId}</div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm truncate" title={log.details}>
                            {log.details}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono">
                          {log.ipAddress}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredLogs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No audit logs found matching your criteria.
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