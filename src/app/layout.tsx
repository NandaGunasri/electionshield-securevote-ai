import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ElectionShield SecureVote AI | Democracy Protection System",
  description: "Government-grade AI platform for voter education, booth security, and election transparency. Empowering citizens, securing democracy.",
  metadataBase: new URL("https://electionshield.gov"),
  keywords: ["Election", "AI", "Voter Education", "Surveillance", "Democracy", "Security"],
  openGraph: {
    title: "ElectionShield SecureVote AI",
    description: "Protecting democracy through advanced AI intelligence.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectionShield SecureVote AI",
    description: "The future of secure elections.",
    images: ["/og-image.png"],
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-full flex flex-col`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}


