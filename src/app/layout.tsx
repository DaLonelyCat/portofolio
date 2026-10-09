import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Emanuel Ikajaya // Software Engineer & Tech Builder // PORTFOLIO",
  description:
    "Portfolio and CV of Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, Founder/CEO of MyBeans, and builder of full-stack, POS, AI, and mobile software.",
  keywords: [
    "Christian Emanuel Ikajaya",
    "Software Engineer",
    "Bina Nusantara University",
    "Computer Science",
    "Full-Stack Developer",
    "Next.js",
    "Java",
    "Unity",
    "Portfolio",
    "CV",
  ],
  authors: [{ name: "Christian Emanuel Ikajaya" }],
  openGraph: {
    title: "Christian Emanuel Ikajaya // Software Engineer & Tech Builder",
    description: "Turning cool ideas into actual, working software projects.",
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
      <body className="antialiased bg-cyber-void text-slate-100 selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
        {children}
      </body>
    </html>
  );
}
