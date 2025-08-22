import { useState } from "react";
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    graduationYear: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        graduationYear: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-background to-muted/30" style={{paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: 'clamp(48px, 8vw, 80px)'}}>
      <div className="container">
        <div className="text-center mx-auto" style={{marginBottom: '56px'}}>
          <div className="inline-flex items-center rounded-full bg-accent/10 text-accent font-medium" style={{padding: '12px 20px', fontSize: '14px', marginBottom: '24px'}}>
            <MessageSquare className="mr-2" style={{width: '18px', height: '18px'}} />
            Get In Touch
          </div>
          
          <h2 className="font-display font-bold" style={{fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: '1.2', marginBottom: '24px'}}>
            Ready to Start Your <span className="text-gradient">College Journey?</span>
          </h2>
          
          <p className="text-muted-foreground mx-auto" style={{fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: '1.6', maxWidth: '65ch'}}>
            Schedule your free consultation today and discover how we can help you 
            achieve your college dreams. No pressure, just expert guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3" style={{gap: 'clamp(24px, 4vw, 40px)'}}>
          {/* Contact Info */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
            <div>
              <h3 className="font-display font-semibold" style={{fontSize: 'clamp(22px, 2.2vw, 28px)', marginBottom: '24px'}}>Get in Touch</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div className="flex items-start" style={{gap: '16px'}}>
                  <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center" style={{width: '48px', height: '48px'}}>
                    <Mail className="text-primary" style={{width: '20px', height: '20px'}} />
                  </div>
                  <div>
                    <h4 className="font-medium" style={{fontSize: 'clamp(16px, 1.6vw, 18px)'}}>Email Us</h4>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>info@dreamcollegepath.com</p>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start" style={{gap: '16px'}}>
                  <div className="rounded-lg bg-gradient-to-r from-secondary/10 to-secondary-light/10 flex items-center justify-center" style={{width: '48px', height: '48px'}}>
                    <Phone className="text-secondary" style={{width: '20px', height: '20px'}} />
                  </div>
                  <div>
                    <h4 className="font-medium" style={{fontSize: 'clamp(16px, 1.6vw, 18px)'}}>Call Us</h4>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>+1 925-307-7711</p>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start" style={{gap: '16px'}}>
                  <div className="rounded-lg bg-gradient-to-r from-accent/10 to-accent-light/10 flex items-center justify-center" style={{width: '48px', height: '48px'}}>
                    <MapPin className="text-accent" style={{width: '20px', height: '20px'}} />
                  </div>
                  <div>
                    <h4 className="font-medium" style={{fontSize: 'clamp(16px, 1.6vw, 18px)'}}>Meet With Us</h4>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>Virtual & In-Person Sessions</p>
                    <p className="text-muted-foreground" style={{fontSize: '14px'}}>Nationwide availability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <Card className="card-elevated" style={{borderRadius: '18px'}}>
              <CardContent style={{padding: '26px'}}>
                <h4 className="font-medium" style={{fontSize: 'clamp(16px, 1.6vw, 18px)', marginBottom: '16px'}}>Office Hours</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-muted-foreground" style={{fontSize: '14px', marginTop: '16px'}}>
                  All times Eastern Standard Time
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <h4 className="font-medium" style={{fontSize: 'clamp(16px, 1.6vw, 18px)'}}>Quick Actions</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <Button 
                  className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                  variant="outline" 
                  style={{minHeight: '44px'}}
                  onClick={() => window.open('https://calendly.com/dreamcollegepath/30min?month=2025-08', '_blank')}
                >
                  <Calendar className="mr-2" style={{width: '18px', height: '18px'}} />
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(925) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-sm font-medium">
                        What can we help you with? *
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college-counseling">College Counseling</SelectItem>
                          <SelectItem value="essay-coaching">Essay Coaching</SelectItem>
                          <SelectItem value="test-prep">Test Preparation</SelectItem>
                          <SelectItem value="scholarship-strategy">Scholarship Strategy</SelectItem>
                          <SelectItem value="family-support">Family Support</SelectItem>
                          <SelectItem value="other">Other / Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="graduationYear" className="text-sm font-medium">
                        Expected Graduation Year
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("graduationYear", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Tell us about your goals *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share your college goals, concerns, or any specific questions you have..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero"
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and consent to 
                    being contacted about our services. We never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;