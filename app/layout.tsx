import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import CartModalWrapper from "@/features/cart/components/cart-modal-wrapper";
import { CartModalProvider } from "@/features/cart/context/cart-context";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Adrian's Store",
  description: "NextJS E-commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <CartModalProvider>
          <Header />

          <main className="flex-1 container max-w-7xl mx-auto mt-6">
            {children}

            <Suspense fallback={<div>Loading...</div>}>
              <CartModalWrapper />
            </Suspense>
          </main>

          <Footer />
        </CartModalProvider>
      </body>
    </html>
  );
}
