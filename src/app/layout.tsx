import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Emanuel Ikajaya | Software Engineer & Builder",
  description:
    "Portfolio and CV of Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, Founder of MyBeans, building full-stack, POS, AI, and mobile software.",
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
    description: "Builder and problem solver turning cool ideas into working software projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-paper text-ink selection:bg-rule selection:text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
