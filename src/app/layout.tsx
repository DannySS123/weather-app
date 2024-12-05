import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Statistics Dashboard",
  description:
    "View and analyze weather data with interactive charts and filters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Weather Stats
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-white hover:text-blue-200">
                Dashboard
              </Link>
              <Link
                href="/query-apis"
                className="text-white hover:text-blue-200"
              >
                Query APIs
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
