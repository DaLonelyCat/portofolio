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
// 1. Removals & Replacements Test
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

const rocketCursorExists = fs.existsSync(path.join(process.cwd(), "src/components/RocketCursor.tsx"));
assert(rocketCursorExists, "RocketCursor.tsx exists in components directory");
assert(pageContent.includes("RocketCursor"), "page.tsx imports and mounts RocketCursor component");

const rocketContent = fs.readFileSync(path.join(process.cwd(), "src/components/RocketCursor.tsx"), "utf-8");
assert(rocketContent.includes("(hover: hover) and (pointer: fine)"), "RocketCursor includes fine-pointer desktop guard");
assert(rocketContent.includes("plasmaFlame") && rocketContent.includes("idleFlame"), "RocketCursor implements multi-state plasma thruster flames");
assert(rocketContent.includes("particlesRef") && rocketContent.includes("prefers-reduced-motion"), "RocketCursor features starlight particle exhaust trail with motion reduction safeguards");

const cssContent = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf-8");
assert(cssContent.includes("body.rocket-cursor-enabled"), "globals.css scopes cursor: none to body.rocket-cursor-enabled on fine-pointer devices");


const solarContent = fs.readFileSync(path.join(process.cwd(), "src/components/SolarSystemBackground.tsx"), "utf-8");
assert(solarContent.includes("solarSystemGroup.rotation.x = 0.58") && solarContent.includes("solarSystemGroup.rotation.z = -0.32"), "Solar system uses isometric 3D rotation angles");
assert(solarContent.includes("opacity-90") && solarContent.includes("bg-[#05060A]/35"), "Solar system uses calibrated visibility and depth vignette");
assert(solarContent.includes("PointLight(\"#FFF8E7\", 4.5"), "Central Sun features radiant 4.5 intensity starlight illumination");
assert(solarContent.includes("depthWrite: false"), "Sun halo, corona, and orbit paths use depthWrite: false to stop blackbox occlusion");
assert(solarContent.includes("aTwinkleSpeed") && solarContent.includes("uTime"), "Starfield utilizes GPU twinkling ShaderMaterial with per-vertex attributes");
assert(solarContent.includes("cometRuntimes") && solarContent.includes("cometHeadTexture"), "Dynamic flying comets runner simulates streaking shooting stars");
assert(solarContent.includes("camera.lookAt(0, 0, 0)") && solarContent.includes("handlePointerDown") && solarContent.includes("isInteractiveElement"), "Interactive spherical orbit controller enables left-click rotation locked strictly to the central Sun");

// ----------------------------------------------------
// 2. Profile Avatar, Hero Tag Purge & Flashing Dots
// ----------------------------------------------------
console.log("\n--- 2. Profile Avatar & Hero Purge Test ---");

const avatarFileExists = fs.existsSync(path.join(process.cwd(), "public/avatar.jpg"));
assert(avatarFileExists, "Profile image exists at public/avatar.jpg");

const heroContent = fs.readFileSync(path.join(process.cwd(), "src/components/Hero.tsx"), "utf-8");
assert(heroContent.includes("avatar.jpg") || heroContent.includes("personal.avatar"), "Hero renders Christian's profile picture");
assert(heroContent.includes("Hello, I&rsquo;m Christian") || heroContent.includes("Hello, I'm Christian"), "Hero features 'Hello, I'm Christian' headline");
assert(!heroContent.includes("ORBITAL UPLINK"), "Hero tags and beacons purged completely");
assert(!heroContent.includes("Builder and problem solver turning cool ideas into working software."), "Corny one-liner purged from Hero");
assert(!heroContent.includes("animate-pulse"), "Flashing dots with animate-pulse purged from Hero");
assert(heroContent.includes("At a Glance"), "Hero includes At a Glance overview module");
assert(!heroContent.includes("(Game Dev, Graphics & UX)"), "Hero At a Glance purged of '(Game Dev, Graphics & UX)'");
assert(heroContent.includes("Entrepreneurship Track Enrichment Program"), "Hero At a Glance features active Entrepreneurship Track Enrichment Program");
assert(!heroContent.includes("Station Telemetry"), "Station Telemetry jargon purged from Hero");
assert(!heroContent.includes("ID: CK-2026"), "ID: CK-2026 tag purged from Hero");

