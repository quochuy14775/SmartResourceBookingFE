import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { PrimeReactProvider } from 'primereact/api';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart Resource Booking - Manage Your Resources Efficiently",
  description: "A comprehensive resource booking and management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <PrimeReactProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
