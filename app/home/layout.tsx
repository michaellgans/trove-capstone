import type { Metadata } from "next";
import "../globals.css";


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
      <main className="flex-grow">
      {children}
      </main>
      </div>
  );
}
