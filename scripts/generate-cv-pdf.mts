import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function generateCvPdf() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Christian Emanuel Ikajaya - CV</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10.5pt;
      -webkit-font-smoothing: antialiased;
    }
    .header {
      margin-bottom: 12px;
    }
    .name {
      font-size: 26pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #111827;
      margin-bottom: 8px;
      text-align: center;
    }
    .sub-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9.5pt;
      color: #374151;
      padding-bottom: 12px;
      border-bottom: 1px solid #111827;
    }
    .links {
      display: flex;
      gap: 16px;
    }
    .links a {
      color: #374151;
      text-decoration: underline;
    }
    .contacts {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .contact-item svg {
      width: 13px;
      height: 13px;
      fill: #4b5563;
    }
    .section {
      margin-top: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid #111827;
    }
    .section:last-child {
      border-bottom: none;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #111827;
      margin-bottom: 6px;
    }
    p {
      color: #374151;
      font-size: 10pt;
      line-height: 1.45;
    }
    .exp-item {
      margin-bottom: 12px;
    }
    .exp-item:last-child {
      margin-bottom: 0;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .exp-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #111827;
    }
    .exp-date {
      font-size: 9.5pt;
      font-weight: 500;
      color: #4b5563;
    }
    ul.bullet-list {
      list-style-type: disc;
      padding-left: 18px;
      margin-top: 2px;
    }
    ul.bullet-list li {
      font-size: 9.5pt;
      color: #374151;
      line-height: 1.45;
      margin-bottom: 3px;
    }
    .skills-list li {
      margin-bottom: 4px;
    }
    .skills-list strong {
      font-weight: 600;
      color: #111827;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">CHRISTIAN EMANUEL IKAJAYA</h1>
    <div class="sub-header">
      <div class="links">
        <a href="https://github.com/dalonelycat" target="_blank">Github</a>
        <a href="https://portofolio.dalonelycat.site" target="_blank">Portfolio</a>
      </div>
      <div class="contacts">
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          +62 81346354605
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          christian@dalonelycat.site
        </span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">ABOUT ME</div>
    <p>
      Computer Science undergraduate with hands-on experience building full-stack web platforms, native Android applications, and operational software systems. Profficient at translating business requirements into scalable, performant tools.
    </p>
  </div>

  <div class="section">
    <div class="section-title">EDUCATION</div>
    <div class="exp-header">
      <span class="exp-title">Bina Nusantara University</span>
      <span class="exp-date">2023 - 2027</span>
    </div>
    <p>Computer Science undergraduate</p>
    <p>GPA: 3.30 / 4.00.</p>
  </div>

  <div class="section">
    <div class="section-title">WORK EXPERIENCE</div>
    
    <div class="exp-item">
      <div class="exp-header">
        <span class="exp-title">MyBeans | CEO &amp; Founder</span>
        <span class="exp-date">2026</span>
      </div>
      <ul class="bullet-list">
        <li>Led the team, made key business decisions, and chose which coffee products to sell.</li>
        <li>Researched and negotiated deals with local coffee suppliers to get the best beans.</li>
        <li>Pitched directly to local restaurants and cafes door-to-door to win early clients.</li>
        <li>Built the company website and desktop cashier system to handle daily sales.</li>
      </ul>
    </div>

    <div class="exp-item" style="margin-top: 10px;">
      <div class="exp-header">
        <span class="exp-title">Fruqita | CFO &amp; Software Developer</span>
        <span class="exp-date">2026 - Present</span>
      </div>
      <ul class="bullet-list">
        <li>Managed the company's budget, cash flow, and all major financial decisions.</li>
        <li>Built the web app and custom POS system from scratch to track sales and inventory.</li>
        <li>Integrated a local AI using Ollama so the team can chat with the system for instant stock updates and daily summaries.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">SKILLS</div>
    <ul class="bullet-list skills-list">
      <li><strong>Programming Languages:</strong> Java, Python, C#, TypeScript, JavaScript, SQL, HTML5/CSS3</li>
      <li><strong>Frameworks &amp; Libraries:</strong> React, Next.js, Tailwind CSS, Three.js, WebXR, Swing</li>
      <li><strong>Mobile &amp; Game Engines:</strong> Android Studio, Unity Engine</li>
      <li><strong>Machine Learning &amp; Vision:</strong> Convolutional Neural Networks (CNNs), Computer Vision, Data Preprocessing</li>
      <li><strong>Databases &amp; Systems:</strong> MongoDB, SQL (Relational Data Modeling), Git/GitHub, RESTful APIs, POS Architecture</li>
      <li><strong>Graphics &amp; Design:</strong> Computer Graphics Pipelines, 3D Rendering &amp; Camera Anchoring, UI/UX Prototyping</li>
    </ul>
  </div>
</body>
</html>`;

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const outputPath = path.join(process.cwd(), "public", "Christian_Emanuel_Ikajaya_CV.pdf");
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      bottom: "14mm",
      left: "16mm",
      right: "16mm",
    },
  });

  console.log("Successfully generated CV PDF at:", outputPath);
  await browser.close();
}

generateCvPdf().catch((err) => {
  console.error("Error generating CV PDF:", err);
  process.exit(1);
});
