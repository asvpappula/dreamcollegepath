import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      school: "Stanford University",
      program: "Computer Science",
      image: "👩‍💻",
      rating: 5,
      quote: "DreamCollegePath didn't just help me get into Stanford—they helped me discover who I am as a person. The essay coaching was transformational, and the personalized strategy made all the difference.",
      outcome: "Admitted with $40,000 merit scholarship"
    },
    {
      name: "Marcus Rodriguez",
      school: "Harvard University",
      program: "Pre-Med Track",
      image: "👨‍⚕️",
      rating: 5,
      quote: "I was overwhelmed by the application process until I found DreamCollegePath. Their systematic approach and constant support helped me stay organized and confident throughout the entire journey.",
      outcome: "Early admission acceptance"
    },
    {
      name: "Emily Thompson",
      school: "MIT",
      program: "Engineering",
      image: "👩‍🔬",
      rating: 5,
      quote: "The test prep strategies were incredible—I improved my SAT score by 200 points! But more than that, they helped me craft a compelling narrative that showcased my passion for engineering.",
      outcome: "Full merit scholarship recipient"
    },
    {
      name: "David Park",
      school: "Yale University",
      program: "Economics",
      image: "👨‍💼",
      rating: 5,
      quote: "Working with DreamCollegePath was the best investment my family made. The counselor understood my goals and helped me navigate the complex world of college admissions with expertise and care.",
      outcome: "Accepted to 8 out of 10 schools"
    },
    {
      name: "Aisha Patel",
      school: "UC Berkeley",
      program: "Bioengineering",
      image: "👩‍🎓",
      rating: 5,
      quote: "I was a first-generation college student with no idea where to start. DreamCollegePath guided my entire family through the process and helped me secure my dream acceptance and financial aid.",
      outcome: "Need-based aid covering 95% of costs"
    },
    {
      name: "Jordan Williams",
      school: "Northwestern University",
      program: "Journalism",
      image: "👨‍📝",
      rating: 5,
      quote: "The scholarship strategy coaching was phenomenal. They helped me identify and apply for scholarships I never would have found on my own. I graduated debt-free thanks to their guidance.",
      outcome: "Graduated with zero debt"
    }
  ];

  return (
    <section id="testimonials" className="bg-gradient-to-b from-muted/30 to-background" style={{paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: 'clamp(48px, 8vw, 80px)'}}>
      <div className="container">
        <div className="text-center mx-auto" style={{marginBottom: '56px'}}>
          <div className="inline-flex items-center rounded-full bg-secondary/10 text-secondary font-medium" style={{padding: '12px 20px', fontSize: '14px', marginBottom: '24px'}}>
            <Star className="mr-2" style={{width: '18px', height: '18px'}} />
            Success Stories
          </div>
          
          <h2 className="font-display font-bold text-gradient" style={{fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.2', marginBottom: '24px'}}>
            Dreams Achieved, Futures Unlocked
          </h2>
          
          <p className="text-muted-foreground mx-auto" style={{fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: '1.6', maxWidth: '65ch'}}>
            Don't just take our word for it. See how we've helped students like you 
            gain admission to their dream schools and secure the future they deserve.
          </p>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{gap: 'clamp(24px, 4vw, 40px)', marginBottom: '56px'}}>
          <div className="text-center" style={{gap: '8px'}}>
            <div className="font-bold text-primary" style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>1,000+</div>
            <div className="text-muted-foreground uppercase tracking-wide" style={{fontSize: '14px'}}>Students Helped</div>
          </div>
          <div className="text-center" style={{gap: '8px'}}>
            <div className="font-bold text-secondary" style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>98%</div>
            <div className="text-muted-foreground uppercase tracking-wide" style={{fontSize: '14px'}}>Acceptance Rate</div>
          </div>
          <div className="text-center" style={{gap: '8px'}}>
            <div className="font-bold text-accent" style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>$2.4M</div>
            <div className="text-muted-foreground uppercase tracking-wide" style={{fontSize: '14px'}}>In Scholarships</div>
          </div>
          <div className="text-center" style={{gap: '8px'}}>
            <div className="font-bold text-primary" style={{fontSize: 'clamp(28px, 3vw, 40px)'}}>4.9/5</div>
            <div className="text-muted-foreground uppercase tracking-wide" style={{fontSize: '14px'}}>Average Rating</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{gap: 'clamp(24px, 4vw, 40px)'}}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated h-full" style={{borderRadius: '18px'}}>
              <CardContent className="h-full flex flex-col" style={{padding: '26px'}}>
                <div className="flex-1" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center" style={{gap: '16px'}}>
                      <div style={{fontSize: '24px'}}>{testimonial.image}</div>
                      <div>
                        <h3 className="font-semibold" style={{fontSize: 'clamp(22px, 2.2vw, 28px)'}}>{testimonial.name}</h3>
                        <p className="text-muted-foreground" style={{fontSize: '14px'}}>{testimonial.school}</p>
                        <p className="text-primary font-medium" style={{fontSize: '14px'}}>{testimonial.program}</p>
                      </div>
                    </div>
                    <Quote className="text-primary/20" style={{width: '24px', height: '24px'}} />
                  </div>

                  {/* Rating */}
                  <div className="flex" style={{gap: '4px'}}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="fill-secondary text-secondary" style={{width: '18px', height: '18px'}} />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-muted-foreground flex-1" style={{fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: '1.6'}}>
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {/* Outcome */}
                <div className="border-t" style={{paddingTop: '16px'}}>
                  <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-medium" style={{padding: '8px 16px', fontSize: '14px'}}>
                    🎉 {testimonial.outcome}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center" style={{marginTop: '56px'}}>
          <div className="inline-flex items-center bg-gradient-to-r from-primary/5 to-accent/5 border" style={{gap: '24px', padding: '26px', borderRadius: '18px'}}>
            <div style={{fontSize: '32px'}}>🎓</div>
            <div className="text-left">
              <h3 className="font-display font-semibold" style={{fontSize: 'clamp(22px, 2.2vw, 28px)'}}>Ready to Join Our Success Stories?</h3>
              <p className="text-muted-foreground" style={{fontSize: 'clamp(16px, 1.6vw, 18px)'}}>
                Start your journey to your dream college today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;