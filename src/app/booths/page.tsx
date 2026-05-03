"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Clock, 
  Navigation, 
  Info, 
  ChevronRight,
  Filter,
  Users,
  Accessibility
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BoothFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const booths = [
    { 
      id: 1, 
      name: "Sector 14 Community Center", 
      address: "123 Civic Ave, Metropolis", 
      waitTime: "12 min", 
      status: "optimal", 
      distance: "0.8 km",
      facilities: ["Wheelchair Access", "Senior Priority"]
    },
    { 
      id: 2, 
      name: "Metropolis Public Library", 
      address: "45 Knowledge St, Metropolis", 
      waitTime: "45 min", 
      status: "congested", 
      distance: "1.5 km",
      facilities: ["Wheelchair Access"]
    },
    { 
      id: 3, 
      name: "Green Valley High School", 
      address: "78 Education Blvd, Metropolis", 
      waitTime: "5 min", 
      status: "clear", 
      distance: "2.1 km",
      facilities: ["Parking", "Refreshments"]
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 pt-24">
        <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-120px)] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
          {/* Sidebar - List View */}
          <div className="lg:col-span-4 flex flex-col gap-6 pb-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-outfit text-[#0A3D62]">Booth Intelligence</h1>
              <p className="text-gray-500 text-sm">Find your assigned polling station and check real-time congestion.</p>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Enter your Zip Code or Address" 
                  className="pl-10 rounded-xl bg-white border-gray-100 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full bg-white text-xs">
                  <Filter className="mr-2 h-3 w-3" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-white text-xs">
                  <Accessibility className="mr-2 h-3 w-3" />
                  Accessible Only
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-4 pb-4">
                {booths.map((booth) => (
                  <Card key={booth.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3C91E6] group-hover:bg-[#3C91E6] group-hover:text-white transition-colors">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <Badge className={
                          booth.status === "clear" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          booth.status === "optimal" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }>
                          {booth.waitTime} wait
                        </Badge>
                      </div>
                      <h3 className="font-bold text-[#0A3D62] mb-1">{booth.name}</h3>
                      <p className="text-xs text-gray-500 mb-4">{booth.address}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                          <Navigation className="h-3 w-3" />
                          {booth.distance}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                          <Users className="h-3 w-3" />
                          Moderate Crowd
                        </div>
                      </div>

                      <Button 
                        className="w-full rounded-xl bg-gray-50 hover:bg-gray-100 text-[#0A3D62] border-none shadow-none text-xs font-bold"
                        onClick={() => alert(`Showing directions to ${booth.name}. Estimated travel time: ${booth.waitTime}.`)}
                      >
                        Direction & Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Map View - Simulation */}
          <div className="lg:col-span-8 bg-gray-200 rounded-[2rem] overflow-hidden relative border border-gray-200 shadow-inner mb-8 lg:mb-8">
            {/* Simulated Map Background (SVG/Pattern) */}
            <div className="absolute inset-0 bg-[#e5e7eb] opacity-50" 
              style={{ backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
            </div>

            {/* Simulated Map UI */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-end">
                <div className="p-2 bg-white rounded-xl shadow-lg flex flex-col gap-2 pointer-events-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => alert("Zooming in...")}><PlusIcon className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => alert("Zooming out...")}><MinusIcon className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Map Markers */}
              {booths.map((booth, i) => (
                <motion.div
                  key={booth.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="absolute cursor-pointer pointer-events-auto"
                  style={{ top: `${20 + i * 25}%`, left: `${30 + i * 20}%` }}
                >
                  <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      <span className="text-xs font-bold text-[#0A3D62]">{booth.name}</span>
                      <div className="text-[10px] text-[#3C91E6] font-bold">{booth.waitTime} wait</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-4 border-white shadow-xl flex items-center justify-center ${
                      booth.status === "congested" ? "bg-amber-500" : "bg-[#3C91E6]"
                    }`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-center">
                <Card className="rounded-full bg-white/90 backdrop-blur-md border-none shadow-2xl px-6 py-3 pointer-events-auto">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-gray-600">Clear (&lt;10m)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-xs font-bold text-gray-600">Optimal (10-30m)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-xs font-bold text-gray-600">Congested (&gt;30m)</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

// Helper Icons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default BoothFinder;
