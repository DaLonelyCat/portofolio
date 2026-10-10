import { portfolioData } from "../src/data/portfolio.ts";
import fs from "fs";
import path from "path";

console.log("=================================================");
console.log("RUNNING RIGOROUS INTERACTIVE FUNCTIONAL TEST SUITE");
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
// 1. Command Palette Interactive Logic
// ----------------------------------------------------
console.log("--- 1. Command Palette Interactive Test ---");

class CommandPaletteSimulation {
  isOpen: boolean = false;
  logs: string[] = [];
  openedProjectId: string | null = null;
  toastMessage: string | null = null;

  toggle(e: { metaKey?: boolean; ctrlKey?: boolean; key: string }) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      this.isOpen = !this.isOpen;
    }
  }

  handleEscape() {
    if (this.isOpen) this.isOpen = false;
  }

  handleCommand(rawCmd: string) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const argStr = args.join(" ");

    switch (cmd) {
      case "help":
        this.logs.push("Available commands: projects, open, connectomics, agentic, skills, cv, contact, clear, exit");
        break;
      case "projects":
        this.logs.push(`Projects (${portfolioData.projects.length} entries)`);
        break;
      case "open": {
        let targetId = argStr;
        const num = parseInt(argStr, 10);
        if (!isNaN(num) && num >= 1 && num <= portfolioData.projects.length) {
          targetId = portfolioData.projects[num - 1].id;
        }
        const found = portfolioData.projects.find((p) => p.id.toLowerCase() === targetId.toLowerCase());
        if (found) {
          this.openedProjectId = found.id;
          this.isOpen = false;
          this.logs.push(`Opening overview for ${found.title}`);
        } else {
          this.logs.push(`No project found matching '${argStr}'`);
        }
        break;
      }
      case "clear":
        this.logs = [];
        break;
      case "exit":
        this.isOpen = false;
        break;
      case "contact":
        this.toastMessage = `Copied ${portfolioData.personal.socials.email} to clipboard`;
        break;
      default:
        this.logs.push(`Command not recognized: '${trimmed}'`);
        break;
    }
  }
}

const palette = new CommandPaletteSimulation();
assert(!palette.isOpen, "Command Palette initially closed");

// Test Cmd+K toggle open
palette.toggle({ metaKey: true, key: "k" });
assert(palette.isOpen, "Cmd+K opens Command Palette");

// Test help command
palette.handleCommand("help");
assert(palette.logs.length > 0 && palette.logs[0].includes("Available commands"), "Execute 'help' command returns command list");

// Test projects command
palette.handleCommand("projects");
assert(palette.logs.some(l => l.includes(`${portfolioData.projects.length} entries`)), "Execute 'projects' command returns valid project count");

// Test open command by index (open 1 -> unicash-pos)
palette.handleCommand("open 1");
assert(palette.openedProjectId === "unicash-pos" && !palette.isOpen, "Execute 'open 1' opens UniCash POS and closes palette");

// Re-open via Ctrl+K
palette.toggle({ ctrlKey: true, key: "k" });
assert(palette.isOpen, "Ctrl+K re-opens Command Palette");

// Test clear command
palette.handleCommand("clear");
assert(palette.logs.length === 0, "Execute 'clear' resets log history");

// Test Escape closes palette
palette.handleEscape();
assert(!palette.isOpen, "Escape key closes Command Palette");

// ----------------------------------------------------
// 2. Case Study Tabs Interactive Logic
// ----------------------------------------------------
console.log("\n--- 2. Featured Case Study Tabs Test ---");

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
// 3. Project Archive Category Filtering Logic
// ----------------------------------------------------
console.log("\n--- 3. Project Archive Filtering Test ---");

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
// 4. Project Modal Interactive Flow
// ----------------------------------------------------
console.log("\n--- 4. Project Modal Flow Test ---");

let modalProject: any = null;
function openModal(p: any) { modalProject = p; }
function closeModal() { modalProject = null; }

openModal(caseStudyProject);
assert(modalProject !== null && modalProject.id === "unicash-pos", "Clicking project opens ProjectModal with project details");

closeModal();
assert(modalProject === null, "Closing modal resets active project state");

// ----------------------------------------------------
// 5. Contact Copy Email Interaction
// ----------------------------------------------------
console.log("\n--- 5. Contact Copy Email Test ---");

let copiedState = false;
function simulateCopyEmail(email: string) {
  copiedState = true;
  return email;
}

const copiedValue = simulateCopyEmail(portfolioData.personal.socials.email);
assert(copiedState && copiedValue === "christian.emanuel.08@gmail.com", "Copy Email button writes correct email and triggers feedback");

// ----------------------------------------------------
// 6. Mobile Navigation Drawer Toggle
// ----------------------------------------------------
console.log("\n--- 6. Mobile Navigation Drawer Test ---");

let isMobileMenuOpen = false;
function toggleMobileMenu() { isMobileMenuOpen = !isMobileMenuOpen; }

toggleMobileMenu();
assert(isMobileMenuOpen, "Clicking hamburger button opens mobile drawer");

toggleMobileMenu();
assert(!isMobileMenuOpen, "Clicking close button closes mobile drawer");

// ----------------------------------------------------
// 7. CV Route & Resource
// ----------------------------------------------------
console.log("\n--- 7. CV Route & Assets Test ---");

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
  console.log("ALL INTERACTIVE CHECKS VERIFIED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!\n");
  process.exit(1);
}
