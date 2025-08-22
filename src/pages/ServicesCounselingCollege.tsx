import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Users, 
  Target, 
  FileText, 
  Heart,
  GraduationCap,
  Calendar,
  Award,
  Star,
  CheckCircle,
  Mail
} from "lucide-react";

const ServicesCounselingCollege = () => {
  const coreServices = [
    {
      icon: Users,
      title: "One-on-One Counseling Sessions",
      description: "Regular personalized video sessions with a dedicated counselor",
      features: [
        "Goal setting and academic planning",
        "Support with extracurricular and time management strategies"
      ]
    },
    {
      icon: Target,
      title: "College Planning & Application Strategy",
      description: "Personalized college list creation and application timeline planning",
      features: [
        "Application timeline planning and milestone tracking",
        "Support with early decision and early action strategies"
      ]
    },
    {
      icon: FileText,
      title: "Essay Brainstorming & Review",
      description: "Individual support to find your authentic story",
      features: [
        "Review and feedback on Common App and supplemental essays",
        "Clarity, voice, and structure improvements"
      ]
    },
    {
      icon: Heart,
      title: "Parent Engagement (Optional)",
      description: "Scheduled progress updates to parents or guardians",
      features: [
        "Joint sessions available when appropriate",
        "Support for navigating financial aid processes"
      ]
    },
    {
      icon: GraduationCap,
      title: "Live Projects & Resume Building",
      description: "Access to curated research, leadership, and volunteering opportunities",
      features: [
        "Mentorship for building a strong academic and extracurricular profile",
        "Resume development for college and scholarship applications"
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Student-Centered Counseling",
      description: "Every session is personalized based on the student's needs and aspirations"
    },
    {
      icon: Award,
      title: "Experienced Counselors",
      description: "Our team brings proven expertise in college admissions and mentorship"
    },
    {
      icon: Target,
      title: "Holistic Development",
      description: "We help students build strong academic, extracurricular, and personal profiles"
    },
    {
      icon: Star,
      title: "Clear Communication",
      description: "Parents and students stay informed through regular updates and access to milestones"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-background py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
              <GraduationCap className="w-4 h-4 mr-2 text-secondary" />
              Comprehensive College Counseling
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                Counseling <span className="text-secondary">/ College</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Comprehensive college counseling tailored to each student's unique strengths and aspirations. 
                Our services empower students with the knowledge, tools, and confidence they need for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Service Narrative */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                Counseling <span className="text-gradient">Service</span>
              </h2>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    Dream College Path provides comprehensive college counseling tailored to each student's unique strengths and aspirations. Our services empower students with the knowledge, tools, and confidence they need for success.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Our Core <span className="text-gradient">Services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <Card key={index} className="card-elevated h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="space-y-6 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
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

      {/* Who This Is For */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                Who This Is <span className="text-gradient">For</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold">High School Students</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Grades 9 through 12</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Aiming for top U.S. and international universities</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Exploring academic interests and career paths</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold">Families</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Seeking personalized, long-term college preparation</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Wanting comprehensive guidance and support</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        <span className="text-muted-foreground">Looking for proven results and expertise</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dream College Path */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Why <span className="text-gradient">Dream College Path</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white">
              Start Your Journey <span className="text-secondary">With Us</span>
            </h2>
            
            <p className="text-xl text-white/90">
              Book a free introductory session to learn how our personalized approach can help you reach your college goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90">
                Book a Free Intro Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                <Mail className="mr-2 w-5 h-5" />
                Email Us
              </Button>
            </div>
            
            <p className="text-white/80">
              Register with us or email us at{' '}
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

export default ServicesCounselingCollege;