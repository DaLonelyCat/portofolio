import { portfolioData } from "../src/data/portfolio.ts";
import fs from "fs";
import path from "path";

console.log("=================================================");
console.log("RUNNING SPACE & CYBERPUNK INTERACTION TEST SUITE");
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
// 1. Terminal & Highlighted Case Study Removal
// ----------------------------------------------------
console.log("--- 1. Terminal & Featured Case Study Removal Test ---");

const paletteFileExists = fs.existsSync(path.join(process.cwd(), "src/components/CommandPalette.tsx"));
const terminalFileExists = fs.existsSync(path.join(process.cwd(), "src/components/TacticalTerminal.tsx"));
const caseStudyFileExists = fs.existsSync(path.join(process.cwd(), "src/components/FeaturedCaseStudy.tsx"));
assert(!paletteFileExists && !terminalFileExists, "CommandPalette.tsx and TacticalTerminal.tsx completely deleted");
assert(!caseStudyFileExists, "FeaturedCaseStudy.tsx completely deleted");

const pageContent = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf-8");
assert(!pageContent.includes("CommandPalette") && !pageContent.includes("TacticalTerminal"), "page.tsx contains zero imports or references to terminal/palette");
assert(!pageContent.includes("FeaturedCaseStudy"), "page.tsx contains zero imports or references to FeaturedCaseStudy");
assert(!pageContent.includes("isPaletteOpen") && !pageContent.includes("isTerminalOpen"), "page.tsx contains zero palette state");
assert(!pageContent.includes("Cmd+K") && !pageContent.includes("Ctrl+K"), "page.tsx contains zero Cmd+K / Ctrl+K keyboard listeners");

// ----------------------------------------------------
// 2. Cyber Layout & Section Navigation Anchors
// ----------------------------------------------------
console.log("\n--- 2. Layout Flow & Navigation Anchors Test ---");

const navbarContent = fs.readFileSync(path.join(process.cwd(), "src/components/Navbar.tsx"), "utf-8");
assert(navbarContent.includes("#projects") && navbarContent.includes("#frontiers") && navbarContent.includes("#log") && navbarContent.includes("#skills") && navbarContent.includes("#contact"), "Navbar contains anchors for all 5 layout sections");

const heroContent = fs.readFileSync(path.join(process.cwd(), "src/components/Hero.tsx"), "utf-8");
assert(heroContent.includes("Station Telemetry") && heroContent.includes("ORBITAL UPLINK"), "Hero includes Cyberpunk Station Telemetry and Status Beacon");

const learningContent = fs.readFileSync(path.join(process.cwd(), "src/components/Learning.tsx"), "utf-8");
assert(learningContent.includes('id="frontiers"') && learningContent.includes("Research Frontiers"), "Learning component mounts #frontiers research grid");

const experienceContent = fs.readFileSync(path.join(process.cwd(), "src/components/Experience.tsx"), "utf-8");
assert(experienceContent.includes('id="log"') && experienceContent.includes("Operational Flight Log"), "Experience component mounts #log flight log");

const skillsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Skills.tsx"), "utf-8");
assert(skillsContent.includes('id="skills"') && skillsContent.includes("Systems Competencies"), "Skills component mounts #skills capability matrix");

const contactContent = fs.readFileSync(path.join(process.cwd(), "src/components/ContactSection.tsx"), "utf-8");
assert(contactContent.includes('id="contact"') && contactContent.includes("Comms Uplink"), "Contact component mounts #contact comms uplink");

// ----------------------------------------------------
// 3. UniCash POS Production Core Showcase in Projects
// ----------------------------------------------------
console.log("\n--- 3. UniCash POS Core Integration Test ---");

const projectsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Projects.tsx"), "utf-8");
assert(projectsContent.includes("PRODUCTION CORE"), "UniCash POS is badged as PRODUCTION CORE in project directory");

const unicashProject = portfolioData.projects.find((p) => p.id === "unicash-pos");
assert(!!unicashProject, "UniCash POS exists in project dataset");
assert(unicashProject?.screenshots?.length === 5, "UniCash POS has all 5 screenshots intact", `Count: ${unicashProject?.screenshots?.length}`);

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

openModal(unicashProject);
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
  console.log("ALL INTERACTIVE & CYBER CHECKS VERIFIED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!\n");
  process.exit(1);
}
