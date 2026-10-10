import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Emanuel Ikajaya | Software Engineer & Builder",
  description:
    "Portfolio and CV of Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, Founder of MyBeans, building full-stack, POS, and mobile software.",
  keywords: [
    "Christian Emanuel Ikajaya",
    "Software Engineer",
    "Bina Nusantara University",
    "Computer Science",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Electron",
    "Java",
    "Android",
    "Portfolio",
    "CV",
  ],
  authors: [{ name: "Christian Emanuel Ikajaya" }],
  openGraph: {
    title: "Christian Emanuel Ikajaya | Software Engineer & Builder",
    description: "I build solutions to problems I encountered while studying and running my business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-page text-ink font-sans selection:bg-rule selection:text-ink">
        <div className="texture-overlay" />
        {children}
      </body>
    </html>
  );
}
