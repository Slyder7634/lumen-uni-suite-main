import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Calendar, FileText, Upload, Bell, FileCheck, Users, BrainCircuit } from 'lucide-react';

export default function TeacherDashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && user.role !== 'teacher') {
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
    { icon: CheckSquare, title: 'Mark Attendance', description: 'Record student attendance', href: '/teacher/attendance' },
    { icon: Calendar, title: 'My Schedule', description: 'View teaching timetable', href: '/teacher/schedule' },
    { icon: FileText, title: 'Exam Results', description: 'Update and manage results', href: '/teacher/results' },
    { icon: Upload, title: 'Upload Notes', description: 'Share course materials', href: '/teacher/notes' },
    { icon: Bell, title: 'Send Notifications', description: 'Communicate with students', href: '/teacher/notifications' },
    { icon: Users, title: 'Student Fees', description: 'View fee status', href: '/teacher/student-fees' },
    { icon: FileCheck, title: 'Leave Management', description: 'Apply and track leaves', href: '/teacher/leave' },
    { icon: BrainCircuit, title: 'AI Tools', description: 'Teaching assistance', href: '/teacher/ai-tools' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
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
            <CardTitle>Today's Overview</CardTitle>
            <CardDescription>Your teaching schedule and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">5</p>
                <p className="text-sm text-muted-foreground">Classes Today</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">12</p>
                <p className="text-sm text-muted-foreground">Pending Submissions</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-accent">3</p>
                <p className="text-sm text-muted-foreground">Upcoming Exams</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
