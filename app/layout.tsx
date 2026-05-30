import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS CAFE | Premium Gaming Cafe",
  description:
    "A cinematic homepage for a premium gaming cafe with PC stations, console lounges, private booths, snacks, and community nights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
