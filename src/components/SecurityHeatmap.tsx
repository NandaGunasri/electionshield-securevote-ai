"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, AlertCircle } from "lucide-react";

const SecurityHeatmap = () => {
  const hotspots = [
    { x: 20, y: 30, severity: "high", label: "Zone A" },
    { x: 50, y: 60, severity: "medium", label: "Zone B" },
    { x: 80, y: 40, severity: "low", label: "Zone C" },
    { x: 30, y: 70, severity: "medium", label: "Zone D" },
    { x: 70, y: 20, severity: "low", label: "Zone E" },
  ];

  return (
    <div className="relative w-full h-[400px] bg-gray-900 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Simulated Map Contours */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
        <path d="M100,200 Q300,100 500,200 T900,200" fill="none" stroke="#3C91E6" strokeWidth="2" />
        <path d="M200,800 Q400,900 600,800 T800,800" fill="none" stroke="#3C91E6" strokeWidth="2" />
        <circle cx="500" cy="500" r="300" fill="none" stroke="#3C91E6" strokeWidth="1" strokeDasharray="10 10" />
      </svg>

      {/* Hotspots */}
      {hotspots.map((spot, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="absolute cursor-pointer"
          style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
        >
          <div className="relative">
            {/* Pulse Rings */}
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute -inset-8 rounded-full ${
                spot.severity === "high" ? "bg-red-500/30" :
                spot.severity === "medium" ? "bg-amber-500/30" :
                "bg-blue-500/30"
              }`}
            />
            
            {/* Core Marker */}
            <div className={`w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] ${
              spot.severity === "high" ? "bg-red-500" :
              spot.severity === "medium" ? "bg-amber-500" :
              "bg-blue-500"
            }`} />
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-white uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              {spot.label}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 p-4 glass rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Secure</span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-6 left-6 p-4 glass rounded-2xl border border-white/10 flex items-center gap-3">
        <Shield className="h-4 w-4 text-blue-400" />
        <span className="text-xs font-bold text-white tracking-widest uppercase">Live Surveillance Map</span>
      </div>
    </div>
  );
};

export default SecurityHeatmap;
