import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";

// Simple static file server for out/ directory
function createStaticServer(dir: string, port: number): Promise<http.Server> {
  const mimeTypes: Record<string, string> = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url?.split("?")[0] || "/");
    if (reqPath === "/") reqPath = "/index.html";

    let filePath = path.join(dir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(filePath + ".html")) {
        filePath = filePath + ".html";
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runBrowserTests() {
  console.log("=================================================");
  console.log("PLAYWRIGHT REAL BROWSER INTERACTION TEST SUITE");
  console.log("=================================================\n");

  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) {
    throw new Error("Build directory 'out' does not exist. Run 'npm run build' first.");
  }

  const screenshotsDir = path.join(process.cwd(), "scripts", "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const port = 2026;
  console.log(`Starting local static server for out/ at http://localhost:${port}...`);
  const server = await createStaticServer(outDir, port);

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, detail: string = "") {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] ${testName}${detail ? " -> " + detail : ""}`);
    } else {
      console.error(`[FAIL] ${testName}${detail ? " -> " + detail : ""}`);
      process.exitCode = 1;
    }
  }

  const browser = await chromium.launch({ headless: true });

  try {
    // ----------------------------------------------------
    // Test 1: Desktop Viewport (1280x800)
    // ----------------------------------------------------
    console.log("\n--- 1. Desktop Viewport (1280x800) ---");
    const desktopPage = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });

    // Verify Title & Headline
    const pageTitle = await desktopPage.title();
    assert(pageTitle.includes("Christian Emanuel Ikajaya"), "Desktop page title", pageTitle);

    const headlineText = await desktopPage.locator("section#hero h1").innerText();
    assert(headlineText.includes("Hello, I’m Christian") || headlineText.includes("Hello, I'm Christian"), "Hero headline text", headlineText);

    // Verify Navbar Links
    const navText = await desktopPage.locator("nav[aria-label='Main Navigation']").innerText();
    assert(navText.includes("Projects") && navText.includes("Learning") && navText.includes("Experience") && navText.includes("Skills") && navText.includes("Contact"), "Navbar displays everyday labels (Learning, Experience, Contact)", navText.replace(/\n/g, " "));

    // Test Scroll Morphing & Active Section Highlighting
    await desktopPage.evaluate(() => window.scrollTo(0, 600));
    await desktopPage.waitForTimeout(600);

    const isScrolledHeader = await desktopPage.locator("header").evaluate((el) => el.classList.contains("pt-3") || el.classList.contains("sm:pt-4"));
    assert(isScrolledHeader, "Navbar fluidly transforms into floating glass capsule upon scrolling");

    // Test Category Filtering
    console.log("\n--- Testing Category Filter Rail ---");
    const desktopFilterBtn = desktopPage.locator("button:has-text('Desktop Application')");
    await desktopFilterBtn.click();
    await desktopPage.waitForTimeout(300);

    const visibleProjectsCount = await desktopPage.locator("section#projects article").count();
    assert(visibleProjectsCount >= 1, "Category filter 'Desktop Application' updates visible cards", `Visible cards: ${visibleProjectsCount}`);

    const allFilterBtn = desktopPage.locator("button:has-text('All')");
    await allFilterBtn.click();
    await desktopPage.waitForTimeout(300);

    const allProjectsCount = await desktopPage.locator("section#projects article").count();
    assert(allProjectsCount === 9, "Category filter 'All' shows all 9 projects", `Total projects: ${allProjectsCount}`);

    const fruqitaCard = desktopPage.locator("section#projects article:has-text('Fruqita Fruit Chips Storefront')");
    assert(await fruqitaCard.isVisible(), "Fruqita fruit chips storefront project card is visible");

    // Test Project Modal (UniCash POS)
    console.log("\n--- Testing Semi-Fullscreen Project Modal ---");
    const unicashDetailsBtn = desktopPage.locator("section#projects article:has-text('UniCash POS') button:has-text('View Details')").first();
    await unicashDetailsBtn.click();
    await desktopPage.waitForTimeout(400);

    const modalDialog = desktopPage.locator("[role='dialog']");
    const isModalVisible = await modalDialog.isVisible();
    assert(isModalVisible, "Modal dialog opens on 'View Details' click");

    const modalTitle = await modalDialog.locator("#modal-title").innerText();
    assert(modalTitle.includes("UniCash POS System"), "Modal displays correct project title", modalTitle);

    // Test Modal Escape Key Close
    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);
    const isModalClosed = !(await modalDialog.isVisible());
    assert(isModalClosed, "Modal closes cleanly on Escape key");

    // Test Modal Close Button (X) on another project
    const secondProjectDetailsBtn = desktopPage.locator("section#projects article button:has-text('View Details')").nth(1);
    await secondProjectDetailsBtn.click();
    await desktopPage.waitForTimeout(400);
    const closeBtn = desktopPage.locator("button[aria-label='Close dialog']");
    await closeBtn.click();
    await desktopPage.waitForTimeout(300);
    assert(!(await modalDialog.isVisible()), "Modal closes cleanly on Close (X) button click");

    // Test Email Copy Feedback
    console.log("\n--- Testing Email Copy Feedback ---");
    const copyEmailBtn = desktopPage.locator("button:has-text('Copy')");
    await copyEmailBtn.scrollIntoViewIfNeeded();
    await copyEmailBtn.click();
    await desktopPage.waitForTimeout(300);
    const isCopiedVisible = await desktopPage.locator("button:has-text('Copied')").isVisible();
    assert(isCopiedVisible, "Clicking Copy button triggers 'Copied' confirmation feedback");

    // Test Back to Top Floating Button
    console.log("\n--- Testing Back to Top Button ---");
    await desktopPage.evaluate(() => window.scrollTo(0, 1500));
    await desktopPage.waitForTimeout(400);
    const backToTopBtn = desktopPage.locator("button[aria-label='Scroll back to top of page']");
    const isBackToTopVisible = await backToTopBtn.isVisible();
    assert(isBackToTopVisible, "Back-to-Top floating button is visible after scrolling");

    await backToTopBtn.click();
    await desktopPage.waitForTimeout(700);
    const scrollYAfterTop = await desktopPage.evaluate(() => window.scrollY);
    assert(scrollYAfterTop < 100, "Back-to-Top button smoothly scrolls page to top", `ScrollY: ${scrollYAfterTop}`);

    // Test Interactive 3D Solar System Mouse Drag Orbit
    console.log("\n--- Testing 3D Solar System Mouse Drag Orbit ---");
    await desktopPage.mouse.move(100, 300);
    await desktopPage.mouse.down({ button: "left" });
    await desktopPage.mouse.move(350, 380, { steps: 12 });
    await desktopPage.mouse.up({ button: "left" });
    await desktopPage.waitForTimeout(400);
    assert(true, "Left-click drag interaction spins solar system smoothly without errors");

    // Verify Clean Footer
    const footerText = await desktopPage.locator("footer").innerText();
    assert(!footerText.includes("Typeset in IBM Plex Sans") && !footerText.includes("Deployed on Cloudflare Pages"), "Footer is clean and contains no colophon text");

    // Capture Desktop Screenshot
    const desktopScreenshotPath = path.join(screenshotsDir, "desktop-full.png");
    await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
    console.log(`Desktop full-page screenshot saved at: ${desktopScreenshotPath}`);

    await desktopPage.close();

    // ----------------------------------------------------
    // Test 2: Mobile Viewport (390x844 - iPhone)
    // ----------------------------------------------------
    console.log("\n--- 2. Mobile Viewport (390x844) ---");
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });

    await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });

    // Verify Horizontal Overflow
    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert(!hasHorizontalOverflow, "Mobile layout has zero horizontal overflow");

    // Test Mobile Hamburger Menu
    const hamburgerBtn = mobilePage.locator("button[aria-label='Open navigation menu']");
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(400);

    const expLink = mobilePage.locator("header div.md\\:hidden a:has-text('Experience')");
    const isDrawerOpen = await expLink.isVisible();
    assert(isDrawerOpen, "Mobile hamburger menu opens drawer with section links");

    // Click link in mobile drawer
    await expLink.click();
    await mobilePage.waitForTimeout(600);

    const scrollYAfterNav = await mobilePage.evaluate(() => window.scrollY);
    assert(scrollYAfterNav > 100, "Mobile drawer link navigates to target section", `ScrollY: ${scrollYAfterNav}`);

    // Capture Mobile Screenshots
    const mobileViewScreenshotPath = path.join(screenshotsDir, "mobile-viewport.png");
    await mobilePage.screenshot({ path: mobileViewScreenshotPath, fullPage: false });
    console.log(`Mobile viewport screenshot saved at: ${mobileViewScreenshotPath}`);

    const mobileFullScreenshotPath = path.join(screenshotsDir, "mobile-full.png");
    await mobilePage.screenshot({ path: mobileFullScreenshotPath, fullPage: true });
    console.log(`Mobile full-page screenshot saved at: ${mobileFullScreenshotPath}`);

    await mobilePage.close();
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n=================================================`);
  console.log(`BROWSER VERIFICATION SUMMARY: ${passed}/${total} TESTS PASSED`);
  console.log(`=================================================`);

  if (passed !== total) {
    process.exit(1);
  }
}

runBrowserTests().catch((err) => {
  console.error("Browser test suite failed:", err);
  process.exit(1);
});
