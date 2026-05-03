"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Bell, 
  Shield, 
  User,
  ArrowUpRight,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VoterDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Shield className="h-12 w-12 text-[#3C91E6] animate-pulse" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0A3D62]">Authenticating Identity...</p>
        </div>
      </div>
    );
  }

  const registrationSteps = [
    { label: "Identity Verified", status: "complete", date: "Oct 12, 2025" },
    { label: "Address Confirmation", status: "complete", date: "Oct 15, 2025" },
    { label: "Booth Assignment", status: "current", date: "In Progress" },
    { label: "Voter ID Issued", status: "pending", date: "Pending" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold font-outfit text-[#0A3D62]">Welcome back, {user.displayName || "Alex"}</h1>
              <p className="text-gray-500">Your election readiness dashboard.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full bg-white">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <Badge className="ml-2 bg-[#3C91E6]">3</Badge>
              </Button>
              <Button className="rounded-full bg-[#0A3D62]">
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Registration Progress */}
              <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-[#0A3D62] text-white p-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl font-outfit">Registration Status</CardTitle>
                      <CardDescription className="text-blue-200">Election Cycle 2026</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1">
                      75% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 -z-0" />
                    <div className="space-y-8 relative z-10">
                      {registrationSteps.map((step, index) => (
                        <div key={index} className="flex gap-6 items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === "complete" ? "bg-emerald-500 text-white" : 
                            step.status === "current" ? "bg-[#3C91E6] text-white animate-pulse" : 
                            "bg-gray-100 text-gray-400"
                          }`}>
                            {step.status === "complete" ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className={`font-bold ${step.status === "pending" ? "text-gray-400" : "text-[#0A3D62]"}`}>{step.label}</h4>
                              <span className="text-xs text-gray-400">{step.date}</span>
                            </div>
                            {step.status === "current" && (
                              <p className="text-sm text-gray-500 mt-1">Booth assignment is being processed based on your current residential sector.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Booth Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-outfit flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#3C91E6]" />
                      Assigned Polling Booth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-2xl bg-gray-50 mb-4">
                      <h5 className="font-bold text-[#0A3D62]">Sector 14 Community Center</h5>
                      <p className="text-sm text-gray-500">Zone 4, District Metropolis</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Distance</span>
                        <span className="font-medium">1.2 km</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Travel Time</span>
                        <span className="font-medium text-[#16A34A]">4 mins (Clear)</span>
                      </div>
                    </div>
                    <Link href="/booths" className="w-full">
                      <Button className="w-full mt-6 rounded-xl bg-[#3C91E6] hover:bg-[#3C91E6]/90">
                        View on Maps
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-outfit flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#F4B400]" />
                      Document Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: "Valid National ID", checked: true },
                        { label: "Proof of Residence", checked: true },
                        { label: "Voter Registration Slip", checked: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border ${item.checked ? "bg-[#F4B400] border-[#F4B400]" : "border-gray-300"}`}>
                            {item.checked && <CheckCircle2 className="h-4 w-4 text-white" />}
                          </div>
                          <span className={`text-sm ${item.checked ? "text-gray-700" : "text-gray-400"}`}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6 rounded-xl">
                      Download Checklist
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Election Countdown */}
              <Card className="rounded-3xl border-none shadow-xl bg-gradient-to-br from-[#0A3D62] to-[#3C91E6] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <CardHeader>
                  <CardTitle className="font-outfit text-center">Election Day</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="flex justify-center gap-4 text-center">
                    {[
                      { val: "14", label: "Days" },
                      { val: "08", label: "Hrs" },
                      { val: "42", label: "Min" },
                    ].map((t, i) => (
                      <div key={i}>
                        <div className="text-4xl font-bold font-outfit">{t.val}</div>
                        <div className="text-[10px] uppercase tracking-widest text-blue-200">{t.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 rounded-2xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xs font-semibold text-blue-200 mb-1">ELECTION DATE</div>
                    <div className="font-bold">May 14, 2026</div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Alerts */}
              <Card className="rounded-3xl border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-outfit flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    Security Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <h6 className="text-sm font-bold text-emerald-900">Your Booth is Secure</h6>
                        <p className="text-xs text-emerald-700">Vertex AI Vision monitors this sector 24/7. No incidents reported.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <h6 className="text-sm font-bold text-amber-900">High Congestion Alert</h6>
                        <p className="text-xs text-amber-700">Wait times at Sector 14 are trending higher between 10 AM - 1 PM.</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/security" className="w-full">
                    <Button variant="ghost" className="w-full mt-4 text-[#3C91E6] hover:bg-blue-50">
                      View Security Map
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* AI Recommendation */}
              <Card className="rounded-3xl border-none shadow-sm bg-[#F4B400]/5 border border-[#F4B400]/10">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4B400]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#F4B400]" />
                    </div>
                    <div>
                      <h5 className="font-bold text-[#0A3D62]">Early Vote Recommended</h5>
                      <p className="text-sm text-gray-600 mt-1">Based on historical data, voting before 9 AM will save you ~45 mins of wait time.</p>
                    </div>
                  </div>
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

export default VoterDashboard;
