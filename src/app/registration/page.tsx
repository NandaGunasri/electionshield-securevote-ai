"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  FileText, 
  Shield, 
  Camera, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Upload,
  Fingerprint
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RegistrationWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", dob: "", address: "" });
  const totalSteps = 4;

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.dob || !formData.address) {
        alert("Please fill in all personal intelligence fields to proceed.");
        return;
      }
    }
    setStep(s => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= i ? "bg-[#0A3D62] text-white" : "bg-white text-gray-400 border border-gray-200"
                }`}>
                  {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                </div>
                {i < 4 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full ${
                    step > i ? "bg-[#0A3D62]" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold font-outfit text-[#0A3D62]">Personal Intelligence</h2>
                      <p className="text-gray-500 mt-2">Enter your basic information as it appears on your official documents.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Legal Name</label>
                        <Input 
                          placeholder="John Doe" 
                          className="rounded-xl h-12 bg-gray-50 border-none shadow-inner"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date of Birth</label>
                        <Input 
                          type="date" 
                          className="rounded-xl h-12 bg-gray-50 border-none shadow-inner"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Permanent Address</label>
                        <Input 
                          placeholder="123 Civic Street, Metropolis" 
                          className="rounded-xl h-12 bg-gray-50 border-none shadow-inner"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold font-outfit text-[#0A3D62]">Document Verification</h2>
                      <p className="text-gray-500 mt-2">Securely upload your National ID or Passport for AI verification.</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-[#3C91E6] transition-colors cursor-pointer bg-gray-50">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="font-bold text-[#0A3D62]">Click or drag to upload</h4>
                      <p className="text-xs text-gray-400 mt-2">PDF, PNG, JPG (Max 5MB)</p>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                      <Shield className="h-5 w-5 text-[#3C91E6]" />
                      <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                        Your documents are end-to-end encrypted and processed using zero-knowledge proofs. 
                        We never store your raw document image after verification.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold font-outfit text-[#0A3D62]">AI Biometric Scan</h2>
                      <p className="text-gray-500 mt-2">Face matching ensures that the person registering matches the uploaded ID.</p>
                    </div>
                    <div className="aspect-square max-w-[300px] mx-auto rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-2xl relative overflow-hidden group">
                      <Camera className="h-16 w-16 text-gray-300" />
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Start AI Scan</span>
                      </div>
                      {/* Scanning Line Animation */}
                      <motion.div 
                        animate={{ y: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_15px_blue]"
                      />
                    </div>
                    <div className="text-center">
                      <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold">READY FOR CAPTURE</Badge>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-bold font-outfit text-[#0A3D62]">Registration Complete!</h2>
                    <p className="text-gray-500 mt-2 mb-8">Your digital voter ID has been generated and encrypted.</p>
                    
                    <Card className="rounded-3xl border-none shadow-lg bg-gradient-to-br from-[#0A3D62] to-[#3C91E6] text-white p-6 max-w-sm mx-auto overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
                      <div className="flex justify-between items-start mb-12">
                        <Shield className="h-8 w-8 text-blue-200" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Digital Voter Pass</span>
                      </div>
                      <div className="text-left">
                        <h4 className="text-xl font-bold font-outfit">JOHN DOE</h4>
                        <p className="text-[10px] opacity-60 mt-1 uppercase tracking-widest">ID: EV-2026-9483-2910</p>
                        <div className="mt-8 flex justify-between items-end">
                          <div>
                            <p className="text-[8px] opacity-60 uppercase tracking-tighter">DISTRICT</p>
                            <p className="text-xs font-bold">METROPOLIS</p>
                          </div>
                          <div className="w-12 h-12 bg-white rounded-lg p-1">
                            <div className="w-full h-full bg-gray-200" /> {/* Mock QR Code */}
                          </div>
                        </div>
                      </div>
                    </Card>
                    <div className="mt-12 flex flex-col gap-3">
                      <Button className="bg-[#0A3D62] rounded-xl h-12 w-full max-w-sm mx-auto">Download Digital Pass</Button>
                      <Button variant="ghost" className="text-xs text-gray-500">Add to Apple/Google Wallet</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 4 && (
                <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    className="rounded-xl px-6"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 rounded-xl px-8"
                    onClick={nextStep}
                  >
                    {step === 3 ? "Complete Registration" : "Next Step"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegistrationWizard;
