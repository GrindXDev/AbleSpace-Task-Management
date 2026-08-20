import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import AuthGuard from "@/components/auth/AuthGuard";
import ThemeInitializer from "@/components/settings/ThemeInitializer";

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
  title: "AbleSpace Task Management",
  description:
    "Manage tasks, projects, and workspace activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeInitializer />

        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}