import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const globalsCssPath = path.join(projectRoot, "src", "app", "globals.css");
const globalsCss = fs.readFileSync(globalsCssPath, "utf-8");

let errors = [];

// 1. Verify @fontsource import in globals.css
if (!globalsCss.includes('@fontsource/ibm-plex-sans/300.css') || !globalsCss.includes('@fontsource/ibm-plex-sans/400.css')) {
  errors.push("globals.css missing @fontsource/ibm-plex-sans/300.css or 400.css imports");
}

// 2. Verify no Google Fonts external links in src/
function checkGoogleFonts(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", ".next", "out", ".git"].includes(entry.name)) {
        checkGoogleFonts(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|html|css)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("fonts.googleapis.com") || content.includes("fonts.gstatic.com")) {
        errors.push(`External Google Font reference in ${path.relative(projectRoot, fullPath)}`);
      }
    }
  }
}

checkGoogleFonts(path.join(projectRoot, "src"));

if (errors.length > 0) {
  console.error("FAIL: Font check errors:");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log("PASS: Font loading is 100% self-hosted locally via @fontsource/ibm-plex-sans with 0 external Google Fonts requests.");
  process.exit(0);
}
