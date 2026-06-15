import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coding Practice Agent",
  description: "AI-powered algorithm practice with in-browser coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
