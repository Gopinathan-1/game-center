import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS ARENA | Premium Gaming Centre",
  description:
    "Nexus Arena is a premium gaming centre with high-refresh gaming PCs, PS5 consoles, VR rigs, private squad rooms, and competitive tournaments. Book your station over WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
