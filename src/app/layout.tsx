import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import BackToTop from "@/components/common/BackToTop";
import RouteLoader from "@/components/common/RouteLoader";
import RouteLoaderProvider from "@/components/common/RouteLoaderProvider";
import ThemeProvider from "@/components/common/ThemeProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { theme } from "@/config/theme";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: theme.brand.name,
  description: theme.brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider theme={theme}>
          <RouteLoaderProvider />
          <BackToTop />
          <RouteLoader />

          <Header />

          <div className="pt-20">{children}</div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
