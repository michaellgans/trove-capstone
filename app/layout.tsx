import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/app/client-layout";
import { OverlayProvider } from "@/components/OverlayContext";
import BlurOverlay from "@/components/BlurOverlay";
import BodyWithConditionalId from "@/components/BodyWithConditionalId";

export const metadata = {
  title: "Trove",
  description: "Financial literacy education application for children ages 10-16",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <BodyWithConditionalId>
        <OverlayProvider>
          <BlurOverlay>{/* Render modal content here */}</BlurOverlay>
          <ClientLayout>{children}</ClientLayout>
        </OverlayProvider>
        <Footer />
      </BodyWithConditionalId>
    </html>
  );
}
