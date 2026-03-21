import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cross-Chain Aggregator | @samdevrel",
  description: "Swap and bridge across 10+ chains with best rates using Socket and multi-chain bridges.",
  keywords: ["cross-chain", "swap", "bridge", "aggregator", "atomic swap", "multi-chain"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
