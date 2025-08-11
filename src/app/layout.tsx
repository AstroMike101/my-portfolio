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

export const metadata: Metadata = {
  title: "Michael Chen",
  description: "About me",
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
