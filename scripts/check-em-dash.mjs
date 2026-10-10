import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const excludeDirs = ["node_modules", ".next", "out", ".git"];
const extensions = [".md", ".ts", ".tsx", ".json", ".css"];

let violations = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!excludeDirs.includes(entry.name)) {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes("—")) {
            violations.push({
              file: path.relative(projectRoot, fullPath),
              line: i + 1,
              content: lines[i].trim(),
            });
          }
        }
      }
    }
  }
}

scanDir(projectRoot);

if (violations.length > 0) {
  console.error("FAIL: Found em dash ('—') violations:");
  violations.forEach((v) => {
    console.error(`  ${v.file}:${v.line} -> ${v.content}`);
  });
  process.exit(1);
} else {
  console.log("PASS: Zero em dashes ('—') found across the repository.");
  process.exit(0);
}
