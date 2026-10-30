import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FooterTrustStrip } from "@/components/FooterTrustStrip";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AiChatbox } from "@/components/AiChatbox";
import { CartDrawer } from "@/components/CartDrawer";

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
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between relative selection:bg-[#c94d64]/20 selection:text-[#c94d64]">
        {/* Ambient Glowing Glass Blur Background Orbs */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[10%] -left-[10%] w-[550px] h-[550px] rounded-full bg-rose-400/18 dark:bg-rose-900/25 blur-[130px]" />
          <div className="absolute top-[20%] -right-[8%] w-[500px] h-[500px] rounded-full bg-pink-300/16 dark:bg-pink-950/20 blur-[130px]" />
          <div className="absolute top-[55%] left-[20%] w-[600px] h-[600px] rounded-full bg-rose-300/12 dark:bg-purple-950/20 blur-[150px]" />
          <div className="absolute -bottom-[8%] -right-[10%] w-[550px] h-[550px] rounded-full bg-amber-200/12 dark:bg-amber-950/15 blur-[140px]" />
        </div>

        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-grow pt-20 sm:pt-24 pb-16 md:pb-0">
                {children}
              </main>
              <FooterTrustStrip />
              <Footer />
              <MobileBottomNav />
              <AiChatbox />
              <CartDrawer />
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
