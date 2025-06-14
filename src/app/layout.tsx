import type { Metadata } from "next";
import Head from "next/head";
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
  title: "Echo trace",
  description: "A cyber-noir puzzle game. Track the rogue AI before it's too late.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <base href="/echo-trace/" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-terminal-fg`}
      >
        {children}
      </body>
    </html>
  );
}
