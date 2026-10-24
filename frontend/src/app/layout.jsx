import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FooterTrustStrip } from "@/components/FooterTrustStrip";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AiChatbox } from "@/components/AiChatbox";

export const metadata = {
  title: "Beauty & Blush | Luxury Cosmetics, Skincare & Fragrance",
  description: "Glow up with premium beauty products. Discover authenticated luxury makeup, clinical skincare, and verified designer fragrances with nationwide delivery.",
  keywords: "Beauty and Blush, Zack Beauty, luxury cosmetics, makeup, skincare, fragrance, perfume, hyaluronic acid serum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-[#c94d64]/20 selection:text-[#c94d64]">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow pt-20 sm:pt-24 pb-16 md:pb-0">
              {children}
            </main>
            <FooterTrustStrip />
            <Footer />
            <MobileBottomNav />
            <AiChatbox />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
