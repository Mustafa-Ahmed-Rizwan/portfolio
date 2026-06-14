import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Mustafa Rizwan - Portfolio",
  description: "Terminal portfolio with AI Rick Sanchez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistMono.variable} bg-bg-base text-text-primary font-body-md relative antialiased selection:bg-primary-container selection:text-on-primary-fixed min-h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
