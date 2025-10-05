import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

// Load Poppins from Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add weights you use
  variable: "--font-poppins",
});

export const metadata = {
  title: "Michael Chen | Portfolio",
  description:
    "A collection of my projects, design work, and development experience - built with care and creativity.",
  openGraph: {
    title: "Michael Chen | Portfolio",
    description:
      "A collection of my projects, design work, and development experience - built with care and creativity.",
    url: "https://michaelchen.live", 
    siteName: "Michael Chen Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Michael Chen | Portfolio",
    description:
      "A collection of my projects, design work, and development experience — built with care and creativity.",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="theme-color" content="#f8fafc" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
