import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maine Coon Royale | Premium Home-Bred Kittens USA",
  description: "Discover exceptional home-bred Maine Coon kittens raised with love in the USA. Health guaranteed, TICA registered, worldwide shipping available.",
  openGraph: {
    title: "Maine Coon Royale | Premium Home-Bred Kittens",
    description: "Exceptional Maine Coon kittens raised with love. Health guaranteed, TICA registered.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy text-gray-100 antialiased">{children}</body>
    </html>
  );
}
