import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import AuthSessionProvider from "@/SessionProvider";
import Layout from '@/components/Layout';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Fair Grade",
  description: "Grading tool application",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
            <AuthSessionProvider><Layout>{children}</Layout></AuthSessionProvider>
      </body>
    </html>
  );
}
