import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  Users,
  CheckCircle,
  Mail,
  PenTool,
  Award,
  FileText
} from "lucide-react";

const TutoringEnglish = () => {
  const englishAreas = [
    {
      category: "Reading Comprehension",
      topics: ["Literary Analysis", "Critical Reading", "Vocabulary Building", "Reading Strategies"]
    },
    {
      category: "Writing Skills",
      topics: ["Essay Writing", "Creative Writing", "Grammar & Mechanics", "Research Papers"]
    },
    {
      category: "Literature",
      topics: ["Classic Literature", "Modern Fiction", "Poetry Analysis", "Drama Studies"]
    },
    {
      category: "Test Preparation",
      topics: ["SAT/ACT English", "AP Literature", "AP Language", "State Assessments"]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Personalized Approach",
      description: "Tailored instruction based on individual reading level and writing goals"
    },
    {
      icon: Users,
      title: "Expert Educators",
      description: "Experienced English teachers with advanced degrees in literature and writing"
    },
    {
      icon: PenTool,
      title: "Writing Excellence",
      description: "Develop strong writing skills for academic success and beyond"
    },
    {
      icon: Award,
      title: "College Prep",
      description: "Prepare for college-level reading and writing expectations"
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
              <BookOpen className="w-4 h-4 mr-2 text-secondary" />
              Expert English Tutoring
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
              English <span className="text-secondary">Tutoring</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Master reading, writing, and literature with personalized English tutoring. 
              Build critical thinking skills and excel in all areas of English language arts.
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

      {/* English Topics */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              English <span className="text-gradient">Areas We Cover</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive English tutoring across all language arts skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {englishAreas.map((area, index) => (
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
              Why Choose Our <span className="text-gradient">English Tutoring</span>
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
              Ready to Master <span className="text-secondary">English?</span>
            </h2>
            
            <p className="text-xl text-white/90">
              Join students who are improving their reading, writing, and critical thinking skills.
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

export default TutoringEnglish;