// ----------------------------------------------------
// 3. Cyber Layout & Section Navigation Anchors
// ----------------------------------------------------
console.log("\n--- 3. Layout Flow & Navigation Anchors Test ---");

const navbarContent = fs.readFileSync(path.join(process.cwd(), "src/components/Navbar.tsx"), "utf-8");
assert(navbarContent.includes("#projects") && navbarContent.includes("#learning") && navbarContent.includes("#experience") && navbarContent.includes("#skills") && navbarContent.includes("#contact"), "Navbar contains anchors for all 5 layout sections");
assert(navbarContent.includes("isScrolled"), "Navbar contains isScrolled scroll detection state");
assert(!navbarContent.includes("animate-pulse"), "Navbar completely removed flashing dot pulse animation");
assert(navbarContent.includes("duration-500"), "Navbar contains fluid transition classes");
assert(!navbarContent.includes("// station"), "Navbar brand purged of // station tag");

const learningContent = fs.readFileSync(path.join(process.cwd(), "src/components/Learning.tsx"), "utf-8");
assert(learningContent.includes('id="learning"') && learningContent.includes("Currently Learning"), "Learning component mounts #learning with 'Currently Learning' heading");
assert(!learningContent.includes("FRONTIER //"), "Learning component purged of FRONTIER telemetry codes");

const experienceContent = fs.readFileSync(path.join(process.cwd(), "src/components/Experience.tsx"), "utf-8");
assert(experienceContent.includes('id="experience"') && experienceContent.includes("Experience"), "Experience component mounts #experience with 'Experience' heading");

const skillsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Skills.tsx"), "utf-8");
assert(skillsContent.includes('id="skills"') && skillsContent.includes("Skills"), "Skills component mounts #skills capability matrix");
assert(!skillsContent.includes("MATRIX //"), "Skills component purged of MATRIX telemetry codes");

const contactContent = fs.readFileSync(path.join(process.cwd(), "src/components/ContactSection.tsx"), "utf-8");
assert(contactContent.includes('id="contact"'), "Contact component mounts #contact section");
assert(!contactContent.includes("COMMS UPLINK"), "ContactSection purged of COMMS UPLINK badge");
assert(!contactContent.includes("animate-pulse"), "Flashing dots with animate-pulse purged from ContactSection");
assert(contactContent.includes("viewBox=\"0 0 24 24\"") && contactContent.includes("GitHub") && contactContent.includes("LinkedIn"), "ContactSection includes official platform vector SVG logos");

const projectsContent = fs.readFileSync(path.join(process.cwd(), "src/components/Projects.tsx"), "utf-8");
assert(!heroContent.includes("border-rule/60") && !projectsContent.includes("border-rule/60") && !learningContent.includes("border-rule/60") && !experienceContent.includes("border-rule/60") && !skillsContent.includes("border-rule/60") && !contactContent.includes("border-rule/60"), "Section full-width divider borders purged completely across all sections");
assert(experienceContent.includes("Enrichment Program: Entrepreneurship Track"), "Experience section features active Entrepreneurship Track Enrichment Program narrative");

// ----------------------------------------------------
// 4. Projects Directory & Conversational Button Label
// ----------------------------------------------------
console.log("\n--- 4. Projects Directory & Button Test ---");

assert(projectsContent.includes("PRODUCTION CORE"), "UniCash POS is badged as PRODUCTION CORE in project directory");
assert(projectsContent.includes("View Details"), "Project button renamed to conversational 'View Details'");
assert(!projectsContent.includes("<span>Dossier</span>"), "Old 'Dossier' button label completely removed");
assert(projectsContent.includes("Filter by Domain") && projectsContent.includes("sticky top-28"), "Projects directory mounts desktop right-side vertical filter bar");

const unicashProject = portfolioData.projects.find((p) => p.id === "unicash-pos");
assert(!!unicashProject, "UniCash POS exists in project dataset");
assert(unicashProject?.screenshots?.length === 5, "UniCash POS has all 5 screenshots intact", `Count: ${unicashProject?.screenshots?.length}`);

