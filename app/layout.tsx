import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRE OM Builder",
  description: "Institutional offering memorandum and BOV platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
