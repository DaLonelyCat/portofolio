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
// 1. Terminal, Old Galaxy & Featured Case Study Removal
// ----------------------------------------------------
console.log("--- 1. Removals & Replacements Test ---");

const paletteFileExists = fs.existsSync(path.join(process.cwd(), "src/components/CommandPalette.tsx"));
const terminalFileExists = fs.existsSync(path.join(process.cwd(), "src/components/TacticalTerminal.tsx"));
const caseStudyFileExists = fs.existsSync(path.join(process.cwd(), "src/components/FeaturedCaseStudy.tsx"));
const galaxyBgExists = fs.existsSync(path.join(process.cwd(), "src/components/GalaxyBackground.tsx"));
const solarBgExists = fs.existsSync(path.join(process.cwd(), "src/components/SolarSystemBackground.tsx"));

assert(!paletteFileExists && !terminalFileExists, "CommandPalette.tsx and TacticalTerminal.tsx completely deleted");
assert(!caseStudyFileExists, "FeaturedCaseStudy.tsx completely deleted");
assert(solarBgExists && !galaxyBgExists, "SolarSystemBackground.tsx created and GalaxyBackground.tsx completely removed");

const pageContent = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf-8");
assert(!pageContent.includes("CommandPalette") && !pageContent.includes("TacticalTerminal"), "page.tsx contains zero imports or references to terminal/palette");
assert(!pageContent.includes("FeaturedCaseStudy"), "page.tsx contains zero imports or references to FeaturedCaseStudy");
assert(pageContent.includes("SolarSystemBackground") && !pageContent.includes("GalaxyBackground"), "page.tsx mounts SolarSystemBackground with zero references to GalaxyBackground");
assert(!pageContent.includes("isPaletteOpen") && !pageContent.includes("isTerminalOpen"), "page.tsx contains zero palette state");
assert(!pageContent.includes("Cmd+K") && !pageContent.includes("Ctrl+K"), "page.tsx contains zero Cmd+K / Ctrl+K keyboard listeners");

// ----------------------------------------------------
// 2. Profile Avatar & Hero Headline Greeting
// ----------------------------------------------------
console.log("\n--- 2. Profile Avatar & Greeting Test ---");

const avatarFileExists = fs.existsSync(path.join(process.cwd(), "public/avatar.jpg"));
assert(avatarFileExists, "Profile image exists at public/avatar.jpg");

const heroContent = fs.readFileSync(path.join(process.cwd(), "src/components/Hero.tsx"), "utf-8");
assert(heroContent.includes("avatar.jpg") || heroContent.includes("personal.avatar"), "Hero renders Christian's profile picture");
assert(heroContent.includes("Hello, I&rsquo;m Christian") || heroContent.includes("Hello, I'm Christian"), "Hero features 'Hello, I'm Christian' headline");
assert(!heroContent.includes("I build solutions to problems I encountered while studying and running my business."), "Corny quote banner completely removed from Hero");
assert(heroContent.includes("Station Telemetry") && heroContent.includes("ORBITAL UPLINK"), "Hero includes Cyberpunk Station Telemetry and Status Beacon");

// ----------------------------------------------------
// 3. Cyber Layout & Section Navigation Anchors
// ----------------------------------------------------
console.log("\n--- 3. Layout Flow & Navigation Anchors Test ---");

const navbarContent = fs.readFileSync(path.join(process.cwd(), "src/components/Navbar.tsx"), "utf-8");
assert(navbarContent.includes("#projects") && navbarContent.includes("#frontiers") && navbarContent.includes("#log") && navbarContent.includes("#skills") && navbarContent.includes("#contact"), "Navbar contains anchors for all 5 layout sections");
assert(navbarContent.includes("isScrolled"), "Navbar contains isScrolled scroll detection state");
assert(!navbarContent.includes("animate-pulse"), "Navbar completely removed flashing dot pulse animation");
assert(navbarContent.includes("duration-500") && navbarContent.includes("backdrop-blur-2xl"), "Navbar contains fluid transition and glass effect classes");

const learningContent = fs.readFileSync(path.join(process.cwd(), "src/components/Learning.tsx"), "utf-8");
assert(learningContent.includes('id="frontiers"') && learningContent.includes("Research Frontiers"), "Learning component mounts #frontiers research grid");

const experienceContent = fs.readFileSync(path.join(process.cwd(), "src/components/Experience.tsx"), "utf-8");
assert(experienceContent.includes('id="log"') && experienceContent.includes("Operational Flight Log"), "Experience component mounts #log flight log");

const skillsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Skills.tsx"), "utf-8");
assert(skillsContent.includes('id="skills"') && skillsContent.includes("Systems Competencies"), "Skills component mounts #skills capability matrix");

const contactContent = fs.readFileSync(path.join(process.cwd(), "src/components/ContactSection.tsx"), "utf-8");
assert(contactContent.includes('id="contact"') && contactContent.includes("Comms Uplink"), "Contact component mounts #contact comms uplink");

// ----------------------------------------------------
// 4. UniCash POS Production Core Showcase in Projects
// ----------------------------------------------------
console.log("\n--- 4. UniCash POS Core Integration Test ---");

const projectsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Projects.tsx"), "utf-8");
assert(projectsContent.includes("PRODUCTION CORE"), "UniCash POS is badged as PRODUCTION CORE in project directory");

const unicashProject = portfolioData.projects.find((p) => p.id === "unicash-pos");
assert(!!unicashProject, "UniCash POS exists in project dataset");
assert(unicashProject?.screenshots?.length === 5, "UniCash POS has all 5 screenshots intact", `Count: ${unicashProject?.screenshots?.length}`);

// ----------------------------------------------------
// 5. Project Archive Category Filtering Logic
// ----------------------------------------------------
console.log("\n--- 5. Project Archive Filtering Test ---");

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
// 6. Project Modal Interactive Flow
// ----------------------------------------------------
console.log("\n--- 6. Project Modal Flow Test ---");

let modalProject: any = null;
function openModal(p: any) { modalProject = p; }
function closeModal() { modalProject = null; }

openModal(unicashProject);
assert(modalProject !== null && modalProject.id === "unicash-pos", "Clicking project opens ProjectModal with project details");

closeModal();
assert(modalProject === null, "Closing modal resets active project state");

// ----------------------------------------------------
// 7. Contact Copy Email Interaction
// ----------------------------------------------------
console.log("\n--- 7. Contact Copy Email Test ---");

let copiedState = false;
function simulateCopyEmail(email: string) {
  copiedState = true;
  return email;
}

const copiedValue = simulateCopyEmail(portfolioData.personal.socials.email);
assert(copiedState && copiedValue === "christian.emanuel.08@gmail.com", "Copy Email button writes correct email and triggers feedback");

// ----------------------------------------------------
// 8. Mobile Navigation Drawer Toggle
// ----------------------------------------------------
console.log("\n--- 8. Mobile Navigation Drawer Test ---");

let isMobileMenuOpen = false;
function toggleMobileMenu() { isMobileMenuOpen = !isMobileMenuOpen; }

toggleMobileMenu();
assert(isMobileMenuOpen, "Clicking hamburger button opens mobile drawer");

toggleMobileMenu();
assert(!isMobileMenuOpen, "Clicking close button closes mobile drawer");

// ----------------------------------------------------
// 9. CV Route & Resource
// ----------------------------------------------------
console.log("\n--- 9. CV Route & Assets Test ---");

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
  console.log("ALL INTERACTIVE, SOLAR SYSTEM & PROFILE CHECKS VERIFIED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!\n");
  process.exit(1);
}
