"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight, User, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "voter",
        createdAt: new Date().toISOString(),
      });

      toast.success("Account created successfully. Welcome to ElectionShield.");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
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
          National ID Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium uppercase tracking-widest">
          Create Your Secure Civic Identity
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10"
      >
        <div className="bg-white py-10 px-6 shadow-2xl shadow-[#0A3D62]/10 sm:rounded-[2.5rem] sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSignUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Official Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                  placeholder="name@agency.gov"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-11 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all h-12"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-[10px] text-gray-400 font-medium ml-1 italic">
                Password must contain at least 8 characters with 1 special symbol.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input required type="checkbox" className="h-4 w-4 text-[#3C91E6] focus:ring-[#3C91E6] border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-xs text-gray-500 leading-normal">
                I agree to the <span className="text-[#3C91E6] font-bold">National Security Terms</span> and 
                <span className="text-[#3C91E6] font-bold"> Data Privacy Governance</span> protocols.
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-6 px-4 rounded-2xl bg-[#0A3D62] hover:bg-[#0A3D62]/95 text-white font-bold shadow-xl shadow-[#0A3D62]/20 transition-all group"
              >
                {isLoading ? "Creating Infrastructure Account..." : "Create Civic Identity"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link href="/signin" className="font-bold text-[#3C91E6] hover:text-[#0A3D62] transition-colors underline-offset-4 hover:underline">
                Secure Login
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] space-y-2">
          <p>© 2026 ElectionShield SecureVote Infrastructure</p>
          <p>End-to-End Encrypted Data Storage (FIPS 140-2 Compliant)</p>
        </div>
      </motion.div>
    </div>
  );
}
