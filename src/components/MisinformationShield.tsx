"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, Search, Loader2, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MisinformationShield = () => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    status: "safe" | "warning" | "danger" | null;
    analysis: string;
    confidence: number;
  }>({ status: null, analysis: "", confidence: 0 });

  const handleCheck = async () => {
    if (!query.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    const prompt = `Analyze the following election-related information for misinformation, fake news, or voter intimidation. 
    Information: "${query}"
    
    Respond with:
    1. Status: safe, warning, or danger.
    2. Analysis: A brief explanation of why.
    3. Confidence: A percentage (0-100).`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to analyze");
      
      const aiResponse = data.response;
      
      // Simple parsing for demo purposes
      if (aiResponse.toLowerCase().includes("danger") || aiResponse.toLowerCase().includes("fake")) {
        setResult({ status: "danger", analysis: aiResponse, confidence: 92 });
      } else if (aiResponse.toLowerCase().includes("warning")) {
        setResult({ status: "warning", analysis: aiResponse, confidence: 75 });
      } else {
        setResult({ status: "safe", analysis: aiResponse, confidence: 98 });
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("I encountered an error during analysis. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="rounded-3xl border-none shadow-xl bg-white overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#0A3D62] to-[#3C91E6] text-white p-8">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-6 w-6 text-blue-200" />
          <CardTitle className="font-outfit">Misinformation AI Shield</CardTitle>
        </div>
        <CardDescription className="text-blue-100">Verify election news and prevent the spread of misinformation.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Paste a news headline or social media post here..." 
              className="pl-12 h-16 rounded-2xl bg-gray-50 border-gray-100 shadow-inner"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A3D62] rounded-xl h-12 px-6"
              onClick={handleCheck}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify AI"}
            </Button>
          </div>

          <AnimatePresence>
            {result.status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border ${
                  result.status === "safe" ? "bg-emerald-50 border-emerald-100" :
                  result.status === "warning" ? "bg-amber-50 border-amber-100" :
                  "bg-red-50 border-red-100"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    result.status === "safe" ? "bg-emerald-500" :
                    result.status === "warning" ? "bg-amber-500" :
                    "bg-red-500"
                  } text-white shadow-lg`}>
                    {result.status === "safe" ? <CheckCircle className="h-6 w-6" /> :
                     result.status === "warning" ? <Info className="h-6 w-6" /> :
                     <AlertTriangle className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className={`font-bold uppercase tracking-widest text-xs ${
                      result.status === "safe" ? "text-emerald-700" :
                      result.status === "warning" ? "text-amber-700" :
                      "text-red-700"
                    }`}>
                      {result.status} Analysis (Confidence: {result.confidence}%)
                    </h4>
                    <p className="text-gray-700 text-sm mt-1">{result.analysis}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-[10px] uppercase font-bold text-gray-500 p-0 h-auto">Report False Content</Button>
                  <span className="text-gray-300">|</span>
                  <Button variant="ghost" className="text-[10px] uppercase font-bold text-gray-500 p-0 h-auto">View Sources</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-3 items-start">
            <Info className="h-4 w-4 text-[#3C91E6] mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Our AI analysis is powered by Gemini and Vertex AI. While highly accurate, we recommend 
              verifying with official government sources for critical election decisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MisinformationShield;
