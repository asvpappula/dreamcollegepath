import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, FileText, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Metrics {
  totalUsers: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  submissionsPerDay: { date: string; count: number }[];
}

export default function AdminDashboard() {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchMetrics = async () => {
      // Simulate API call
      setTimeout(() => {
        setMetrics({
          totalUsers: 1247,
          newUsersLast7Days: 23,
          newUsersLast30Days: 156,
          submissionsPerDay: [
            { date: '2024-01-01', count: 12 },
            { date: '2024-01-02', count: 19 },
            { date: '2024-01-03', count: 8 },
            { date: '2024-01-04', count: 15 },
            { date: '2024-01-05', count: 22 },
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    if (currentUser && userData?.isAdmin) {
      fetchMetrics();
    }
  }, [currentUser, userData]);

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

  const totalSubmissions = metrics?.submissionsPerDay.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userData.firstName || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Overview of your admin panel</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.totalUsers || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Users (7d)</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.newUsersLast7Days || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Users (30d)</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.newUsersLast30Days || 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSubmissions}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <h3 className="font-medium">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage user accounts</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <FileText className="h-6 w-6 text-green-600 mb-2" />
                    <h3 className="font-medium">View Submissions</h3>
                    <p className="text-sm text-gray-600">Review form submissions</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-gray-600">View detailed analytics</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}