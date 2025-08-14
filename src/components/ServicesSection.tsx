import { GraduationCap, FileText, Target, Users, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Comprehensive College Counseling",
      description: "End-to-end guidance from college list creation to final application submission. Personalized strategy for every student.",
      features: ["School selection strategy", "Timeline management", "Application review", "Interview preparation"],
      price: "Starting at $2,500",
      popular: true
    },
    {
      icon: FileText,
      title: "Essay Coaching & Review",
      description: "Expert guidance on personal statements, supplemental essays, and scholarship applications that showcase your unique story.",
      features: ["Personal statement coaching", "Supplemental essays", "Scholarship applications", "Multiple drafts & revisions"],
      price: "Starting at $800"
    },
    {
      icon: Target,
      title: "Test Preparation",
      description: "Targeted SAT and ACT prep with proven strategies to maximize your scores and strengthen your applications.",
      features: ["Diagnostic assessments", "Personalized study plans", "Practice tests", "Score improvement guarantee"],
      price: "Starting at $1,200"
    },
    {
      icon: Users,
      title: "Family Support Program",
      description: "Guidance for parents and families throughout the college application process, reducing stress for everyone.",
      features: ["Parent workshops", "Financial aid planning", "Family communication strategies", "Stress management"],
      price: "Starting at $500"
    },
    {
      icon: Calendar,
      title: "Last-Minute Application Support",
      description: "Intensive support for students who need help completing applications with tight deadlines.",
      features: ["Rush application review", "Emergency essay coaching", "Deadline management", "Quick turnaround"],
      price: "Starting at $1,500"
    },
    {
      icon: Award,
      title: "Scholarship Strategy",
      description: "Comprehensive scholarship search and application strategy to maximize financial aid opportunities.",
      features: ["Scholarship database access", "Application coaching", "Merit aid strategy", "Need-based aid guidance"],
      price: "Starting at $600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Target className="w-4 h-4 mr-2" />
            Personalized Services
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Your Success, <span className="text-gradient">Our Expertise</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From comprehensive counseling to specialized support, we offer everything you need 
            to navigate the college application journey with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`card-elevated h-full relative ${service.popular ? 'ring-2 ring-primary/20' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-8 h-full flex flex-col">
                <div className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  
                  <Button 
                    variant={service.popular ? "hero" : "cta"}
                    size="lg"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every student is unique. We offer flexible packages and à la carte services 
              tailored to your specific needs and timeline.
            </p>
            <Button variant="cta" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;