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
    <section id="testimonials" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Dreams Achieved, <span className="text-gradient">Futures Unlocked</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See how we've helped students like you 
            gain admission to their dream schools and secure the future they deserve.
          </p>
        </div>

        {/* Statistics Banner */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">1,000+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Students Helped</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-secondary">98%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Acceptance Rate</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-accent">$2.4M</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">In Scholarships</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Average Rating</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{testimonial.image}</div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.school}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.program}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-primary/20" />
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm leading-relaxed text-muted-foreground flex-1">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {/* Outcome */}
                <div className="pt-6 border-t">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium">
                    🎉 {testimonial.outcome}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 space-y-6">
          <div className="inline-flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border">
            <div className="text-4xl">🎓</div>
            <div className="text-left">
              <h3 className="font-display font-semibold text-lg">Ready to Join Our Success Stories?</h3>
              <p className="text-muted-foreground">Start your journey to your dream college today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;