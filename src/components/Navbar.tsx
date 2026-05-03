"use client";

import Link from "next/link";
import { Shield, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out");
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const navLinks = [
    { name: "Education", href: "/education" },
    { name: "Registration", href: "/registration" },
    { name: "Booth Finder", href: "/booths" },
    { name: "Security", href: "/security" },
    { name: "Dashboard", href: "/dashboard" },
  ];


  return (
    <nav className="fixed w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ rotate: 10 }}
            >
              <Shield className="h-10 w-10 text-[#3C91E6]" />
            </motion.div>
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold font-outfit tracking-tight text-[#0A3D62]">
                Election<span className="text-[#3C91E6]">Shield</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 -mt-1">
                SecureVote AI
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#0A3D62] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {!loading && (
              <div className="flex items-center gap-3 ml-4 border-l border-gray-100 pl-6">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Identity</span>
                      <span className="text-xs font-bold text-[#0A3D62]">{user.displayName || user.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 hover:bg-red-50 px-4"
                    >
                      Logout
                    </Button>
                    <Link href="/dashboard">
                      <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-full px-6 shadow-lg shadow-[#0A3D62]/10">
                        <User className="mr-2 h-4 w-4" />
                        Portal
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button variant="outline" className="rounded-full px-6 border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62]/5">
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-full px-6 shadow-lg shadow-[#0A3D62]/10">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#0A3D62]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-[#0A3D62] border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0A3D62] text-[#0A3D62] py-6 rounded-xl">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#0A3D62] text-white py-6 rounded-xl shadow-lg shadow-[#0A3D62]/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
