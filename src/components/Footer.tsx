import { Shield, Mail, Phone, Globe, CodeXml, Users, Share2 } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-[#3C91E6]" />
              <div className="flex flex-col">
                <span className="text-lg font-bold font-outfit tracking-tight text-[#0A3D62]">
                  Election<span className="text-[#3C91E6]">Shield</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-gray-400 -mt-1">
                  SecureVote AI
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Protecting democracy through advanced AI intelligence and 
              transparent civic technology. A government-grade ecosystem for all.
            </p>
            <div className="flex gap-4">
              <Share2 className="h-5 w-5 text-gray-400 hover:text-[#3C91E6] cursor-pointer transition-colors" />
              <Users className="h-5 w-5 text-gray-400 hover:text-[#3C91E6] cursor-pointer transition-colors" />
              <CodeXml className="h-5 w-5 text-gray-400 hover:text-[#3C91E6] cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0A3D62] mb-6 font-outfit">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/education" className="hover:text-[#3C91E6] transition-colors">Civic Education</Link></li>
              <li><Link href="/booths" className="hover:text-[#3C91E6] transition-colors">Booth Intelligence</Link></li>
              <li><Link href="/security" className="hover:text-[#3C91E6] transition-colors">Security Command</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#3C91E6] transition-colors">Voter Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0A3D62] mb-6 font-outfit">Governance</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/admin" className="hover:text-[#3C91E6] transition-colors">National Portal</Link></li>
              <li><Link href="#" className="hover:text-[#3C91E6] transition-colors">Election Laws</Link></li>
              <li><Link href="#" className="hover:text-[#3C91E6] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#3C91E6] transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0A3D62] mb-6 font-outfit">Emergency Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#3C91E6]" /> 1-800-VOTE-SAFE</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#3C91E6]" /> support@electionshield.gov</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-[#3C91E6]" /> www.electionshield.gov</li>
            </ul>
            <div className="mt-8 p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">System Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-gray-600">All Nodes Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2026 ElectionShield SecureVote AI. All Rights Reserved.</p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-[#0A3D62]">Security Whitepaper</Link>
            <Link href="#" className="hover:text-[#0A3D62]">Data Encryption</Link>
            <Link href="#" className="hover:text-[#0A3D62]">GDPR Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
