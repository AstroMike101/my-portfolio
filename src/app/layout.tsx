import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
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
    images: [
      {
        url: "https://michaelchen.live/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Michael Chen - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", 
    title: "Michael Chen | Portfolio",
    description:
      "A collection of my projects, design work, and development experience, built with care and creativity.",
    images: ["https://michaelchen.live/og-image.png"],
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