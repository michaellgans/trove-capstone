import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Trove",
  description: "Financial literacy education application for children ages 10-16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div id='gradial' className="min-h-screen flex flex-col" 
      >
      <main className="flex-grow pb-10">
      {children}
      </main>
      </div>
  );
}
