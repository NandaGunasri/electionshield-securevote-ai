"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back to ElectionShield");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully authenticated with Google");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A3D62 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3C91E6]/5 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0A3D62]/5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-3 rounded-2xl bg-white shadow-xl shadow-[#0A3D62]/5 border border-gray-100 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-[#3C91E6]" />
            </div>
          </Link>
        </div>
        <h2 className="text-center text-3xl font-bold font-outfit text-[#0A3D62] tracking-tight">
          Secure Access Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium uppercase tracking-widest">
          ElectionShield National Infrastructure
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white py-10 px-6 shadow-2xl shadow-[#0A3D62]/10 sm:rounded-[2.5rem] sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Government ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                  placeholder="name@agency.gov"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Access Credentials
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#3C91E6] focus:ring-[#3C91E6] border-gray-300 rounded" />
                <label className="ml-2 block text-xs text-gray-500 font-medium">Keep secure session</label>
              </div>
              <div className="text-xs">
                <Link href="#" className="font-bold text-[#3C91E6] hover:text-[#0A3D62]">Reset Access?</Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-6 px-4 rounded-2xl bg-[#0A3D62] hover:bg-[#0A3D62]/95 text-white font-bold shadow-xl shadow-[#0A3D62]/20 transition-all group"
              >
                {isLoading ? "Verifying Credentials..." : "Authorize Access"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest">or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full py-6 rounded-2xl border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-all flex gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google Federated ID
              </Button>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 font-medium">
              New to the platform?{" "}
              <Link href="/signup" className="font-bold text-[#3C91E6] hover:text-[#0A3D62] transition-colors underline-offset-4 hover:underline">
                Register National Account
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] space-y-2">
          <p>© 2026 ElectionShield SecureVote Infrastructure</p>
          <p>Protected by Government-Grade Encryption (AES-256)</p>
        </div>
      </motion.div>
    </div>
  );
}
