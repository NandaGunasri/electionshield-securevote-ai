"use client";

import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Activity, 
  Globe, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  CheckCircle,
  MessageSquare,
  Cpu,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import SecurityHeatmap from "@/components/SecurityHeatmap";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {

  const stats = [
    { label: "Total Registered", value: "48.2M", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Active Booths", value: "142,500", change: "99.8%", icon: Activity, color: "text-emerald-600" },
    { label: "Open Incidents", value: "24", change: "-5", icon: ShieldAlert, color: "text-red-600" },
    { label: "Public Trust", value: "94%", change: "+2%", icon: Globe, color: "text-amber-600" },
  ];

  const registrationData = [
    { district: "Metropolis", count: 12.4 },
    { district: "Green Valley", count: 8.2 },
    { district: "Old Port", count: 15.1 },
    { district: "Highlands", count: 6.5 },
    { district: "Lakeside", count: 6.0 },
  ];

  const sentimentData = [
    { name: "Positive", value: 75, color: "#10b981" },
    { name: "Neutral", value: 20, color: "#3C91E6" },
    { name: "Misinformation", value: 5, color: "#ef4444" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-[#0A3D62] text-white border-none">GOVERNMENT ACCESS ONLY</Badge>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">SYSTEM LIVE</Badge>
              </div>
              <h1 className="text-3xl font-bold font-outfit text-[#0A3D62]">National Election Command Center</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl bg-white" onClick={() => alert("National Election Report is being generated and will download shortly.")}>
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button className="rounded-xl bg-[#0A3D62]" onClick={() => alert("Regional filters applied. View updated district analytics below.")}>
                <Filter className="mr-2 h-4 w-4" />
                Regional Filter
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none font-bold">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#0A3D62] mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Charts */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-3xl border-none shadow-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-outfit">Security Intelligence Heatmap</CardTitle>
                    <CardDescription>Live threat assessment and booth security status</CardDescription>
                  </div>
                  <Globe className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent className="pt-4">
                  <SecurityHeatmap />
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none shadow-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-outfit">Regional Registration Analytics</CardTitle>
                    <CardDescription>Voter enrollment density across top 5 districts (Millions)</CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={registrationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="count" fill="#0A3D62" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Sentiment AI */}
            <Card className="rounded-3xl border-none shadow-sm h-full">
              <CardHeader>
                <CardTitle className="text-lg font-outfit">Public Sentiment AI</CardTitle>
                <CardDescription>Real-time social & civic health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {sentimentData.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-bold text-[#0A3D62]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Incidents & AI Fraud Detection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-3xl border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-outfit">Live Incident Management</CardTitle>
                  <CardDescription>Consolidated security and fraud alerts</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs" onClick={() => alert("Consolidated incident logs are being loaded...")}>VIEW ALL</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Fraud Attempt", loc: "Booth 41, Sector 9", time: "2m ago", severity: "High", status: "Active" },
                    { type: "Congestion", loc: "Sector 14 Center", time: "15m ago", severity: "Medium", status: "Resolved" },
                    { type: "System Alert", loc: "Main Server Node", time: "1h ago", severity: "Low", status: "Monitoring" },
                  ].map((inc, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          inc.severity === "High" ? "bg-red-100 text-red-600" : 
                          inc.severity === "Medium" ? "bg-amber-100 text-amber-600" : 
                          "bg-blue-100 text-blue-600"
                        }`}>
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0A3D62] text-sm">{inc.type}</h4>
                          <p className="text-xs text-gray-500">{inc.loc} • {inc.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={
                          inc.status === "Active" ? "border-red-200 text-red-600 bg-red-50" :
                          inc.status === "Resolved" ? "border-emerald-200 text-emerald-600 bg-emerald-50" :
                          "border-blue-200 text-blue-600 bg-blue-50"
                        }>
                          {inc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-xl bg-[#0A3D62] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3C91E6]/10 rounded-full -translate-y-32 translate-x-32" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-[#3C91E6]" />
                  <Badge className="bg-[#3C91E6]/20 text-[#3C91E6] border-[#3C91E6]/30 text-[10px]">VERTEX AI ENGINE</Badge>
                </div>
                <CardTitle className="text-xl font-outfit">Fraud Pattern Recognition</CardTitle>
                <CardDescription className="text-blue-200">Neural network analysis of voting anomalies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold">Anomaly Score</span>
                      <span className="text-xs text-emerald-400 font-bold">Normal (4.2%)</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "4.2%" }}
                        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-blue-300 uppercase tracking-widest mb-1">Double Voting</div>
                      <div className="text-lg font-bold">0 Detected</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-blue-300 uppercase tracking-widest mb-1">Identity Theft</div>
                      <div className="text-lg font-bold">0 Detected</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[#3C91E6] hover:bg-[#3C91E6]/90 rounded-xl font-bold"
                    onClick={() => alert("National Integrity Scan initiated. Vertex AI is cross-referencing biometric logs across all sectors...")}
                  >
                    Run National Integrity Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

