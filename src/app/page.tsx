"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Shield, Brain, MapPin, AlertCircle, BarChart3, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    {
      title: "AI Civic Assistant",
      description: "Gemini-powered multilingual chatbot for voter registration and election guidance.",
      icon: Brain,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Surveillance Intelligence",
      description: "Real-time CCTV monitoring with Vertex AI Vision for anomaly and violence detection.",
      icon: Shield,
      color: "bg-indigo-500/10 text-indigo-600",
    },
    {
      title: "Smart Booth Locator",
      description: "Google Maps integration with real-time congestion and wait-time predictions.",
      icon: MapPin,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: "Emergency Response",
      description: "Instant SOS system and automated police alerts for polling station security.",
      icon: AlertCircle,
      color: "bg-rose-500/10 text-rose-600",
    },
    {
      title: "Admin Control Center",
      description: "National-scale dashboard for incident management and fraud intelligence.",
      icon: BarChart3,
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "Accessible Participation",
      description: "WCAG-compliant interfaces with voice navigation and regional language support.",
      icon: Users,
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  return (
    <main className="flex-1">
      <Navbar />
      <Hero />

      {/* National Dashboard Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Monitoring Active
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit text-[#0A3D62] leading-[1.1]">
                Real-Time <br />
                <span className="text-[#3C91E6]">National Security</span> <br />
                Intelligence.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ElectionShield provides government administrators with a bird's-eye view of the democratic process. 
                From booth-level surveillance to regional registration trends, we ensure transparency at every scale.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#0A3D62]">142K+</div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Monitored Booths</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#3C91E6]">99.8%</div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Security Uptime</div>
                </div>
              </div>
              <Link href="/admin">
                <Button className="rounded-full bg-[#0A3D62] h-12 px-8">
                  Explore Command Center
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#3C91E6]/20 to-transparent blur-3xl -z-10 rounded-full" />
              <div className="rounded-[2.5rem] bg-gray-900 border border-white/10 shadow-2xl overflow-hidden p-2">
                <div className="aspect-[4/3] rounded-[2rem] bg-[#020817] relative overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3C91E6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-[#3C91E6]/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-[#3C91E6]/10 rounded-full" />
                  
                  {/* Hotspots */}
                  {[
                    { x: 30, y: 40, s: 'bg-emerald-500' },
                    { x: 60, y: 30, s: 'bg-emerald-500' },
                    { x: 50, y: 70, s: 'bg-[#F4B400]' },
                    { x: 80, y: 60, s: 'bg-emerald-500' },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className={`absolute w-3 h-3 rounded-full ${dot.s} shadow-[0_0_15px_currentColor]`}
                      style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                    />
                  ))}

                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Status Report</div>
                        <div className="text-xl font-bold text-white">Metropolis District A</div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">SECURE</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A3D62 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-[#0A3D62] mb-4">
              Integrated Democracy Protection.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A comprehensive ecosystem designed to educate, protect, and empower 
              every stakeholder in the democratic process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-sm`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A3D62] mb-4 font-outfit">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
                <Link 
                  href={
                    feature.title === "AI Civic Assistant" ? "/education" :
                    feature.title === "Surveillance Intelligence" ? "/security" :
                    feature.title === "Smart Booth Locator" ? "/booths" :
                    feature.title === "Emergency Response" ? "/security" :
                    feature.title === "Admin Control Center" ? "/admin" :
                    "/registration"
                  }
                  className="mt-8 flex items-center gap-2 text-[#3C91E6] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn More <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-[#0A3D62] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3C91E6]/5 -skew-x-12 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#3C91E6]/5 -skew-x-12 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold font-outfit mb-8 leading-tight">
                Built for Public Trust & <br />National Security.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Government-Grade Encryption", desc: "Zero-trust architecture with end-to-end data encryption." },
                  { title: "Real-time Fraud Intelligence", desc: "AI-driven anomaly detection to prevent voter intimidation." },
                  { title: "District-Level Transparency", desc: "Open analytics dashboards for verified election officers." },
                  { title: "Inclusive Digital Rights", desc: "Accessibility-first design for rural and senior populations." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 w-6 h-6 rounded-lg bg-[#3C91E6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3C91E6]/20">
                      <Shield className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-[3rem] bg-white/5 border border-white/10 p-12 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent" />
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-8xl font-bold text-[#3C91E6] mb-4 font-outfit"
                  >
                    99.9%
                  </motion.div>
                  <div className="text-blue-100/60 font-bold uppercase tracking-[0.3em] text-sm">System Reliability</div>
                  <div className="mt-12 grid grid-cols-2 gap-8">
                    <div className="text-left">
                      <div className="text-2xl font-bold">256-bit</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Encryption</div>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold">50ms</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Latency</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

