import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: {
    default: "Career Blueprint",
    template: "%s | Career Blueprint",
  },
  description:
    "AI-powered career coaching that builds your personalized Career Blueprint — goals, skills assessment, and an actionable development plan.",
  openGraph: {
    title: "Career Blueprint",
    description:
      "AI-powered career coaching that builds your personalized Career Blueprint.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              Career Blueprint
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/coach"
                className="text-muted transition-colors hover:text-foreground"
              >
                Coach
              </Link>
              <Link
                href="/blueprint"
                className="text-muted transition-colors hover:text-foreground"
              >
                Blueprint
              </Link>
              <Link
                href="/import"
                className="text-muted transition-colors hover:text-foreground"
              >
                Import
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
