"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  UserPlus, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MisinformationShield from "@/components/MisinformationShield";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EducationPage = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Voter Registration",
      desc: "The first step to participate in democracy is ensuring you are registered. You'll need a valid national ID and proof of residence.",
      icon: UserPlus,
      color: "bg-blue-500",
      details: ["Check eligibility", "Gather documents", "Submit online or in-person"]
    },
    {
      title: "Locate Your Booth",
      desc: "Use our Smart Booth Finder to find your assigned polling station. Check congestion heatmaps to choose the best time to vote.",
      icon: ShieldCheck,
      color: "bg-[#0A3D62]",
      details: ["Search by Zip Code", "View accessibility features", "Check wait times"]
    },
    {
      title: "Polling Day Process",
      desc: "On election day, bring your ID. AI surveillance (Vertex AI) ensures your safety at the booth. Follow officer instructions.",
      icon: CheckCircle2,
      color: "bg-emerald-500",
      details: ["Identity verification", "Biometric check (if applicable)", "Casting the vote"]
    }
  ];

  const faqs = [
    { q: "How do I know if I'm eligible?", a: "Generally, citizens aged 18+ on the date of the election are eligible. Check our Eligibility Tool for specific criteria." },
    { q: "What documents are required?", a: "A valid National ID, Passport, or Government-issued photo ID is required. Some regions also require proof of address." },
    { q: "Is my vote secure?", a: "Yes, ElectionShield uses end-to-end encryption and AI surveillance to prevent fraud and ensure booth security." },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#3C91E6] text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="h-3 w-3" />
              Civic Learning Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit text-[#0A3D62] mb-4">Master the Election Process.</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to know about participating in the upcoming election, powered by Shieldy AI.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content: Interactive Tutorial */}
            <div className="lg:col-span-2 space-y-12">
              <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex gap-2">
                      {tutorialSteps.map((_, i) => (
                        <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${i === currentStep ? "bg-[#3C91E6]" : "bg-gray-100"}`} />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-[10px] tracking-tighter">STEP {currentStep + 1} OF 3</Badge>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-3xl ${tutorialSteps[currentStep].color} flex items-center justify-center text-white shadow-lg`}>
                          {(() => {
                            const Icon = tutorialSteps[currentStep].icon;
                            return <Icon className="h-10 w-10" />;
                          })()}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold font-outfit text-[#0A3D62]">{tutorialSteps[currentStep].title}</h2>
                          <p className="text-gray-500 mt-2 leading-relaxed">{tutorialSteps[currentStep].desc}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mt-8">
                        {tutorialSteps[currentStep].details.map((detail, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <span className="text-sm font-medium text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                    <Button 
                      variant="ghost" 
                      className="rounded-xl px-6"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button 
                      className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 rounded-xl px-8"
                      onClick={() => {
                        if (currentStep < tutorialSteps.length - 1) {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                    >
                      {currentStep === tutorialSteps.length - 1 ? "Finish Tutorial" : "Continue"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Multimedia Support */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-none shadow-sm bg-[#0A3D62] text-white p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                  <PlayCircle className="h-12 w-12 text-[#3C91E6] mb-6" />
                  <h3 className="text-xl font-bold font-outfit mb-2">Video Guides</h3>
                  <p className="text-blue-200 text-sm mb-6">Watch regional language tutorials on how to cast your vote securely.</p>
                  <Button className="bg-white text-[#0A3D62] hover:bg-white/90 rounded-xl w-full" onClick={() => alert("Video guides are being prepared. You will be notified when they are ready for viewing.")}>Watch Now</Button>
                </Card>
                <Card className="rounded-3xl border-none shadow-sm bg-emerald-600 text-white p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                  <Globe className="h-12 w-12 text-emerald-200 mb-6" />
                  <h3 className="text-xl font-bold font-outfit mb-2">Regional Support</h3>
                  <p className="text-emerald-100 text-sm mb-6">Access election materials in 12+ regional languages for better clarity.</p>
                  <Button className="bg-white text-emerald-600 hover:bg-white/90 rounded-xl w-full" onClick={() => alert("Language settings opened. Select your preferred regional dialect.")}>Change Language</Button>
                </Card>
              </div>
            </div>

            {/* Sidebar: Tools & FAQs */}
            <div className="space-y-8">
              <Card className="rounded-3xl border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-outfit flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#3C91E6]" />
                    Eligibility Checker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-xs text-gray-500">Quickly verify if you can vote in the 2026 National Elections.</p>
                    <Button variant="outline" className="w-full rounded-xl border-blue-100 text-[#3C91E6] hover:bg-blue-50" onClick={() => alert("Eligibility tool is loading. Please have your ID ready.")}>Start Check</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-outfit flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#F4B400]" />
                    Common Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="group cursor-pointer">
                      <h4 className="text-sm font-bold text-[#0A3D62] mb-1 group-hover:text-[#3C91E6] transition-colors">{faq.q}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-xs text-[#3C91E6] mt-4" onClick={() => alert("Loading full FAQ database...")}>View All FAQs</Button>
                </CardContent>
              </Card>

              <MisinformationShield />

              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Calendar className="h-6 w-6 text-[#3C91E6]" />
                </div>
                <h4 className="font-bold text-[#0A3D62] text-sm">Key Dates</h4>
                <p className="text-xs text-gray-500 mt-1">Registration ends in 14 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EducationPage;

