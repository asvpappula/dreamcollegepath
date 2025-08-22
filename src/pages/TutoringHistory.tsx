import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Clock, 
  Target, 
  Users,
  CheckCircle,
  Mail,
  Globe,
  Award,
  Scroll
} from "lucide-react";

const TutoringHistory = () => {
  const historyAreas = [
    {
      category: "World History",
      topics: ["Ancient Civilizations", "Medieval Period", "Renaissance", "Modern Era"]
    },
    {
      category: "U.S. History",
      topics: ["Colonial America", "Civil War", "Industrial Revolution", "20th Century"]
    },
    {
      category: "Government",
      topics: ["Constitution", "Political Systems", "Civics", "Current Events"]
    },
    {
      category: "Test Preparation",
      topics: ["AP World History", "AP U.S. History", "AP Government", "SAT Subject Tests"]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Critical Thinking",
      description: "Develop analytical skills to understand cause and effect in historical events"
    },
    {
      icon: Users,
      title: "Expert Historians",
      description: "Learn from tutors with advanced degrees in history and social studies"
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Understand connections between past and present across cultures"
    },
    {
      icon: Award,
      title: "Academic Success",
      description: "Excel in history courses and standardized tests with proven strategies"
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
              <Clock className="w-4 h-4 mr-2 text-secondary" />
              Expert History Tutoring
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
              History <span className="text-secondary">Tutoring</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore the past to understand the present. Our expert history tutoring helps students 
              develop critical thinking skills and excel in world history, U.S. history, and government.
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

      {/* History Topics */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              History <span className="text-gradient">Areas We Cover</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive history tutoring across all major periods and subjects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {historyAreas.map((area, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold text-center">
                      {area.category}
                    </h3>
                    <ul className="space-y-2">
                      {area.topics.map((topic, topicIndex) => (
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
              Why Choose Our <span className="text-gradient">History Tutoring</span>
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
              Ready to Explore <span className="text-secondary">History?</span>
            </h2>
            
            <p className="text-xl text-white/90">
              Join students who are developing critical thinking skills and excelling in history.
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

export default TutoringHistory;