import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Shield, Zap, Users, ArrowLeft } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const highlights = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based access control and data encryption.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for handling thousands of concurrent users during peak times.'
    },
    {
      icon: Users,
      title: 'User-Centric Design',
      description: 'Intuitive interfaces tailored for administrators, teachers, and students.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-accent rounded-full mb-6">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with modern technology and designed for the future of education management.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-accent rounded-full mb-4">
                <highlight.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
              <p className="text-muted-foreground">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're dedicated to revolutionizing university management by providing a comprehensive, 
            secure, and user-friendly platform that connects administrators, teachers, and students. 
            Our goal is to streamline academic operations, enhance communication, and empower 
            educational institutions to focus on what matters most: quality education.
          </p>

          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time attendance tracking</li>
                <li>• Personalized lecture schedules</li>
                <li>• Exam results and performance analytics</li>
                <li>• Access to course notes and assignments</li>
                <li>• AI-powered learning assistance</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Easy attendance management</li>
                <li>• Grade submission and result generation</li>
                <li>• Course material distribution</li>
                <li>• Leave management system</li>
                <li>• Student performance insights</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">For Administrators</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Complete user management</li>
                <li>• Fee tracking and payment records</li>
                <li>• System-wide notifications</li>
                <li>• Comprehensive reporting tools</li>
                <li>• Data-driven decision making</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Role-based access control</li>
                <li>• End-to-end encryption</li>
                <li>• Audit logs for critical actions</li>
                <li>• Data privacy compliance</li>
                <li>• Regular security updates</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join us in transforming educational administration.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-gradient-accent text-white"
          >
            Access Portal
          </Button>
        </div>
      </div>
    </div>
  );
}
