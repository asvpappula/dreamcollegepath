import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import React from "react";

const plans = [
  {
    name: "GOLD",
    color: "bg-yellow-400 text-white",
    features: [
      "50 hrs tutoring (any subject)",
      "Digital ACT/SAT 1-yr Subscription+Diagnostic Test review",
      "6 month project with Expert Mentor (Weekly 2 hr Mentor sessions)",
      "6 Counselor Session in a year (includes all UC's and 4 Common College Application Essay Support)",
    ],
  },
  {
    name: "PLATINUM",
    color: "bg-blue-600 text-white",
    features: [
      "75 hrs tutoring (any subject)",
      "Everthing in GOLD + Monthly Reports and Review meeting with ACT/SAT Expert",
      "9 month project with Expert Mentor (Weekly 2 hr Mentor sessions)",
      "9 Counselor Sessions a year (includes all UC's and 4 Common College Application Essay Support)",
    ],
  },
  {
    name: "DIAMOND",
    color: "bg-blue-900 text-white",
    features: [
      "100 hrs tutoring (any subject)",
      "Everthing in GOLD + Monthly Reports and Review meeting with ACT/SAT Expert",
      "12 month project with Expert Mentor (Weekly 2 hr Mentor sessions)",
      "12 Counselor Sessions a Year (includes all UC's and 4 Common College Application Essay Support)",
    ],
  },
];

const Subscription = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-background py-24 lg:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                Subscription Plans
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                Choose Your <span className="text-secondary">Path</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Comprehensive and personalized packages to guide you and your family through every aspect of your college admissions process.
              </p>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">Subscription Plans</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive and personalized packages to guide you and your family through every aspect of your college admissions process.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex-1 rounded-xl shadow-lg bg-white flex flex-col"
                  >
                    <div className={`rounded-t-xl py-5 text-2xl font-extrabold text-center ${plan.color}`}>{plan.name}</div>
                    <ul className="flex-1 px-8 py-6 space-y-4 text-gray-700 text-base">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="list-disc ml-4">{feature}</li>
                      ))}
                    </ul>
                    <div className="px-8 pb-8 flex justify-center">
                      <Button variant="outline" className="w-full max-w-xs">Schedule Free Consultation</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
