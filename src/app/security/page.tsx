"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  AlertCircle, 
  Users, 
  Map as MapIcon, 
  Activity,
  Bell,
  Lock,
  Smartphone,
  PhoneCall,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SecurityDashboard = () => {

  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: "Crowd Surge", location: "Sector 14 - Gate A", time: "10:42 AM", severity: "medium", status: "monitoring" },
    { id: 2, type: "Unauthorized Entry", location: "Booth 12 - Restricted Area", time: "10:38 AM", severity: "high", status: "responding" },
    { id: 3, type: "System Check", location: "All Stations", time: "10:30 AM", severity: "low", status: "resolved" },
  ]);

  const data = [
    { time: "08:00", crowd: 20, risk: 5 },
    { time: "09:00", crowd: 45, risk: 8 },
    { time: "10:00", crowd: 85, risk: 15 },
    { time: "11:00", crowd: 110, risk: 35 },
    { time: "12:00", crowd: 90, risk: 20 },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020817] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-outfit tracking-tight">Security Command Center</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-gray-400 text-sm">Vertex AI Vision: Active Surveillance (District Metropolis)</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                className="rounded-full bg-red-600 hover:bg-red-700 text-white animate-pulse"
                onClick={() => alert("EMERGENCY SOS SIGNAL SENT! Security forces have been dispatched to District Metropolis.")}
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Emergency SOS
              </Button>
              <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10">
                <Activity className="mr-2 h-4 w-4 text-blue-400" />
                System Status
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Surveillance Feed */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-black/40 border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-400" />
                      Live AI Feed: Sector 14
                    </CardTitle>
                    <CardDescription className="text-gray-500">Processing 60fps with Anomaly Detection</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    HD STREAM
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 relative flex items-center justify-center overflow-hidden">
                    {/* Simulated Surveillance Grid */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div className="h-full w-full border border-blue-500/30 grid grid-cols-4 grid-rows-4">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="border-[0.5px] border-blue-500/20" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Mock Detection Boxes */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-emerald-500 rounded-lg">
                      <span className="absolute -top-6 left-0 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded">Person: Voter_821 (98%)</span>
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 w-40 h-32 border-2 border-blue-500 rounded-lg">
                      <span className="absolute -top-6 left-0 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded">Object: Booth_Structure (99%)</span>
                    </div>

                    {/* Scanning Line Animation */}
                    <motion.div 
                      animate={{ y: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_15px_blue]"
                    />

                    <div className="text-center text-gray-600 flex flex-col items-center">
                      <Loader2 className="h-10 w-10 animate-spin mb-2 text-blue-500/30" />
                      <span className="text-sm font-mono tracking-tighter">SECURE STREAM ENCRYPTED</span>
                    </div>

                    {/* Corner Data */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono">
                      REC: 2026-05-14 10:45:12 <br />
                      FPS: 59.8 | BITRATE: 12.4 Mbps
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Analytics */}
                <Card className="bg-black/40 border-white/10 rounded-3xl backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Booth Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorCrowd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3C91E6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3C91E6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="time" stroke="#ffffff50" fontSize={10} />
                        <YAxis stroke="#ffffff50" fontSize={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#020817", border: "1px solid #ffffff10" }}
                          itemStyle={{ color: "#3C91E6" }}
                        />
                        <Area type="monotone" dataKey="crowd" stroke="#3C91E6" fillOpacity={1} fill="url(#colorCrowd)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Threat Intelligence */}
                <Card className="bg-black/40 border-white/10 rounded-3xl backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-gray-400">Crowd Density</span>
                          <span className="text-xs text-blue-400">Moderate</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-blue-500 shadow-[0_0_10px_#3C91E6]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-gray-400">Behavioral Risk</span>
                          <span className="text-xs text-emerald-400">Low</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[15%] bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-gray-400">Fraud Probability</span>
                          <span className="text-xs text-amber-400">Stable</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full w-[25%] bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Alerts Panel */}
            <div className="space-y-8">
              <Card className="bg-black/40 border-white/10 rounded-3xl backdrop-blur-xl h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5 text-red-500" />
                    Real-time Alerts
                  </CardTitle>
                  <CardDescription className="text-gray-500">Instant AI Anomaly Detections</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[500px] px-6">
                    <div className="space-y-4 pb-6">
                      {activeAlerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`p-4 rounded-2xl border ${
                            alert.severity === "high" ? "bg-red-500/10 border-red-500/20" : 
                            alert.severity === "medium" ? "bg-amber-500/10 border-amber-500/20" : 
                            "bg-blue-500/10 border-blue-500/20"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm">{alert.type}</h4>
                            <span className="text-[10px] text-gray-500">{alert.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-3">{alert.location}</p>
                          <div className="flex justify-between items-center">
                            <Badge className={
                              alert.status === "responding" ? "bg-red-500 text-white" : 
                              alert.status === "monitoring" ? "bg-amber-500 text-white" : 
                              "bg-emerald-500 text-white"
                            }>
                              {alert.status.toUpperCase()}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 text-[10px] text-blue-400">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10 rounded-3xl backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Command Protocol</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button 
                    className="h-16 flex-col gap-1 bg-white/5 border-white/10 hover:bg-white/10 rounded-2xl"
                    onClick={() => alert("Polling Booth Sector 14 has been remotely locked.")}
                  >
                    <Lock className="h-4 w-4 text-blue-400" />
                    <span className="text-[10px]">Lock Booth</span>
                  </Button>
                  <Button 
                    className="h-16 flex-col gap-1 bg-white/5 border-white/10 hover:bg-white/10 rounded-2xl"
                    onClick={() => alert("Officer Alert signal sent to all patrolling units.")}
                  >
                    <Smartphone className="h-4 w-4 text-emerald-400" />
                    <span className="text-[10px]">Officer Alert</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SecurityDashboard;
