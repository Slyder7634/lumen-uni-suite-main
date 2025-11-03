import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Clock, MapPin, BookOpen, GraduationCap, Calendar, FileText, TrendingUp, DollarSign, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

export default function SchedulePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<any[]>([]);
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
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      // Get student's enrollments first
      const { data: enrollments, error: enrollError } = await (supabase as any)
        .from('enrollments')
        .select('batch_id')
        .eq('student_id', user?.id);

      if (enrollError) throw enrollError;

      if (enrollments && enrollments.length > 0) {
        const batchIds = enrollments.map((e: any) => e.batch_id);
        
        const { data, error } = await (supabase as any)
          .from('lecture_schedules')
          .select(`
            *,
            courses (name, code),
            batches (name),
            profiles:teacher_id (full_name)
          `)
          .in('batch_id', batchIds)
          .order('day_of_week')
          .order('start_time');

        if (error) throw error;
        setSchedules(data || []);
      }
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

  const groupSchedulesByDay = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => ({
      day,
      lectures: schedules.filter(s => s.day_of_week === day)
    }));
  };

  const groupedSchedules = groupSchedulesByDay();

  if (loading) {
    return (
      <DashboardLayout title="Schedule" navigation={navigation}>
        <div className="flex items-center justify-center h-64">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Schedule" navigation={navigation}>
      <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Weekly Schedule</h2>
        <p className="text-muted-foreground">Your personalized lecture timetable</p>
      </div>

      {schedules.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No schedule available yet</p>
          </CardContent>
        </Card>
      ) : (
        groupedSchedules.map(({ day, lectures }) => (
          lectures.length > 0 && (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-xl">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-smooth"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold">{lecture.courses?.name}</h4>
                          <Badge variant="outline">{lecture.courses?.code}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {lecture.profiles?.full_name || 'TBA'}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{lecture.start_time} - {lecture.end_time}</span>
                        </div>
                        {lecture.room && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{lecture.room}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ))
      )}
    </div>
    </DashboardLayout>
  );
}
