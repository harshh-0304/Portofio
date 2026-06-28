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

export const metadata: Metadata = {
  title: "JARVIS // Harsh Jadav — Backend Engineer & Full Stack Developer",
  description:
    "Personal command center for Harsh Jadav — Backend Engineer and Full Stack Developer from Gujarat, India. Focused on backend systems, full-stack applications, AI products, and scalable software.",
  keywords: [
    "Harsh Jadav",
    "Backend Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Node.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Gujarat",
    "India",
  ],
  authors: [{ name: "Harsh Jadav" }],
  creator: "Harsh Jadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "JARVIS // Harsh Jadav — Backend Engineer & Full Stack Developer",
    description:
      "Personal command center for Harsh Jadav — Backend Engineer and Full Stack Developer from Gujarat, India.",
    siteName: "JARVIS // Harsh Jadav",
  },
  twitter: {
    card: "summary_large_image",
    title: "JARVIS // Harsh Jadav — Backend Engineer & Full Stack Developer",
    description:
      "Personal command center for Harsh Jadav — Backend Engineer and Full Stack Developer from Gujarat, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
