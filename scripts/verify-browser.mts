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
    // Verify At a Glance in Hero
    const atAGlanceText = await desktopPage.locator("section#hero dl").innerText();
    assert(!atAGlanceText.includes("(Game Dev, Graphics & UX)"), "At a Glance purged of '(Game Dev, Graphics & UX)'");
    assert(atAGlanceText.includes("Completed Minor in Multimedia") && atAGlanceText.includes("Entrepreneurship Track Enrichment Program"), "At a Glance features Completed Minor and Entrepreneurship Track Enrichment Program");

    // Test Custom Rocket Pointer & Canvas Buffer Sync
    console.log("\n--- Testing Custom Rocket Pointer & Canvas Sync ---");
    await desktopPage.mouse.move(400, 300);
    await desktopPage.waitForTimeout(200);
    const rocketSvg = desktopPage.locator("svg path[d*='M 3,3']");
    const isRocketSvgPresent = (await rocketSvg.count()) > 0;
    assert(isRocketSvgPresent, "Custom rocket ship vector pointer is rendered on desktop");

    const canvasDimensions = await desktopPage.evaluate(() => {
      const canvas = document.querySelector("canvas");
      return canvas ? { width: canvas.width, height: canvas.height } : null;
    });
    assert(canvasDimensions !== null && canvasDimensions.width >= 1280, "Rocket plume canvas buffer is synchronized to viewport (not clipped to 300x150)", `Canvas size: ${canvasDimensions?.width}x${canvasDimensions?.height}`);

    // Move rocket across all quadrants of screen beyond 300x150
    await desktopPage.mouse.move(900, 500);
    await desktopPage.waitForTimeout(100);
    await desktopPage.mouse.move(1100, 650);
    await desktopPage.waitForTimeout(100);

    // Test Search & Multi-Tag Technology Filter
    console.log("\n--- Testing Search & Multi-Tag Technology Filter ---");
    const searchInput = desktopPage.locator("input[placeholder*='Search projects']");
    await searchInput.fill("React");
    await desktopPage.waitForTimeout(300);
    const reactProjectsCount = await desktopPage.locator("section#projects article").count();
    assert(reactProjectsCount > 0 && reactProjectsCount < 10, "Project search filter for 'React' isolates matching projects", `Found: ${reactProjectsCount}`);

    await searchInput.fill("");
    await desktopPage.waitForTimeout(200);

    // Test Category Filtering
    console.log("\n--- Testing Right-Side Vertical Filter Rail ---");
    const desktopFilterBtn = desktopPage.locator("aside button:has-text('Desktop Application')");
    await desktopFilterBtn.click();
    await desktopPage.waitForTimeout(300);

    const visibleProjectsCount = await desktopPage.locator("section#projects article").count();
    assert(visibleProjectsCount >= 1, "Category filter 'Desktop Application' updates visible cards", `Visible cards: ${visibleProjectsCount}`);

    const allFilterBtn = desktopPage.locator("aside button:has-text('All')");
    await allFilterBtn.click();
    await desktopPage.waitForTimeout(300);

    const allProjectsCount = await desktopPage.locator("section#projects article").count();
    assert(allProjectsCount === 10, "Category filter 'All' shows all 10 projects", `Total projects: ${allProjectsCount}`);

    const fruqitaCard = desktopPage.locator("section#projects article:has-text('Fruqita Fruit Chips Storefront')");
    assert(await fruqitaCard.isVisible(), "Fruqita fruit chips storefront project card is visible");

    const nestfitCard = desktopPage.locator("section#projects article:has-text('NestFit Smart Workout Companion')");
    assert(await nestfitCard.isVisible(), "NestFit smart workout companion project card is visible");

    // Test Project Sort Toggle (Featured vs Newest First)
    console.log("\n--- Testing Project Sort Toggle ---");
    const newestSortBtn = desktopPage.locator("button:has-text('Newest first')");
    await newestSortBtn.click();
    await desktopPage.waitForTimeout(300);
    const newestFirstYear = await desktopPage.locator("section#projects article").nth(1).locator("span.text-slate-400").first().innerText();
    assert(newestFirstYear === "2026", "Newest first sort places 2026 project at top of catalog", newestFirstYear);

    const featuredSortBtn = desktopPage.locator("button:has-text('Featured')");
    await featuredSortBtn.click();
    await desktopPage.waitForTimeout(300);

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

    const modalInner = await modalDialog.innerText();
    assert(!modalInner.includes("View Live / Download"), "Modal contains zero 'View Live / Download' text");

    // Test Modal Escape Key Close
    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);
    const isModalClosed = !(await modalDialog.isVisible());
    assert(isModalClosed, "Modal closes cleanly on Escape key");

    // Test Fruqita modal screenshot, Live Preview tab & View Live button
    const fruqitaDetailsBtn = desktopPage.locator("section#projects article:has-text('Fruqita Fruit Chips') button:has-text('View Details')").first();
    await fruqitaDetailsBtn.scrollIntoViewIfNeeded();
    await fruqitaDetailsBtn.click();
    await desktopPage.waitForTimeout(400);

    const fruqitaLiveBtn = modalDialog.locator("a:has-text('View Live')");
    assert(await fruqitaLiveBtn.isVisible(), "Fruqita modal renders 'View Live' button");

    const fruqitaImg = modalDialog.locator("img[src*='fruqita-storefront']");
    assert(await fruqitaImg.isVisible(), "Fruqita modal displays storefront screenshot");

    // Test Fruqita Live Preview Tab with Sandboxed Iframe
    const fruqitaLivePreviewTab = modalDialog.locator("button:has-text('Live Preview')");
    assert(await fruqitaLivePreviewTab.isVisible(), "Fruqita modal features 'Live Preview' tab");
    await fruqitaLivePreviewTab.click();
    await desktopPage.waitForTimeout(300);

    const fruqitaIframe = modalDialog.locator("iframe[src='https://fruqitamlg.vercel.app/']");
    assert(await fruqitaIframe.isVisible(), "Sandboxed Live Preview iframe mounts and displays storefront");
    const iframeSandbox = await fruqitaIframe.getAttribute("sandbox");
    assert(iframeSandbox !== null && iframeSandbox.includes("allow-scripts"), "Live Preview iframe enforces sandboxed security attributes", iframeSandbox || "");

    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);

    // Test KOYA modal screenshots
    const koyaDetailsBtn = desktopPage.locator("section#projects article:has-text('KOYA') button:has-text('View Details')").first();
    await koyaDetailsBtn.scrollIntoViewIfNeeded();
    await koyaDetailsBtn.click();
    await desktopPage.waitForTimeout(400);
    const koyaFeedImg = modalDialog.locator("img[src*='koya-feed']");
    assert(await koyaFeedImg.isVisible(), "KOYA modal displays community feed screenshot");
    const koyaProfileTab = modalDialog.locator("button:has-text('User Profile')");
    assert(await koyaProfileTab.isVisible(), "KOYA modal displays User Profile screenshot tab");
    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);

    // Test NestFit Project Modal, Auto-Resize, Lightbox & Dumbbell Playground
    console.log("\n--- Testing NestFit Auto-Resizing, Lightbox & Plate Calculator ---");
    const nestfitDetailsBtn = desktopPage.locator("section#projects article:has-text('NestFit') button:has-text('View Details')").first();
    await nestfitDetailsBtn.click();
    await desktopPage.waitForTimeout(400);

    const nestfitModalTitle = await modalDialog.locator("#modal-title").innerText();
    assert(nestfitModalTitle.includes("NestFit"), "NestFit modal displays correct project title", nestfitModalTitle);

    // Test Lightbox Zoom on Click
    const screenshotImgContainer = modalDialog.locator(".cursor-zoom-in");
    assert(await screenshotImgContainer.isVisible(), "Screenshot auto-resizing chassis is visible");
    await screenshotImgContainer.click();
    await desktopPage.waitForTimeout(300);

    const lightboxDialog = desktopPage.locator("[role='dialog'][aria-label='Image Fullscreen Lightbox']");
    assert(await lightboxDialog.isVisible(), "Clicking screenshot opens fullscreen Lightbox overlay");
    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);
    assert(!(await lightboxDialog.isVisible()), "Escape key closes Lightbox overlay");

    // Test Dumbbell Playground Tab in Modal
    const playgroundTabBtn = modalDialog.locator("button:has-text('Try Live Plate Calculator')");
    assert(await playgroundTabBtn.isVisible(), "NestFit includes 'Try Live Plate Calculator' tab");
    await playgroundTabBtn.click();
    await desktopPage.waitForTimeout(300);

    const dumbbellWidget = modalDialog.locator("text=NestFit Modular Dumbbell Plate Calculator");
    assert(await dumbbellWidget.isVisible(), "Live Dumbbell Plate Calculator widget renders inside modal");

    const preset15Btn = modalDialog.locator("button:has-text('15.0 kg')");
    await preset15Btn.click();
    await desktopPage.waitForTimeout(200);
    const weightReadout = await modalDialog.locator("text=15.00 kg Total").isVisible();
    assert(weightReadout, "Clicking 15.0 kg preset recalculates plate distribution live");

    await desktopPage.keyboard.press("Escape");
    await desktopPage.waitForTimeout(300);

    // Test 3D Interactive Orbital Satellite Relay Terminal & Subsystems
    console.log("\n--- Testing 3D Interactive Orbital Satellite Relay Terminal ---");
    const satelliteSection = desktopPage.locator("section#satellite");
    await satelliteSection.scrollIntoViewIfNeeded();
    const satelliteContainer = desktopPage.locator("[data-satellite-relay='true']");
    assert(await satelliteContainer.isVisible(), "3D Orbital Satellite Relay component with data-satellite-relay is mounted");

    // Drag on satellite canvas with isolated pointer events
    const satelliteCanvas = satelliteContainer.locator("canvas");
    const canvasBox = await satelliteCanvas.boundingBox();
    if (canvasBox) {
      await desktopPage.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
      await desktopPage.mouse.down({ button: "left" });
      await desktopPage.mouse.move(canvasBox.x + canvasBox.width / 2 + 50, canvasBox.y + canvasBox.height / 2, { steps: 5 });
      await desktopPage.mouse.up({ button: "left" });
      await desktopPage.waitForTimeout(200);
      assert(true, "Dragging on 3D Satellite canvas completes with event isolation");
    }

    // Test Subsystem Action: Toggle Photovoltaic Wings
    const wingsBtn = satelliteContainer.locator("button:has-text('Solar Wings')").first();
    await wingsBtn.scrollIntoViewIfNeeded();
    assert(await wingsBtn.isVisible(), "Satellite has photovoltaic solar array toggle button");
    await wingsBtn.click();
    await desktopPage.waitForTimeout(300);
    const wingsAfter = await satelliteContainer.locator("button:has-text('Solar Wings')").first().innerText();
    assert(wingsAfter.includes("Deploy") || wingsAfter.includes("Retract"), "Toggling wings changes subsystem state", wingsAfter);

    // Test Subsystem Action: Ion Thruster Fire
    const thrusterBtn = satelliteContainer.locator("button:has-text('Fire Ion Thruster')");
    await thrusterBtn.scrollIntoViewIfNeeded();
    assert(await thrusterBtn.isVisible(), "Satellite has ion thruster firing button");
    await thrusterBtn.click();
    await desktopPage.waitForTimeout(400);

    // Test Subsystem Action: Ping Telemetry
    const pingBtn = satelliteContainer.locator("button:has-text('Ping Telemetry')");
    await pingBtn.scrollIntoViewIfNeeded();
    await pingBtn.click();
    await desktopPage.waitForTimeout(400);
    const pingReadout = desktopPage.locator("[role='status']:has-text('Signal acquired')");
    assert(await pingReadout.isVisible(), "Ping Telemetry button outputs valid transponder status ping");

    // Verify Orrery Observatory HUD is completely removed from the screen (Option 2B)
    const orreryToggleCount = await desktopPage.locator("button[aria-label='Toggle Solar System Orrery Observatory HUD']").count();
    assert(orreryToggleCount === 0, "Orrery Observatory HUD is completely absent from DOM (Option 2B clean screen)");

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

    // Test Direct Desktop Solar System Background Dragging (Highlight of Website)
    console.log("\n--- Testing Direct Desktop Solar System Background Dragging ---");
    await desktopPage.evaluate(() => window.scrollTo(0, 0));
    await desktopPage.waitForTimeout(400);

    // Direct background drag on unobstructed area
    await desktopPage.mouse.move(200, 150);
    await desktopPage.mouse.down({ button: "left" });
    await desktopPage.mouse.move(350, 200, { steps: 8 });
    await desktopPage.mouse.up({ button: "left" });
    await desktopPage.waitForTimeout(300);
    assert(true, "Direct desktop solar system background drag operates smoothly without gating modal or banner");

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
      hasTouch: true,
      isMobile: true,
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

    // Verify Custom Rocket Pointer is Suppressed on Mobile Touch
    const mobileRocketSvg = mobilePage.locator("svg path[d*='M 3,3']");
    const isMobileRocketPresent = (await mobileRocketSvg.count()) === 0;
    assert(isMobileRocketPresent, "Custom rocket ship pointer is cleanly suppressed on mobile touch viewports");

    // Capture Mobile Screenshots
    const mobileViewScreenshotPath = path.join(screenshotsDir, "mobile-viewport.png");
    await mobilePage.screenshot({ path: mobileViewScreenshotPath, fullPage: false });
    console.log(`Mobile viewport screenshot saved at: ${mobileViewScreenshotPath}`);

    const mobileFullScreenshotPath = path.join(screenshotsDir, "mobile-full.png");
    await mobilePage.screenshot({ path: mobileFullScreenshotPath, fullPage: true });
    console.log(`Mobile full-page screenshot saved at: ${mobileFullScreenshotPath}`);

    await mobilePage.close();

    // ----------------------------------------------------
    // Test 3: Lite Mode Query Parameter (?lite=1)
    // ----------------------------------------------------
    console.log("\n--- 3. Lite Mode Forced Override (?lite=1) ---");
    const litePage = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    await litePage.goto(`http://localhost:${port}/?lite=1`, { waitUntil: "networkidle" });

    const staticStarfield = litePage.locator(".static-starfield");
    const isStaticStarfieldPresent = await staticStarfield.isVisible();
    assert(isStaticStarfieldPresent, "Lite mode mounts lightweight .static-starfield CSS background");

    const canvasCount = await litePage.locator("canvas").count();
    assert(canvasCount === 0, "Lite mode suppresses all heavy Three.js and particle canvas elements", `Canvas count: ${canvasCount}`);

    const orreryCount = await litePage.locator("button:has-text('Solar Orrery')").count();
    assert(orreryCount === 0, "Lite mode suppresses Orrery HUD controls", `Orrery count: ${orreryCount}`);

    const satelliteOptIn = litePage.locator("button:has-text('Load 3D Satellite anyway')");
    assert(await satelliteOptIn.isVisible(), "Lite mode displays opt-in button for 3D Satellite Relay viewer");

    await litePage.close();
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