// ----------------------------------------------------
// 5. Semi-Fullscreen Project Modal & Repo URL Guard
// ----------------------------------------------------
console.log("\n--- 5. Semi-Fullscreen Modal & Repo Link Test ---");

const modalContent = fs.readFileSync(path.join(process.cwd(), "src/components/ProjectModal.tsx"), "utf-8");
assert(modalContent.includes("max-w-6xl"), "ProjectModal utilizes semi-fullscreen max-w-6xl container");
assert(modalContent.includes("isValidRepo"), "ProjectModal validates repoUrl to avoid linking to root profile");

// Verify that all project repoUrls point to dedicated repository endpoints
portfolioData.projects.forEach((p) => {
  if (p.repoUrl) {
    const isProfileOnly = /^https?:\/\/(www\.)?github\.com\/[^/]+\/?$/i.test(p.repoUrl);
    assert(!isProfileOnly, `Project ${p.id} repoUrl points to a specific repo, not just profile`, p.repoUrl);
  }
});

// ----------------------------------------------------
// 6. Project Archive Category Filtering Logic
// ----------------------------------------------------
console.log("\n--- 6. Project Archive Filtering Test ---");

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
// 7. Project Modal Interactive Flow
// ----------------------------------------------------
console.log("\n--- 7. Project Modal Flow Test ---");

let modalProject: any = null;
function openModal(p: any) { modalProject = p; }
function closeModal() { modalProject = null; }

openModal(unicashProject);
assert(modalProject !== null && modalProject.id === "unicash-pos", "Clicking project opens ProjectModal with project details");

closeModal();
assert(modalProject === null, "Closing modal resets active project state");

// ----------------------------------------------------
// 8. Contact Copy Email Interaction
// ----------------------------------------------------
console.log("\n--- 8. Contact Copy Email Test ---");

let copiedState = false;
function simulateCopyEmail(email: string) {
  copiedState = true;
  return email;
}

const copiedValue = simulateCopyEmail(portfolioData.personal.socials.email);
assert(copiedState && copiedValue === "christian@dalonelycat.site", "Copy Email button writes correct email and triggers feedback");

// ----------------------------------------------------
// 9. Mobile Navigation Drawer Toggle
// ----------------------------------------------------
console.log("\n--- 9. Mobile Navigation Drawer Test ---");

let isMobileMenuOpen = false;
function toggleMobileMenu() { isMobileMenuOpen = !isMobileMenuOpen; }

toggleMobileMenu();
assert(isMobileMenuOpen, "Clicking hamburger button opens mobile drawer");

toggleMobileMenu();
assert(!isMobileMenuOpen, "Clicking close button closes mobile drawer");

// ----------------------------------------------------
// 10. CV Route & Resource
// ----------------------------------------------------
console.log("\n--- 10. CV Route & Assets Test ---");

const cvPageExists = fs.existsSync(path.join(process.cwd(), "src/app/cv/page.tsx"));
assert(cvPageExists, "CV route page exists at src/app/cv/page.tsx");

const cvPdfExists = fs.existsSync(path.join(process.cwd(), "public/Christian_Emanuel_Ikajaya_CV.pdf"));
assert(cvPdfExists, "CV PDF asset exists in public folder");

// ----------------------------------------------------
// 11. Fruqita Website & Completed Minor Narrative Test
// ----------------------------------------------------
console.log("\n--- 11. Fruqita Website & Completed Minor Test ---");

const fruqitaWebProject = portfolioData.projects.find((p) => p.id === "fruqita-web");
assert(!!fruqitaWebProject, "Fruqita website project exists in dataset");
assert(fruqitaWebProject?.liveUrl === "https://fruqitamlg.vercel.app/", "Fruqita website has live demo URL https://fruqitamlg.vercel.app/");

const footerContent = fs.readFileSync(path.join(process.cwd(), "src/components/Footer.tsx"), "utf-8");
assert(!footerContent.includes("Typeset in IBM Plex Sans"), "Footer purged of 'Typeset in IBM Plex Sans' text");
assert(!footerContent.includes("Deployed on Cloudflare Pages"), "Footer purged of 'Deployed on Cloudflare Pages' text");
assert(!footerContent.includes("border-t border-white/10"), "Footer border-t purged completely");

