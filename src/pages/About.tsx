import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Target, 
  Users, 
  Award, 
  GraduationCap, 
  Heart,
  Calendar,
  CheckCircle,
  Star
} from "lucide-react";

const About = () => {
  const missionItems = [
    {
      icon: Target,
      title: "Personalized Guidance",
      description: "Tailored strategies that match each student's unique strengths, goals, and aspirations."
    },
    {
      icon: Users,
      title: "Family-Centered Approach",
      description: "Supporting both students and parents throughout the entire college application journey."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "98% acceptance rate with students gaining admission to their dream colleges."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Dream College Path Founded",
      description: "Started with a vision to simplify college admissions"
    },
    {
      year: "2021",
      title: "First 100 Students",
      description: "Reached our first milestone of helping 100 students"
    },
    {
      year: "2022",
      title: "Expanded Services",
      description: "Added comprehensive test prep and essay coaching"
    },
    {
      year: "2023",
      title: "1,000+ Students Served",
      description: "Reached over 1,000 students nationwide"
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Launched our integrated online platform"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-background py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                  <Heart className="w-4 h-4 mr-2 text-secondary" />
                  Our Story
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                  Meet the Team Behind
                  <span className="block text-secondary">Dream College Path</span>
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                  We're parents, educators, and college admissions experts who understand the challenges 
                  families face. Our mission is to make college admissions stress-free and successful.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
                  Start Your Path
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                  Watch Our Story
                </Button>
              </div>
            </div>

            {/* Founders Photo */}
            <div className="relative">
              <div className="card-elevated rounded-2xl p-8 bg-white/95 backdrop-blur">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Our Founders</h3>
                    <div className="text-2xl">👨‍👨‍👧‍👦</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Venkat Munjeti */}
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">VM</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Venkat Munjeti</h4>
                        <p className="text-sm text-muted-foreground">Founder & CEO</p>
                        <p className="text-xs text-muted-foreground mt-1">Dad, Educator, Visionary</p>
                      </div>
                    </div>
                    
                    {/* Pradyot Kar */}
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-secondary to-secondary-light mx-auto flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">PK</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Pradyot Kar</h4>
                        <p className="text-sm text-muted-foreground">Co-Founder</p>
                        <p className="text-xs text-muted-foreground mt-1">Strategic Partner</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Building the future of college admissions together
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Target className="w-4 h-4 mr-2" />
              Our Mission
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Empowering Students to <span className="text-gradient">Achieve Their Dreams</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe every student deserves personalized guidance to navigate the complex college 
              admissions process with confidence and success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <Card key={index} className="card-elevated text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Founder's Story
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                The Story Behind <span className="text-gradient">Dream College Path</span>
              </h2>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    As a father, I experienced firsthand the overwhelming journey of college admissions. 
                    Watching my own child navigate SAT prep, AP coursework, and the complexity of applications, 
                    I quickly realized that the process was far more challenging than I had imagined. Between 
                    juggling school responsibilities, extracurricular activities, and college applications, it 
                    was clear that students—and parents—needed structured guidance to make informed decisions.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    One of the biggest challenges I faced was the constant need for pickup and drop-off between 
                    different classes—one for SAT prep, another for tutoring, and yet another for college counseling. 
                    The lack of a centralized learning hub made the entire process inefficient and exhausting. 
                    I knew there had to be a better way—one platform that could bring everything together.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    That realization led to the birth of Dream College Path (DCP)—a one-stop solution providing 
                    high school students with expert guidance, test prep, tutoring, project-based learning, and 
                    college admissions counseling, all in one place. DCP eliminates the hassle of managing multiple 
                    services by offering a complete 360-degree view of student progress—whether it's tutoring, 
                    SAT/ACT prep, or college essays, parents and students can track their journey seamlessly.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    At DCP, we focus not just on getting students into top colleges, but on helping them discover 
                    their strengths, build meaningful projects, and showcase their unique potential.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    DCP wouldn't have come to life without the dedication and expertise of my Co-Founder, 
                    Pradyot Kar, whose invaluable insights and strategic contributions played a crucial role 
                    in shaping our vision. His commitment to making college admissions stress-free and efficient 
                    has been instrumental in turning DCP into a reality.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    With Dream College Path, my goal is simple: to create the resource I wish I had as a parent—a 
                    support system that ensures every student can take charge of their future, stress-free. Because 
                    every dream deserves a path—and with the right guidance, every student can achieve their aspirations.
                  </p>
                  
                  <div className="border-t pt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-semibold text-xl">— Venkat Munjeti</p>
                        <p className="text-muted-foreground">Dad, DCP Founder & CEO</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium text-muted-foreground">Founder & CEO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Our Journey
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Milestones That <span className="text-gradient">Shape Our Story</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-white shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="ml-16 flex-1">
                      <Card className="card-elevated">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary" className="text-sm font-medium">
                              {milestone.year}
                            </Badge>
                            <CheckCircle className="w-5 h-5 text-accent" />
                          </div>
                          <h3 className="text-xl font-display font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Ready to Start <span className="text-secondary">Your Path</span>?
            </h2>
            
            <p className="text-xl text-white/90">
              Join thousands of students who have successfully navigated their college admissions 
              journey with Dream College Path.
            </p>
            
            <Button variant="hero" size="lg" className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90">
              Start Your Path
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 