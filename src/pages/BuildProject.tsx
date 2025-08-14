import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const BuildProject = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 hero-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Build Your Project
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Create a personalized project to enhance your college application and showcase your skills.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Form */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <img 
                      src="/Screenshot 2025-08-07 at 1.03.28 PM.png" 
                      alt="Student Enrollment Form" 
                      className="w-full h-auto rounded-lg shadow-lg" 
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Right: Information */}
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">Why Build a Project?</h2>
                <p className="text-lg text-muted-foreground">
                  Creating a meaningful project demonstrates initiative, creativity, and dedication to college admissions officers. 
                  It helps you stand out from other applicants and showcases your unique talents and interests.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Benefits:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Strengthen your college application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Develop valuable skills for college and beyond</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Explore your interests in a structured way</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Work with expert mentors in your field of interest</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Create something meaningful to discuss in interviews</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full md:w-auto mt-6" 
                  size="lg" 
                  onClick={() => setShowSignupForm(!showSignupForm)}
                >
                  Start Your Project
                </Button>
                
                {showSignupForm && (
                  <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Sign-Up & Student Enrollment</h3>
                    <p className="text-sm text-muted-foreground mb-6">Join Dream College Path by signing up and filling out our student enrollment form. Provide your personal details, areas of interest, and connect with us to get started.</p>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="firstName" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="lastName" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="schoolName" className="block text-sm font-medium mb-1">School Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="schoolName" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Grade Level <span className="text-red-500">*</span></label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="radio" id="grade8" name="gradeLevel" className="mr-2" />
                            <label htmlFor="grade8">Grade 8 or earlier</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="grade9" name="gradeLevel" className="mr-2" />
                            <label htmlFor="grade9">Grade 9</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="grade10" name="gradeLevel" className="mr-2" />
                            <label htmlFor="grade10">Grade 10</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="grade11" name="gradeLevel" className="mr-2" />
                            <label htmlFor="grade11">Grade 11 or higher</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="college" name="gradeLevel" className="mr-2" />
                            <label htmlFor="college">College</label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          id="phoneNumber" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
                        <input 
                          type="password" 
                          id="password" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Submit
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      

    </div>
  );
};

export default BuildProject;