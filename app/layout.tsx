import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireMirror — Why recruiters ignore your resume",
  description:
    "Brutally honest recruiter visibility for software engineers and technical professionals. Level, stack, and ownership — in 7 seconds.",
  openGraph: {
    title: "HireMirror",
    description: "Find out why recruiters ignore your resume.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-black font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
