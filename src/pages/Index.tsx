import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Users, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
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
    {
      icon: Users,
      title: 'Student Management',
      description: 'Comprehensive student enrollment, attendance tracking, and academic records management.'
    },
    {
      icon: BookOpen,
      title: 'Course Administration',
      description: 'Organize courses, manage schedules, upload notes, and track assignments effortlessly.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Real-time insights into attendance, exam results, and overall academic performance.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-96 w-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-accent rounded-full mb-6 shadow-accent">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            University Management Portal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            A comprehensive platform for seamless academic administration, student engagement, and institutional excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-accent hover:bg-accent/90 text-white shadow-accent transition-smooth"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline operations, enhance collaboration, and empower your academic community with our powerful features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border bg-card hover:shadow-elegant transition-smooth"
              >
                <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join hundreds of universities already using our platform to streamline their operations.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-accent hover:bg-accent/90 text-white shadow-accent"
          >
            Access Portal <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 University Management Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
