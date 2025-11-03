import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Bell, FileText, DollarSign, BrainCircuit, UserPlus, BookOpen, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && user.role !== 'admin') {
      navigate(`/${user.role}`);
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    { icon: UserPlus, title: 'User Management', description: 'Manage students and teachers', href: '/admin/users' },
    { icon: Bell, title: 'Send Notices', description: 'System-wide notifications', href: '/admin/notices' },
    { icon: FileText, title: 'Reports', description: 'Generate and view reports', href: '/admin/reports' },
    { icon: DollarSign, title: 'Fee Management', description: 'Manage student fees', href: '/admin/fees' },
    { icon: BookOpen, title: 'Course Management', description: 'Manage courses and batches', href: '/admin/courses' },
    { icon: Users, title: 'Leave Approvals', description: 'Review leave applications', href: '/admin/leave-approvals' },
    { icon: BrainCircuit, title: 'AI Data Tools', description: 'Analytics and insights', href: '/admin/ai-tools' },
    { icon: Settings, title: 'Settings', description: 'System configuration', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-200">Welcome back, {user?.full_name}!</p>
          </div>
          <Button variant="outline" onClick={signOut} className="border-white text-white hover:bg-white/10">
            Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-smooth cursor-pointer"
              onClick={() => navigate(feature.href)}
            >
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>University statistics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">1,250</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">85</p>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">42</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">$250K</p>
                <p className="text-sm text-muted-foreground">Fee Collection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
