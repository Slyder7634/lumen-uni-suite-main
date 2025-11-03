import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, CheckCircle, XCircle, GraduationCap, Calendar, FileText, TrendingUp, DollarSign, Bot, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

export default function AttendancePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('attendance')
        .select(`
          *,
          courses (name, code)
        `)
        .eq('student_id', user?.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setAttendance(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAttendanceStats = () => {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const percentage = total > 0 ? (present / total) * 100 : 0;
    return { total, present, percentage: Math.round(percentage) };
  };

  const stats = calculateAttendanceStats();

  if (loading) {
    return (
      <DashboardLayout title="Attendance" navigation={navigation}>
        <div className="flex items-center justify-center h-64">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Attendance" navigation={navigation}>
      <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Attendance Records</h2>
        <p className="text-muted-foreground">Track your attendance across all courses</p>
      </div>

      {/* Overall Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>Your attendance percentage across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.percentage}%</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.present} / {stats.total} classes attended
              </div>
            </div>
            <Progress value={stats.percentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendance.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No attendance records yet</p>
            ) : (
              attendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    {record.status === 'present' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{record.courses?.name || 'Unknown Course'}</p>
                      <p className="text-sm text-muted-foreground">{record.courses?.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{record.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
