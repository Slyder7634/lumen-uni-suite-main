import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap,
  TrendingUp,
  DollarSign,
  Bot,
  Bell,
  Download
} from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/student', icon: GraduationCap },
    { name: 'Attendance', href: '/student/attendance', icon: GraduationCap },
    { name: 'Schedule', href: '/student/schedule', icon: Calendar },
    { name: 'Exams & Results', href: '/student/exams', icon: TrendingUp },
    { name: 'Notes', href: '/student/notes', icon: BookOpen },
    { name: 'Assignments', href: '/student/assignments', icon: FileText },
    { name: 'Fees', href: '/student/fees', icon: DollarSign },
    { name: 'AI Assistant', href: '/student/ai', icon: Bot },
  ];

  const quickActions = [
    {
      title: 'Check Attendance',
      description: 'View your attendance records',
      icon: GraduationCap,
      href: '/student/attendance',
      color: 'bg-blue-500'
    },
    {
      title: 'View Schedule',
      description: 'Check your weekly timetable',
      icon: Calendar,
      href: '/student/schedule',
      color: 'bg-purple-500'
    },
    {
      title: 'Exam Results',
      description: 'See your latest exam results',
      icon: TrendingUp,
      href: '/student/exams',
      color: 'bg-green-500'
    },
    {
      title: 'Download Notes',
      description: 'Access course materials',
      icon: Download,
      href: '/student/notes',
      color: 'bg-orange-500'
    },
    {
      title: 'Assignments',
      description: 'View and submit assignments',
      icon: FileText,
      href: '/student/assignments',
      color: 'bg-red-500'
    },
    {
      title: 'Fee Status',
      description: 'Check your fee details',
      icon: DollarSign,
      href: '/student/fees',
      color: 'bg-cyan-500'
    },
  ];

  return (
    <DashboardLayout title="Student Dashboard" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-muted-foreground">Here's what's happening with your academics</p>
          </div>
          <Button onClick={() => navigate('/student/ai')} className="gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Above required 75%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Next class at 10:00 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features for quick access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => navigate(action.href)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`${action.color} p-2 rounded-lg`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-blue-500 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New Assignment Posted</p>
                  <p className="text-sm text-muted-foreground">Database Management - Due in 3 days</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-green-500 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Exam Results Published</p>
                  <p className="text-sm text-muted-foreground">Mid-term results are now available</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
