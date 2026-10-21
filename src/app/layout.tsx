import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, Cormorant_Garamond, DM_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

// Self-hosted by Next and exposed as CSS variables the page styles use.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-display" });
const body    = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-body" });
const mono    = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const hand    = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-hand" });

export const viewport: Viewport = {
  themeColor: "#EEEEEA",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://michaelchen.live"),
  title: "Michael Chen | Portfolio",
  description:
    "A collection of my projects, design work, and development experience, built with care and creativity.",
  openGraph: {
    title: "Michael Chen | Portfolio",
    description:
      "A collection of my projects, design work, and development experience, built with care and creativity.",
    url: "https://michaelchen.live", 
    siteName: "Michael Chen Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Chen | Portfolio",
    description:
      "A collection of my projects, design work, and development experience, built with care and creativity.",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}