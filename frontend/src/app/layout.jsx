import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FooterTrustStrip } from "@/components/FooterTrustStrip";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata = {
  title: "Beauty & Blush | Luxury Cosmetics, Skincare & Fragrance",
  description: "Glow up with premium beauty products. Discover authenticated luxury makeup, clinical skincare, and verified designer fragrances with nationwide delivery.",
  keywords: "Beauty and Blush, Zack Beauty, luxury cosmetics, makeup, skincare, fragrance, perfume, hyaluronic acid serum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bnb_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(t);document.documentElement.classList.remove(t==='dark'?'light':'dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between relative selection:bg-[#e06d84]/20 selection:text-[#e06d84]">
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

        <ThemeProvider>
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
                <CartDrawer />
              </CartProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