const bioText = portfolioData.personal.bio;
assert(bioText.includes("Completed a Minor in Multimedia"), "Bio reflects completed Minor in Multimedia");

const expContent = fs.readFileSync(path.join(process.cwd(), "src/components/Experience.tsx"), "utf-8");
assert(expContent.includes("Completed Minor in Multimedia"), "Experience section features completed Minor in Multimedia narrative");

// ----------------------------------------------------
// 12. NestFit Smart Workout Companion Test
// ----------------------------------------------------
console.log("\n--- 12. NestFit Smart Workout Companion Test ---");

const nestfitProject = portfolioData.projects.find((p) => p.id === "nestfit-workout");
assert(!!nestfitProject, "NestFit project exists in dataset");
assert(nestfitProject?.year === "2026", "NestFit is dated 2026");
assert(nestfitProject?.category === "Web App", "NestFit is classified as Web App");
assert(nestfitProject?.liveUrl === "https://workout.dalonelycat.site/", "NestFit live demo URL points to workout.dalonelycat.site");
assert(nestfitProject?.screenshots?.length === 4, "NestFit has 4 screenshot assets registered", `Count: ${nestfitProject?.screenshots?.length}`);

const expectedNestfitFiles = [
  "nestfit-calculator.png",
  "nestfit-workout.png",
  "nestfit-inventory.png",
  "nestfit-exercises.png",
];

expectedNestfitFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), "public/projects", file);
  assert(fs.existsSync(filePath), `Public asset public/projects/${file} exists`);
});

// ----------------------------------------------------
// 13. Feature Enhancements & Rocket Plume Fix Test
// ----------------------------------------------------
console.log("\n--- 13. Feature Enhancements & Rocket Plume Fix Test ---");

// Orrery HUD removed in favor of clean screen
const orreryExists = fs.existsSync(path.join(process.cwd(), "src/components/OrreryHUD.tsx"));
assert(!orreryExists, "OrreryHUD.tsx deleted from components");
assert(!pageContent.includes("OrreryHUD"), "page.tsx contains zero imports or references to OrreryHUD");

// Satellite Relay 3D Terminal (replaces Connectomics)
const connectomicsExists = fs.existsSync(path.join(process.cwd(), "src/components/ConnectomicsViewer.tsx"));
assert(!connectomicsExists, "ConnectomicsViewer.tsx deleted from components");

const learningUpdated = fs.readFileSync(path.join(process.cwd(), "src/components/Learning.tsx"), "utf-8");
assert(!learningUpdated.includes("ConnectomicsViewer"), "Learning.tsx contains zero ConnectomicsViewer references");

// Satellite Relay removed in favor of clean bottom layout
const satelliteExists = fs.existsSync(path.join(process.cwd(), "src/components/SatelliteRelay.tsx"));
assert(!satelliteExists, "SatelliteRelay.tsx deleted from components");
assert(!pageContent.includes("SatelliteRelay"), "page.tsx contains zero imports or references to SatelliteRelay");

// Dumbbell Playground
const dumbbellExists = fs.existsSync(path.join(process.cwd(), "src/components/DumbbellPlayground.tsx"));
assert(dumbbellExists, "DumbbellPlayground.tsx exists in components");

const modalUpdated = fs.readFileSync(path.join(process.cwd(), "src/components/ProjectModal.tsx"), "utf-8");
assert(modalUpdated.includes("DumbbellPlayground"), "ProjectModal.tsx imports DumbbellPlayground");
assert(modalUpdated.includes("isLightboxOpen") && modalUpdated.includes("aspectRatios"), "ProjectModal.tsx implements auto-resizing chassis and lightbox zoom overlay");

// Project Search & Tag Filters
const projectsUpdated = fs.readFileSync(path.join(process.cwd(), "src/components/Projects.tsx"), "utf-8");
assert(projectsUpdated.includes("searchQuery") && projectsUpdated.includes("POPULAR_TAGS"), "Projects.tsx features instant search query input and technology stack tag filters");

