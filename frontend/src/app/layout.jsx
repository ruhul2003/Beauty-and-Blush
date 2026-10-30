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
      <body className="antialiased min-h-screen flex flex-col justify-between relative selection:bg-[#b84357]/20 selection:text-[#b84357]">
        {/* Claymorphic Background Ambient Environment & Floating Liquid Glass Droplets */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          {/* Ambient luminous glow centers */}
          <div className="absolute -top-[12%] left-[15%] w-[620px] h-[620px] rounded-full bg-rose-200/20 dark:bg-rose-950/20 blur-[150px]" />
          <div className="absolute top-[38%] -right-[8%] w-[580px] h-[580px] rounded-full bg-sky-100/25 dark:bg-indigo-950/20 blur-[150px]" />
          <div className="absolute -bottom-[8%] left-[10%] w-[650px] h-[650px] rounded-full bg-amber-100/25 dark:bg-purple-950/15 blur-[160px]" />

          {/* Organic 3D Liquid Glass Blobs (Reference Image Signature Element) */}
          <div className="liquid-glass-blob absolute -top-16 -left-16 w-80 h-72 rotate-12 opacity-80" />
          <div className="liquid-glass-blob absolute top-24 -right-20 w-96 h-88 -rotate-12 opacity-75" />
          <div className="liquid-glass-blob absolute top-[48%] -left-28 w-[420px] h-[340px] rotate-45 opacity-65" />
          <div className="liquid-glass-blob absolute bottom-12 right-8 w-88 h-80 -rotate-6 opacity-75" />
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
