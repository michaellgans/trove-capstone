import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/app/client-layout";

export const metadata = {
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
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
