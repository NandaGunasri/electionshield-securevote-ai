"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Lock, User } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3C91E6]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0A3D62]/5 blur-[120px] rounded-full animate-pulse" />
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0A3D62 1px, transparent 1px), linear-gradient(90deg, #0A3D62 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white shadow-xl shadow-[#0A3D62]/5 border border-[#0A3D62]/5 mb-10"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                  <User className="h-3 w-3 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-gray-200 mx-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A3D62]">
              Trusted by 48M+ Citizens
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="text-6xl md:text-8xl font-bold font-outfit tracking-tighter text-[#0A3D62] mb-8 leading-[0.9]"
          >
            Defending <br />
            <span className="text-gradient">Democracy</span> <br />
            with Intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed font-medium"
          >
            The world's first AI-powered platform designed to educate voters, 
            secure polling stations, and ensure total election transparency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="w-full h-16 px-10 bg-[#0A3D62] hover:bg-[#0A3D62]/95 text-white rounded-full text-xl shadow-2xl shadow-[#0A3D62]/30 group">
                Create National ID
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-16 px-10 rounded-full text-xl border-[#0A3D62]/10 bg-white/50 backdrop-blur-sm hover:bg-white transition-all"
              onClick={() => alert("System Overview video coming soon! Check the documentation for now.")}
            >
              Watch System Overview
            </Button>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Cpu, label: "Gemini AI Civic Shield", color: "text-[#3C91E6]" },
              { icon: ShieldCheck, label: "Vertex AI Vision Security", color: "text-emerald-500" },
              { icon: Lock, label: "Zero-Trust Infrastructure", color: "text-[#0A3D62]" },
              { icon: ShieldCheck, label: "Real-time Fraud Defense", color: "text-[#F4B400]" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`p-4 rounded-2xl bg-gray-50 ${item.color}`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
