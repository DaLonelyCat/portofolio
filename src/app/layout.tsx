import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05060A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-cv.pages.dev"),
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
    description:
      "Portfolio and CV of Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, Founder of MyBeans, building full-stack, POS, and mobile software.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christian Emanuel Ikajaya - Software Engineer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Emanuel Ikajaya | Software Engineer & Builder",
    description:
      "Portfolio and CV of Christian Emanuel Ikajaya, Computer Science student at Bina Nusantara University, CFO at Fruqita, Founder of MyBeans, building full-stack, POS, and mobile software.",
    images: ["/og-image.png"],
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
