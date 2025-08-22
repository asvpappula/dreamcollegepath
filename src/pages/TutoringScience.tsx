import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Atom, 
  Target, 
  Users,
  CheckCircle,
  Mail,
  BookOpen,
  Award,
  Microscope
} from "lucide-react";

const TutoringScience = () => {
  const scienceSubjects = [
    {
      category: "Biology",
      topics: ["Cell Biology", "Genetics", "Evolution", "Ecology", "Human Anatomy"]
    },
    {
      category: "Chemistry",
      topics: ["Atomic Structure", "Chemical Bonds", "Reactions", "Organic Chemistry"]
    },
    {
      category: "Physics",
      topics: ["Mechanics", "Thermodynamics", "Electricity", "Waves", "Modern Physics"]
    },
    {
      category: "Earth Science",
      topics: ["Geology", "Meteorology", "Oceanography", "Astronomy"]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Hands-On Learning",
      description: "Interactive experiments and real-world applications to make science come alive"
    },
    {
      icon: Users,
      title: "Expert Scientists",
      description: "Learn from tutors with advanced degrees and research experience"
    },
    {
      icon: Microscope,
      title: "Lab Skills",
      description: "Develop essential laboratory techniques and scientific methodology"
    },
    {
      icon: Award,
      title: "Test Prep",
      description: "Specialized preparation for AP exams, SAT Subject Tests, and more"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-background py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 flex flex-col items-center justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
              <Atom className="w-4 h-4 mr-2 text-secondary" />
              Expert Science Tutoring
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
              Science <span className="text-secondary">Tutoring</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore the wonders of science with expert tutoring in biology, chemistry, physics, and earth science. 
              Build a strong foundation for STEM success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
                Start Learning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Science Subjects */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Science <span className="text-gradient">Subjects We Cover</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive science tutoring across all major disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scienceSubjects.map((subject, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold text-center">
                      {subject.category}
                    </h3>
                    <ul className="space-y-2">
                      {subject.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Why Choose Our <span className="text-gradient">Science Tutoring</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="card-elevated text-center">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8 flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Ready to Discover <span className="text-secondary">Science?</span>
            </h2>
            
            <p className="text-xl text-white/90">
              Join students who are excelling in science with our expert tutoring and hands-on approach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90"
                onClick={() => window.open('https://calendly.com/dreamcollegepath/30min?month=2025-08', '_blank')}
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                <Mail className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </div>
            
            <p className="text-white/80">
              Email us at{' '}
              <a href="mailto:info@dreamcollegepath.com" className="text-secondary hover:underline">
                info@dreamcollegepath.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TutoringScience;