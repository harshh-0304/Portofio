import type { Metadata, Viewport } from "next";
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
  title: "Harsh Jadav — Backend Engineer, Full Stack & AI Developer | Portfolio",
  description:
    "Harsh Jadav is a Backend Engineer and Full Stack Developer based in Ahmedabad, Gujarat, India. Specializing in Node.js, NestJS, TypeScript, PostgreSQL, Prisma ORM, REST APIs, AWS, and React. Experienced in AI engineering and gaming platform integrations.",
  keywords: [
    "Harsh Jadav",
    "Backend Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Node.js Developer",
    "NestJS Developer",
    "TypeScript Developer",
    "PostgreSQL",
    "Prisma ORM",
    "REST API Developer",
    "Software Engineer",
    "Gaming Platform Integration",
    "AWS Developer",
    "React Developer",
    "Portfolio",
    "Ahmedabad Developer",
    "Gujarat Developer",
    "India Software Engineer",
  ],
  authors: [{ name: "Harsh Jadav", url: "https://harshjadav.dev" }],
  creator: "Harsh Jadav",
  metadataBase: new URL("https://harshjadav.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshjadav.dev",
    title: "Harsh Jadav — Backend Engineer, Full Stack & AI Developer",
    description:
      "Backend Engineer and Full Stack Developer based in Ahmedabad, Gujarat, India. Specializing in Node.js, NestJS, TypeScript, PostgreSQL, Prisma ORM, REST APIs, AWS, React, and AI engineering.",
    siteName: "Harsh Jadav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Jadav — Backend Engineer, Full Stack & AI Developer",
    description:
      "Backend Engineer and Full Stack Developer from Ahmedabad, Gujarat, India. Node.js, NestJS, TypeScript, PostgreSQL, AWS, React, and AI engineering.",
    creator: "@harshjadav",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030A0E",
};

const GA_MEASUREMENT_ID = "G-7HMY8VCM6N";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Jadav",
  url: "https://harshjadav.dev",
  jobTitle: "Backend Engineer & Full Stack Developer",
  description:
    "Backend Engineer and Full Stack Developer based in Ahmedabad, Gujarat, India. Specializing in Node.js, NestJS, TypeScript, PostgreSQL, Prisma ORM, REST APIs, AWS, React, and AI engineering.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma ORM",
    "REST API",
    "AWS",
    "React",
    "AI Engineering",
    "Gaming Platform Integration",
    "Full Stack Development",
    "Backend Engineering",
  ],
  sameAs: [
    "https://github.com/harshh-0304",
    "https://linkedin.com/in/harshjadav",
  ],
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
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
