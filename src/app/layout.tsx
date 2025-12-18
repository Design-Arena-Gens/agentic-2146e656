import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "NexaForge Pro — AI Agents for Production Websites";
const description =
  "Launch-ready AI website builder orchestrating Architect, Copywriter, Visual and Integration agents to deliver production blueprints in minutes.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://agentic-2146e656.vercel.app"),
  openGraph: {
    title,
    description,
    url: "https://agentic-2146e656.vercel.app",
    siteName: "NexaForge Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05060B] text-white`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(131,88,255,0.35),transparent_55%)]" />
        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.25),transparent_55%)]" />
        <div className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(120deg,#05060B_0%,#090E1F_45%,#1A1036_100%)]" />
        {children}
      </body>
    </html>
  );
}
