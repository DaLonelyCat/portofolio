import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function generateOgImage() {
  const avatarPath = path.join(process.cwd(), "public", "avatar.jpg");
  const avatarBase64 = fs.existsSync(avatarPath)
    ? `data:image/jpeg;base64,${fs.readFileSync(avatarPath).toString("base64")}`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #05060A;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 80px;
      position: relative;
      overflow: hidden;
    }
    .background-grid {
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 45%);
      pointer-events: none;
    }
    .orbit-ring {
      position: absolute;
      right: -100px;
      top: -100px;
      width: 700px;
      height: 700px;
      border: 1px dashed rgba(0, 240, 255, 0.2);
      border-radius: 50%;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 28px;
      z-index: 2;
    }
    .avatar {
      width: 110px;
      height: 110px;
      border-radius: 28px;
      border: 3px solid rgba(0, 240, 255, 0.7);
      box-shadow: 0 0 35px rgba(0, 240, 255, 0.35);
      object-fit: cover;
    }
    .title-group {
      display: flex;
      flex-direction: column;
    }
    .site-tag {
      font-family: monospace;
      font-size: 15px;
      color: #00F0FF;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }
    .name {
      font-size: 54px;
      font-weight: 300;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .content {
      z-index: 2;
      max-width: 860px;
    }
    .role {
      font-size: 26px;
      color: #94A3B8;
      font-weight: 400;
      line-height: 1.4;
      margin-bottom: 12px;
    }
    .tagline {
      font-size: 19px;
      color: #CBD5E1;
      line-height: 1.5;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 24px;
      z-index: 2;
    }
    .tech-stack {
      display: flex;
      gap: 10px;
    }
    .badge {
      font-family: monospace;
      font-size: 13px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #E2E8F0;
    }
    .badge-primary {
      background: rgba(0, 240, 255, 0.1);
      border-color: rgba(0, 240, 255, 0.4);
      color: #00F0FF;
    }
    .location {
      font-family: monospace;
      font-size: 14px;
      color: #94A3B8;
    }
  </style>
</head>
<body>
  <div class="background-grid"></div>
  <div class="orbit-ring"></div>

  <div class="header">
    ${avatarBase64 ? `<img class="avatar" src="${avatarBase64}" alt="Christian Emanuel Ikajaya" />` : ""}
    <div class="title-group">
      <div class="site-tag">PORTFOLIO & ENGINEERING DOSSIER</div>
      <div class="name">Christian Emanuel Ikajaya</div>
    </div>
  </div>

  <div class="content">
    <div class="role">Computer Science Student & Systems Builder</div>
    <div class="tagline">Bina Nusantara University · CFO & Lead Dev at Fruqita · Founder of MyBeans</div>
  </div>

  <div class="footer">
    <div class="tech-stack">
      <span class="badge badge-primary">UniCash POS</span>
      <span class="badge">React</span>
      <span class="badge">Electron</span>
      <span class="badge">Next.js</span>
      <span class="badge">Java</span>
      <span class="badge">Python</span>
    </div>
    <div class="location">Surabaya, Indonesia</div>
  </div>
</body>
</html>`;

  console.log("Launching headless browser to render OG image...");
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  });

  await page.setContent(html);
  const outputPath = path.join(process.cwd(), "public", "og-image.png");
  await page.screenshot({ path: outputPath, type: "png" });
  await browser.close();

  console.log(`Open Graph image successfully generated at: ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error("Error generating OG image:", err);
  process.exit(1);
});
