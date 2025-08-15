import { ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section id="home" className="hero-background relative overflow-hidden min-h-screen flex items-center" style={{paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(56px, 8vw, 96px)'}}>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[58%_42%] gap-10 lg:gap-14 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur text-white font-medium mx-auto lg:mx-0" style={{fontSize: '14px', padding: '12px 20px'}}>
                <Star className="w-4 h-4 mr-2 text-secondary" />
                Trusted by 1,000+ students nationwide
              </div>
              
              <h1 className="font-display font-bold text-white" style={{fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: '1.1', letterSpacing: '-0.02em', marginTop: '24px'}}>
                Your Path to
                <span className="block text-secondary">Dream College</span>
                Starts Here
              </h1>
              
              <p className="text-white/90 mx-auto lg:mx-0" style={{fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: '1.65', maxWidth: '70ch', marginTop: '32px'}}>
                Expert college counseling that transforms ambitious students into successful college applicants. 
                Personalized guidance from application strategy to acceptance letters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{marginTop: '32px'}}>
              <Button variant="hero" size="lg" className="px-8 py-4 text-lg font-semibold">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 lg:gap-8" style={{marginTop: '40px'}}>
              <div className="text-center">
                <div className="font-bold text-white" style={{fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.2'}}>98%</div>
                <div className="text-white/80 text-small">Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white" style={{fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.2'}}>$2.4M</div>
                <div className="text-white/80 text-small">Scholarships Earned</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white" style={{fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.2'}}>8+</div>
                <div className="text-white/80 text-small">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="card-elevated bg-white/95 backdrop-blur" style={{borderRadius: '20px', padding: '28px'}}>
              <div style={{display: 'grid', gap: '16px'}}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold" style={{fontSize: 'clamp(22px, 2.2vw, 28px)', lineHeight: '1.3'}}>Application Progress</h3>
                  <div style={{fontSize: '24px'}}>🎓</div>
                </div>
                
                <div style={{display: 'grid', gap: '16px'}}>
                  <div className="flex items-center justify-between">
                    <span className="text-small text-muted-foreground">Essay Reviews</span>
                    <div className="flex items-center" style={{gap: '8px'}}>
                      <div className="bg-muted rounded-full" style={{width: '96px', height: '10px'}}>
                        <div className="bg-gradient-to-r from-primary to-accent rounded-full" style={{width: '80%', height: '10px'}}></div>
                      </div>
                      <span className="text-small font-medium">4/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-small text-muted-foreground">School Research</span>
                    <div className="flex items-center" style={{gap: '8px'}}>
                      <div className="bg-muted rounded-full" style={{width: '96px', height: '10px'}}>
                        <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-full" style={{width: '100%', height: '10px'}}></div>
                      </div>
                      <span className="text-small font-medium">12/12</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-small text-muted-foreground">Applications</span>
                    <div className="flex items-center" style={{gap: '8px'}}>
                      <div className="bg-muted rounded-full" style={{width: '96px', height: '10px'}}>
                        <div className="bg-gradient-to-r from-accent to-accent-light rounded-full" style={{width: '66%', height: '10px'}}></div>
                      </div>
                      <span className="text-small font-medium">8/10</span>
                    </div>
                  </div>
                </div>

                <div className="border-t" style={{paddingTop: '16px'}}>
                  <div className="flex items-center" style={{gap: '12px'}}>
                    <div className="rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center" style={{width: '40px', height: '40px'}}>
                      <Award style={{width: '20px', height: '20px'}} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-small">Next Milestone</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating testimonial card */}
            <Card className="absolute card-elevated" style={{bottom: '-16px', left: '-16px', width: '256px', borderRadius: '16px'}}>
              <CardContent style={{padding: '24px'}}>
                <div className="flex items-center" style={{gap: '12px'}}>
                  <div className="rounded-full bg-gradient-to-r from-secondary to-secondary-light flex items-center justify-center" style={{width: '48px', height: '48px'}}>
                    <Users style={{width: '24px', height: '24px'}} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-small">Sarah M.</div>
                    <div className="text-small text-muted-foreground">Admitted to MIT</div>
                    <div className="flex text-secondary text-small" style={{marginTop: '4px'}}>
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