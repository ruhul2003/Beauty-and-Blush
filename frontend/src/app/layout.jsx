import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AiChatbox } from "@/components/AiChatbox";

export const metadata = {
  title: "Beauty & Blush | Luxury Cosmetics, Skincare & Fragrance Marketplace",
  description: "Discover, buy, and sell authentic luxury makeup, clinical skincare, and verified designer fragrances across Bangladesh. 100% genuine guaranteed with fast nationwide delivery.",
  keywords: "Beauty and Blush, cosmetics, makeup, skincare, fragrance, perfume, luxury beauty, Bangladesh, buy beauty online",
  openGraph: {
    title: "Beauty & Blush - Luxury Beauty Marketplace",
    description: "Shop authenticated cosmetics, skincare & perfumes from verified boutiques.",
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-rose-500/20 selection:text-rose-900">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <AiChatbox />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
