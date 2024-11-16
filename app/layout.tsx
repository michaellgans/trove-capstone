import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


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
      <body
      >
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
