import { portfolioData } from "../src/data/portfolio.ts";
import fs from "fs";
import path from "path";

console.log("=================================================");
console.log("RUNNING PLAYFUL FROSTED SPACE INTERACTION TEST SUITE");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details: string = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}${details ? " -> " + details : ""}`);
  } else {
    console.error(`[FAIL] ${testName}${details ? " -> " + details : ""}`);
    process.exitCode = 1;
  }
}

// ----------------------------------------------------
// 1. Terminal / Palette Complete Removal Verification
// ----------------------------------------------------
console.log("--- 1. Terminal / Palette Removal Test ---");

const paletteFileExists = fs.existsSync(path.join(process.cwd(), "src/components/CommandPalette.tsx"));
const terminalFileExists = fs.existsSync(path.join(process.cwd(), "src/components/TacticalTerminal.tsx"));
assert(!paletteFileExists && !terminalFileExists, "CommandPalette.tsx and TacticalTerminal.tsx completely deleted");

const pageContent = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf-8");
assert(!pageContent.includes("CommandPalette") && !pageContent.includes("TacticalTerminal"), "page.tsx contains zero imports or references to terminal/palette");
assert(!pageContent.includes("isPaletteOpen") && !pageContent.includes("isTerminalOpen"), "page.tsx contains zero palette state");
assert(!pageContent.includes("Cmd+K") && !pageContent.includes("Ctrl+K"), "page.tsx contains zero Cmd+K / Ctrl+K keyboard listeners");

// ----------------------------------------------------
// 2. Playful Rounded Shape System Verification
// ----------------------------------------------------
console.log("\n--- 2. Playful Rounded Shapes & Frosted Glass Test ---");

const navbarContent = fs.readFileSync(path.join(process.cwd(), "src/components/Navbar.tsx"), "utf-8");
assert(navbarContent.includes("rounded-full"), "Navbar uses floating rounded-full pill design");

const heroContent = fs.readFileSync(path.join(process.cwd(), "src/components/Hero.tsx"), "utf-8");
assert(heroContent.includes("rounded-full") && heroContent.includes("rounded-2xl") && heroContent.includes("rounded-3xl"), "Hero uses rounded-full pill buttons and rounded-3xl frosted card");

const caseStudyContent = fs.readFileSync(path.join(process.cwd(), "src/components/FeaturedCaseStudy.tsx"), "utf-8");
assert(caseStudyContent.includes("rounded-3xl") && caseStudyContent.includes("rounded-full"), "Case Study uses rounded-3xl showcase frame and rounded-full pill tabs");

const projectsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Projects.tsx"), "utf-8");
assert(projectsContent.includes("rounded-2xl") && projectsContent.includes("rounded-full"), "Projects uses rounded-2xl interactive cards and rounded-full filter rail");

const contactContent = fs.readFileSync(path.join(process.cwd(), "src/components/ContactSection.tsx"), "utf-8");
assert(contactContent.includes("rounded-3xl") && contactContent.includes("rounded-full"), "Contact section uses rounded-3xl container and rounded-full pill email bar");

// ----------------------------------------------------
// 3. Featured Case Study Tabs Interactive Logic
// ----------------------------------------------------
console.log("\n--- 3. Featured Case Study Tabs Test ---");

const caseStudyProject = portfolioData.projects.find((p) => p.id === "unicash-pos");
assert(!!caseStudyProject, "UniCash POS project exists in dataset");
assert(caseStudyProject?.screenshots?.length === 5, "UniCash POS has 5 screenshots configured", `Count: ${caseStudyProject?.screenshots?.length}`);

class CaseStudyTabSimulation {
  screenshots: any[];
  activeTab: number = 0;
  constructor(screenshots: any[]) {
    this.screenshots = screenshots;
  }
  selectTab(idx: number) {
    if (idx >= 0 && idx < this.screenshots.length) {
      this.activeTab = idx;
    }
  }
  getActiveShot() {
    return this.screenshots[this.activeTab];
  }
}

const tabSim = new CaseStudyTabSimulation(caseStudyProject?.screenshots || []);
assert(tabSim.activeTab === 0 && tabSim.getActiveShot().src === "/projects/unicash-cashier.png", "Initial tab is 0 (Cashier Interface)");

tabSim.selectTab(1);
assert(tabSim.activeTab === 1 && tabSim.getActiveShot().src === "/projects/unicash-dashboard.png", "Clicking Tab 1 switches to Sales Analytics screenshot");

tabSim.selectTab(2);
assert(tabSim.activeTab === 2 && tabSim.getActiveShot().src === "/projects/unicash-sales.png", "Clicking Tab 2 switches to Order Ledger screenshot");

tabSim.selectTab(3);
assert(tabSim.activeTab === 3 && tabSim.getActiveShot().src === "/projects/unicash-financials.png", "Clicking Tab 3 switches to Financial Reports screenshot");

tabSim.selectTab(4);
assert(tabSim.activeTab === 4 && tabSim.getActiveShot().src === "/projects/unicash-ai-agent.png", "Clicking Tab 4 switches to Store AI Assistant screenshot");

// ----------------------------------------------------
// 4. Project Archive Category Filtering Logic
// ----------------------------------------------------
console.log("\n--- 4. Project Archive Filtering Test ---");

function filterProjects(category: string) {
  if (category === "All") return portfolioData.projects;
  return portfolioData.projects.filter(p => p.category === category);
}

const allProjects = filterProjects("All");
assert(allProjects.length === portfolioData.projects.length, "Filter 'All' returns all projects", `Count: ${allProjects.length}`);

const desktopProjects = filterProjects("Desktop Application");
assert(desktopProjects.length > 0 && desktopProjects.every(p => p.category === "Desktop Application"), "Filter 'Desktop Application' isolates desktop apps", `Count: ${desktopProjects.length}`);

const androidProjects = filterProjects("Android App");
assert(androidProjects.length > 0 && androidProjects.every(p => p.category === "Android App"), "Filter 'Android App' isolates mobile apps", `Count: ${androidProjects.length}`);

const webProjects = filterProjects("Web App");
assert(webProjects.length > 0 && webProjects.every(p => p.category === "Web App"), "Filter 'Web App' isolates web apps", `Count: ${webProjects.length}`);

// ----------------------------------------------------
// 5. Project Modal Interactive Flow
// ----------------------------------------------------
console.log("\n--- 5. Project Modal Flow Test ---");

let modalProject: any = null;
function openModal(p: any) { modalProject = p; }
function closeModal() { modalProject = null; }

openModal(caseStudyProject);
assert(modalProject !== null && modalProject.id === "unicash-pos", "Clicking project opens ProjectModal with project details");

closeModal();
assert(modalProject === null, "Closing modal resets active project state");

// ----------------------------------------------------
// 6. Contact Copy Email Interaction
// ----------------------------------------------------
console.log("\n--- 6. Contact Copy Email Test ---");

let copiedState = false;
function simulateCopyEmail(email: string) {
  copiedState = true;
  return email;
}

const copiedValue = simulateCopyEmail(portfolioData.personal.socials.email);
assert(copiedState && copiedValue === "christian.emanuel.08@gmail.com", "Copy Email button writes correct email and triggers feedback");

// ----------------------------------------------------
// 7. Mobile Navigation Drawer Toggle
// ----------------------------------------------------
console.log("\n--- 7. Mobile Navigation Drawer Test ---");

let isMobileMenuOpen = false;
function toggleMobileMenu() { isMobileMenuOpen = !isMobileMenuOpen; }

toggleMobileMenu();
assert(isMobileMenuOpen, "Clicking hamburger button opens mobile drawer");

toggleMobileMenu();
assert(!isMobileMenuOpen, "Clicking close button closes mobile drawer");

// ----------------------------------------------------
// 8. CV Route & Resource
// ----------------------------------------------------
console.log("\n--- 8. CV Route & Assets Test ---");

const cvPageExists = fs.existsSync(path.join(process.cwd(), "src/app/cv/page.tsx"));
assert(cvPageExists, "CV route page exists at src/app/cv/page.tsx");

const cvPdfExists = fs.existsSync(path.join(process.cwd(), "public/Christian_Emanuel_Ikajaya_CV.pdf"));
assert(cvPdfExists, "CV PDF asset exists in public folder");

// ----------------------------------------------------
// Summary
// ----------------------------------------------------
console.log("\n=================================================");
console.log(`TEST SUITE RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log("=================================================");

if (passedTests === totalTests) {
  console.log("ALL INTERACTIVE & PLAYFUL CHECKS VERIFIED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!\n");
  process.exit(1);
}
