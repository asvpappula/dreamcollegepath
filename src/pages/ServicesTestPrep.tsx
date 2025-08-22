import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Target, 
  BookOpen, 
  Clock, 
  Award,
  GraduationCap,
  Calendar,
  Star,
  CheckCircle,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

const ServicesTestPrep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const testSchedule = [
    {
      testDate: "May 3, 2025",
      test: "SAT",
      registrationDeadline: "April 18, 2025",
      lateRegistration: "April 22, 2025",
      scoresAvailable: "May 16, 2025*"
    },
    {
      testDate: "June 7, 2025",
      test: "SAT",
      registrationDeadline: "May 23, 2025",
      lateRegistration: "May 27, 2025",
      scoresAvailable: "June 20, 2025*"
    },
    {
      testDate: "June 14, 2025",
      test: "ACT",
      registrationDeadline: "May 9, 2025",
      lateRegistration: "May 26, 2025",
      scoresAvailable: "June 24, 2025"
    },
    {
      testDate: "July 12, 2025",
      test: "ACT (Not Offered in NY)",
      registrationDeadline: "June 6, 2025",
      lateRegistration: "June 20, 2025",
      scoresAvailable: "July 22, 2025"
    },
    {
      testDate: "August 23, 2025",
      test: "SAT",
      registrationDeadline: "August 8, 2025*",
      lateRegistration: "August 12, 2025*",
      scoresAvailable: "September 5, 2025*"
    },
    {
      testDate: "September 6, 2025",
      test: "ACT",
      registrationDeadline: "August 1, 2025",
      lateRegistration: "August 19, 2025",
      scoresAvailable: "September 16, 2025*"
    },
    {
      testDate: "September 13, 2025",
      test: "SAT",
      registrationDeadline: "August 26, 2025*",
      lateRegistration: "September 2, 2025*",
      scoresAvailable: "September 26, 2025*"
    },
    {
      testDate: "October 4, 2025",
      test: "SAT",
      registrationDeadline: "September 19, 2025*",
      lateRegistration: "September 23, 2025*",
      scoresAvailable: "October 17, 2025*"
    },
    {
      testDate: "October 18, 2025",
      test: "ACT",
      registrationDeadline: "September 12, 2025",
      lateRegistration: "September 30, 2025",
      scoresAvailable: "October 28, 2025*"
    },
    {
      testDate: "November 8, 2025",
      test: "SAT",
      registrationDeadline: "October 24, 2025*",
      lateRegistration: "October 28, 2025*",
      scoresAvailable: "November 21, 2025*"
    },
    {
      testDate: "December 6, 2025",
      test: "SAT",
      registrationDeadline: "November 21, 2025*",
      lateRegistration: "November 25, 2025*",
      scoresAvailable: "December 19, 2025*"
    },
    {
      testDate: "December 13, 2025",
      test: "ACT",
      registrationDeadline: "November 7, 2025",
      lateRegistration: "November 24, 2025",
      scoresAvailable: "December 23, 2025*"
    },
    {
      testDate: "February 14, 2026",
      test: "ACT",
      registrationDeadline: "January 7, 2026",
      lateRegistration: "January 21, 2026",
      scoresAvailable: "February 24, 2026"
    },
    {
      testDate: "March 14, 2026",
      test: "SAT",
      registrationDeadline: "February 27, 2026*",
      lateRegistration: "March 3, 2026*",
      scoresAvailable: "March 27, 2026*"
    },
    {
      testDate: "April 11, 2026",
      test: "ACT",
      registrationDeadline: "March 6, 2026",
      lateRegistration: "March 24, 2026",
      scoresAvailable: "April 21, 2026*"
    },
    {
      testDate: "May 2, 2026",
      test: "SAT",
      registrationDeadline: "April 17, 2026*",
      lateRegistration: "April 21, 2026*",
      scoresAvailable: "May 15, 2026*"
    },
    {
      testDate: "June 6, 2026",
      test: "SAT",
      registrationDeadline: "May 22, 2026*",
      lateRegistration: "May 26, 2026*",
      scoresAvailable: "June 19, 2026*"
    },
    {
      testDate: "June 13, 2026",
      test: "ACT",
      registrationDeadline: "May 8, 2026",
      lateRegistration: "May 27, 2026",
      scoresAvailable: "June 23, 2026*"
    },
    {
      testDate: "July 11, 2026",
      test: "ACT (Not Offered in NY)",
      registrationDeadline: "June 5, 2026",
      lateRegistration: "June 24, 2026",
      scoresAvailable: "July 21, 2026*"
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
              <Target className="w-4 h-4 mr-2 text-secondary" />
              Comprehensive Test Preparation
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                SAT and ACT <span className="text-secondary">Test Preparation</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Comprehensive test preparation programs designed to maximize your scores 
                and strengthen your college applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                Test Prep <span className="text-gradient">Services</span>
              </h2>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    SAT and ACT tests are crucial components of college admissions, and Dream College Path helps students maximize their potential on these standardized tests. Our comprehensive approach goes beyond simple test-taking strategies to build the critical thinking, time management, and subject-specific skills needed for success.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    Our holistic test preparation program covers all sections of the SAT and ACT, including math, reading, writing, and science (for ACT). We provide comprehensive curriculum, practice tests, and personalized feedback to help students achieve their target scores. Sign up for a free consultation today and discover how our Test Prep services can help you achieve your goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Schedule */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Test <span className="text-gradient">Schedule</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay organized with our comprehensive test schedule for SAT and ACT exams.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="card-elevated overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#004B87] text-white">
                        <th className="px-6 py-4 text-left font-semibold">Test Date</th>
                        <th className="px-6 py-4 text-left font-semibold">Test</th>
                        <th className="px-6 py-4 text-left font-semibold">Registration Deadline</th>
                        <th className="px-6 py-4 text-left font-semibold">Late Registration</th>
                        <th className="px-6 py-4 text-left font-semibold">Multiple Choice Scores Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testSchedule.map((test, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium">{test.testDate}</td>
                          <td className="px-6 py-4">{test.test}</td>
                          <td className="px-6 py-4">{test.registrationDeadline}</td>
                          <td className="px-6 py-4">{test.lateRegistration}</td>
                          <td className="px-6 py-4">{test.scoresAvailable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Dates may vary. Please check official College Board and ACT websites for the most current information.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold">
                Sign Up for <span className="text-gradient">Test Prep</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Get started with our comprehensive test preparation program.
              </p>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-8 lg:p-12">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Grade Level <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {["Grade 8 or earlier", "Grade 9", "Grade 10", "Grade 11 or higher", "College"].map((grade) => (
                        <label key={grade} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gradeLevel"
                            value={grade}
                            className="text-[#004B87] focus:ring-[#004B87]"
                          />
                          <span className="text-sm">{grade}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B87] focus:border-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Which of the following test interest you the most? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {["SAT", "ACT", "Both"].map((test) => (
                        <label key={test} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="testInterest"
                            value={test}
                            className="text-[#004B87] focus:ring-[#004B87]"
                          />
                          <span className="text-sm">{test}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#004B87] hover:bg-[#003366] text-white font-semibold py-3 px-6 rounded-lg">
                    SUBMIT
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesTestPrep;