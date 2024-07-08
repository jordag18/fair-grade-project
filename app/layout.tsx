import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthSessionProvider from "@/SessionProvider";

import NavbarWrapper from "@/components/Navbar";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex flex-col min-h-screen bg-slate-200">
          <NavbarWrapper />
          <AuthSessionProvider>
            <main className="flex-grow mt-16 h-full parent-div bg-slate-300">
              {children}
            </main>
          </AuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
