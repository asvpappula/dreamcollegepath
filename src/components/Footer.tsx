import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="font-display font-semibold text-xl text-gradient">
                DreamCollegePath
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Empowering students to achieve their college dreams through personalized guidance, 
              expert counseling, and proven strategies for academic success.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Services</h3>
            <nav className="space-y-3">
              <a href="#college-counseling" className="block text-muted-foreground hover:text-primary transition-colors">
                College Counseling
              </a>
              <a href="#essay-coaching" className="block text-muted-foreground hover:text-primary transition-colors">
                Essay Coaching
              </a>
              <a href="#test-prep" className="block text-muted-foreground hover:text-primary transition-colors">
                Test Preparation
              </a>
              <a href="#scholarship-strategy" className="block text-muted-foreground hover:text-primary transition-colors">
                Scholarship Strategy
              </a>
              <a href="#family-support" className="block text-muted-foreground hover:text-primary transition-colors">
                Family Support
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Resources</h3>
            <nav className="space-y-3">
              <a href="#blog" className="block text-muted-foreground hover:text-primary transition-colors">
                College Blog
              </a>
              <a href="#guides" className="block text-muted-foreground hover:text-primary transition-colors">
                Application Guides
              </a>
              <a href="#webinars" className="block text-muted-foreground hover:text-primary transition-colors">
                Free Webinars
              </a>
              <a href="#checklists" className="block text-muted-foreground hover:text-primary transition-colors">
                Checklists
              </a>
              <a href="#faq" className="block text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Stay Connected</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@dreamcollegepath.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>(925) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Remote & In-Person Sessions</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-sm text-muted-foreground">
                Get college tips and updates delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1"
                  type="email"
                />
                <Button variant="cta" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 DreamCollegePath. All rights reserved.
          </div>
          
          <nav className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" className="hover:text-primary transition-colors">
              Accessibility
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;