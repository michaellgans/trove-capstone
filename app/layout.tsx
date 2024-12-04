import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from '@/app/client-layout';


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
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      {/* <body id='gradial' className="min-h-screen flex flex-col" */}
      <body className="min-h-screen flex flex-col"
      >
        <ClientLayout>
        <Navbar />
          {/* Main Content */}
        <main className="flex-grow pb-10">
          {children}
        </main>
        <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
