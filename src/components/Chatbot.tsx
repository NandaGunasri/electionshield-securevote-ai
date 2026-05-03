"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getElectionAssistantPrompt } from "@/lib/gemini";
import { useVoice } from "@/hooks/useVoice";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Shieldy, your ElectionShield Assistant. How can I help you with the election process today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isListening, toggleListening, speak } = useVoice((text) => {
    setInput(text);
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (customInput?: string) => {
    const userMessage = customInput || input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    const prompt = getElectionAssistantPrompt(userMessage);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      // The API now returns status: success or specific error codes
      // But we always display the 'response' field which contains either the AI text or a helpful fallback
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error: any) {
      console.error("Chat Frontend Error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble reaching the SecureVote network. Please check your connection." 
      }]);
    } finally {
      setIsLoading(false);
    }
    
    // Optional: Auto-speak response
    // speak(aiResponse);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#0A3D62] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3C91E6] flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-outfit">Shieldy AI</h3>
                  <span className="text-[10px] text-blue-200 uppercase tracking-widest">Election Assistant</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => speak(messages[messages.length - 1].content)} 
                  className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                  title="Listen to last message"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-8 pb-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === "user" ? "bg-white border border-gray-100" : "bg-blue-50 border border-blue-100"}`}>
                        {msg.role === "user" ? <User className="h-5 w-5 text-gray-500" /> : <Bot className="h-5 w-5 text-[#0A3D62]" />}
                      </div>
                      <div className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-[#0A3D62] text-white rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-4 max-w-[85%]">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-[#0A3D62]" />
                      </div>
                      <div className="p-5 rounded-2xl bg-white border border-gray-100 flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                        <span className="text-sm text-gray-400 font-medium italic">Shieldy is analyzing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-3 items-end max-w-full">
                <Button 
                  type="button" 
                  onClick={toggleListening}
                  className={`rounded-full w-12 h-12 p-0 flex-shrink-0 transition-all ${isListening ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200" : "bg-gray-50 hover:bg-gray-100 text-gray-400 border border-gray-100"}`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                
                <div className="relative flex-1 min-w-0">
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={isListening ? "Listening to your question..." : "Type your question here... (Enter to send)"}
                    className="w-full rounded-[1.5rem] bg-gray-50 border border-gray-100 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none max-h-[150px] overflow-y-auto leading-relaxed"
                  />
                </div>

                <Button 
                  type="button"
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="rounded-full w-12 h-12 p-0 bg-[#0A3D62] hover:bg-[#0A3D62]/90 flex-shrink-0 shadow-lg shadow-blue-900/10 transition-all disabled:bg-gray-200 disabled:shadow-none"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-2 text-[10px] text-center text-gray-400 font-medium">
                Shift+Enter for new line • Press Enter to send
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#0A3D62] shadow-2xl flex items-center justify-center text-white relative"
      >
        <MessageSquare className="h-8 w-8" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3C91E6] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
