import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Trophy, Clock, GraduationCap, FileText, TrendingUp, DollarSign, Bot, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

export default function ExamsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [results, setResults] = useState<any[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch results
      const { data: resultsData, error: resultsError } = await (supabase as any)
        .from('results')
        .select(`
          *,
          exams (
            title,
            total_marks,
            courses (name, code)
          )
        `)
        .eq('student_id', user?.id)
        .order('created_at', { ascending: false });

      if (resultsError) throw resultsError;

      // Fetch upcoming exams
      const { data: examsData, error: examsError } = await (supabase as any)
        .from('exams')
        .select(`
          *,
          courses (name, code)
        `)
        .gte('exam_date', new Date().toISOString())
        .order('exam_date', { ascending: true });

      if (examsError) throw examsError;

      setResults(resultsData || []);
      setUpcomingExams(examsData || []);
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

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-500' };
    return { grade: 'F', color: 'text-red-500' };
  };

  if (loading) {
    return (
      <DashboardLayout title="Exams & Results" navigation={navigation}>
        <div className="flex items-center justify-center h-64">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Exams & Results" navigation={navigation}>
      <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Exam Portal</h2>
        <p className="text-muted-foreground">View your results and upcoming exams</p>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">My Results</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No results available yet</p>
              </CardContent>
            </Card>
          ) : (
            results.map((result) => {
              const percentage = (result.marks_obtained / result.exams.total_marks) * 100;
              const { grade, color } = getGrade(percentage);
              
              return (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{result.exams.courses.name}</CardTitle>
                        <CardDescription>{result.exams.title}</CardDescription>
                      </div>
                      <Badge className={color} variant="outline">
                        {grade}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Marks Obtained</p>
                        <p className="text-2xl font-bold">{result.marks_obtained}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Marks</p>
                        <p className="text-2xl font-bold">{result.exams.total_marks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Percentage</p>
                        <p className="text-2xl font-bold">{percentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className={`text-2xl font-bold ${color}`}>{grade}</p>
                      </div>
                    </div>
                    {result.remarks && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm"><span className="font-medium">Remarks:</span> {result.remarks}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No upcoming exams scheduled</p>
              </CardContent>
            </Card>
          ) : (
            upcomingExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <CardTitle>{exam.courses.name}</CardTitle>
                  <CardDescription>{exam.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {new Date(exam.exam_date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{exam.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Marks</p>
                        <p className="font-medium">{exam.total_marks}</p>
                      </div>
                    </div>
                  </div>
                  {exam.description && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{exam.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
    </DashboardLayout>
  );
}