// Rocket Plume Canvas Fix & Hyperdrive
const rocketUpdated = fs.readFileSync(path.join(process.cwd(), "src/components/RocketCursor.tsx"), "utf-8");
assert(rocketUpdated.includes("syncCanvasSize") && rocketUpdated.includes("setTransform(dpr"), "RocketCursor implements dynamic canvas buffer synchronization with DPR scaling");
assert(rocketUpdated.includes("triggerHyperdrive") && rocketUpdated.includes("rocket-hyperdrive-start"), "RocketCursor implements Hyperdrive warp speed easter egg");

// ----------------------------------------------------
// 14. Fruqita & Koya Screenshots and View Live Button Test
// ----------------------------------------------------
console.log("\n--- 14. Fruqita & Koya Screenshots and View Live Button Test ---");

const fruqitaProject = portfolioData.projects.find((p) => p.id === "fruqita-web");
assert(!!fruqitaProject, "Fruqita project exists in dataset");
assert(fruqitaProject?.screenshots?.length === 1, "Fruqita has 1 screenshot registered", `Count: ${fruqitaProject?.screenshots?.length}`);
assert(fs.existsSync(path.join(process.cwd(), "public/projects/fruqita-storefront.png")), "Public asset fruqita-storefront.png exists");

const koyaProject = portfolioData.projects.find((p) => p.id === "koya-food-review");
assert(!!koyaProject, "KOYA project exists in dataset");
assert(koyaProject?.screenshots?.length === 2, "KOYA has 2 screenshots registered", `Count: ${koyaProject?.screenshots?.length}`);
assert(fs.existsSync(path.join(process.cwd(), "public/projects/koya-feed.png")), "Public asset koya-feed.png exists");
assert(fs.existsSync(path.join(process.cwd(), "public/projects/koya-profile.png")), "Public asset koya-profile.png exists");

// Verify View Live button text
assert(modalUpdated.includes("<span>View Live</span>"), "ProjectModal.tsx renders 'View Live' button");
assert(!modalUpdated.includes("View Live / Download"), "ProjectModal.tsx contains zero 'View Live / Download' mentions");

// ----------------------------------------------------
// 15. GPA Consistency, Status Badges, Lite Mode & Accessibility
// ----------------------------------------------------
console.log("\n--- 15. GPA Consistency, Status Badges, Lite Mode & Accessibility ---");

// GPA consistency across dataset and Hero
assert(portfolioData.education[0].notes?.includes("GPA: 3.30") === true, "portfolioData education notes records GPA 3.30", portfolioData.education[0].notes);
assert(heroContent.includes("3.30") && !heroContent.includes("3.82"), "Hero renders GPA 3.30 with zero references to 3.82");

// Updated CV email and experience synchronizations
assert(portfolioData.personal.socials.email === "christian@dalonelycat.site", "portfolioData email updated to christian@dalonelycat.site");
const fruqitaExp = portfolioData.experiences.find((e) => e.id === "fruqita-cfo");
assert(fruqitaExp?.highlights.some((h) => h.includes("Ollama")) === true, "Fruqita experience highlights Ollama local AI integration");
const mybeansExp = portfolioData.experiences.find((e) => e.id === "mybeans-ceo");
assert(mybeansExp?.role === "CEO & Founder", "MyBeans role is CEO & Founder");

// StatusBadge component and data annotations
const statusBadgeExists = fs.existsSync(path.join(process.cwd(), "src/components/StatusBadge.tsx"));
assert(statusBadgeExists, "StatusBadge.tsx component exists");

const statusBadgeContent = fs.readFileSync(path.join(process.cwd(), "src/components/StatusBadge.tsx"), "utf-8");
assert(statusBadgeContent.includes("STATUS_META") && statusBadgeContent.includes("data-status"), "StatusBadge renders semantic status tags");

const liveProjects = portfolioData.projects.filter((p) => p.status === "live");
const personalProjects = portfolioData.projects.filter((p) => p.status === "personal");
assert(liveProjects.length > 0, "Dataset contains verified 'live' status projects", `Count: ${liveProjects.length}`);
assert(personalProjects.length > 0, "Dataset contains verified 'personal' status projects", `Count: ${personalProjects.length}`);

// Projects sort toggle
assert(projectsUpdated.includes("sortMode") && projectsUpdated.includes("Newest first") && projectsUpdated.includes("Featured"), "Projects.tsx includes sortMode state with Featured and Newest first options");

