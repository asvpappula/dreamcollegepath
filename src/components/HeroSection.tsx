import { ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section id="home" className="hero-background py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                <Star className="w-4 h-4 mr-2 text-secondary" />
                Trusted by 1,000+ students nationwide
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                Your Path to
                <span className="block text-secondary">Dream College</span>
                Starts Here
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                Expert college counseling that transforms ambitious students into successful college applicants. 
                Personalized guidance from application strategy to acceptance letters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-white/80 text-sm">Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$2.4M</div>
                <div className="text-white/80 text-sm">Scholarships Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">8+</div>
                <div className="text-white/80 text-sm">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="card-elevated rounded-2xl p-8 bg-white/95 backdrop-blur">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Application Progress</h3>
                  <div className="text-2xl">🎓</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Essay Reviews</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-20 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">4/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">School Research</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-full h-2 bg-gradient-to-r from-secondary to-secondary-light rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">12/12</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-gradient-to-r from-accent to-accent-light rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">8/10</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Next Milestone</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating testimonial card */}
            <Card className="absolute -bottom-4 -left-4 w-64 card-elevated">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-secondary-light flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Sarah M.</div>
                    <div className="text-xs text-muted-foreground">Admitted to MIT</div>
                    <div className="flex text-secondary text-xs mt-1">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;