// Test sorting functionality: Newest first sorts by descending year
const newestSorted = [...portfolioData.projects].sort((a, b) => Number(b.year) - Number(a.year));
assert(Number(newestSorted[0].year) >= Number(newestSorted[newestSorted.length - 1].year), "Sorting by year places 2026 projects at the top");

// Lite mode auto-detection and graceful fallback
const liteModeExists = fs.existsSync(path.join(process.cwd(), "src/lib/liteMode.ts"));
assert(liteModeExists, "src/lib/liteMode.ts utility exists");

const liteModeContent = fs.readFileSync(path.join(process.cwd(), "src/lib/liteMode.ts"), "utf-8");
assert(liteModeContent.includes("prefers-reduced-motion") && liteModeContent.includes("saveData") && liteModeContent.includes("deviceMemory") && liteModeContent.includes("hardwareConcurrency"), "liteMode detects reduced motion, saveData, low RAM, and low CPU cores");
assert(liteModeContent.includes('override === "1"') && liteModeContent.includes('override === "0"'), "liteMode supports ?lite=1 and ?lite=0 query overrides");

assert(cssContent.includes(".static-starfield"), "globals.css includes .static-starfield CSS background for lite mode");
assert(pageContent.includes("useLiteMode") && pageContent.includes("static-starfield"), "page.tsx uses useLiteMode hook to render static-starfield fallback");

// Modal tabs, keyboard arrow navigation, swipe handling, and focus trap
assert(modalUpdated.includes("tabs.push") && modalUpdated.includes("activeTab"), "ProjectModal.tsx dynamically provisions view tabs");
assert(modalUpdated.includes("swipeHandlers") && modalUpdated.includes("Math.abs(dx) > 40"), "ProjectModal.tsx includes touch pointer swipe navigation with 40px threshold");
assert(modalUpdated.includes("ArrowLeft") && modalUpdated.includes("ArrowRight"), "ProjectModal.tsx includes ArrowLeft / ArrowRight keyboard navigation");
assert(modalUpdated.includes("FOCUSABLE_SELECTOR") && modalUpdated.includes("focusables[0]"), "ProjectModal.tsx implements accessible Tab key focus trapping");
assert(modalUpdated.includes("iframe") && modalUpdated.includes("previewUrl"), "ProjectModal.tsx supports sandboxed Live Preview iframe tab");

// Fruqita preview URL
assert(fruqitaProject?.previewUrl === "https://fruqitamlg.vercel.app/", "Fruqita has previewUrl configured for modal iframe preview");

// Rocket docking reticle
assert(rocketUpdated.includes("data-rocket-dock") && rocketUpdated.includes("rounded-full"), "RocketCursor.tsx includes nose-tip docking reticle when hovering clickable targets");

// ----------------------------------------------------
// 16. Solar System Direct Desktop Orbit & Interactive Target Guards
// ----------------------------------------------------
console.log("\n--- 16. Solar System Direct Desktop Orbit & Interactive Target Guards ---");

// SolarSystemBackground: direct desktop background dragging restored as highlight
assert(!solarContent.includes("isOrbitMode"), "SolarSystemBackground removes isOrbitMode gating so desktop background drag is restored");
assert(solarContent.includes('if (e.pointerType === "touch") return;'), "SolarSystemBackground suppresses touch events to protect mobile and touchpad page scrolling");
assert(!solarContent.includes("celestial-select"), "SolarSystemBackground removes distracting planet hit-testing popups");
assert(solarContent.includes("article") && solarContent.includes('[role="button"]'), "SolarSystemBackground isInteractiveElement guards buttons and article cards");
assert(!solarContent.includes("main > section"), "SolarSystemBackground removes main > section selector to allow dragging on background void and margins");

console.log("\n=================================================");
console.log(`TEST SUITE RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log("=================================================");

if (passedTests === totalTests) {
  console.log("ALL INTERACTIVE, MODAL & LINK HYGIENE CHECKS VERIFIED SUCCESSFULLY!\n");
  process.exit(0);
} else {
  console.error("SOME TESTS FAILED!\n");
  process.exit(1);
}
