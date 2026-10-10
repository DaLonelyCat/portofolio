import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const targetDirs = [
  path.join(projectRoot, "src", "components"),
  path.join(projectRoot, "src", "app"),
  path.join(projectRoot, "src", "data"),
];

let violations = [];

function checkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkFiles(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Match user-facing or component references to terminal or CLI
        if (/\b(terminal|cli)\b/i.test(line)) {
          violations.push({
            file: path.relative(projectRoot, fullPath),
            line: i + 1,
            content: line.trim(),
          });
        }
      }
    }
  }
}

targetDirs.forEach((d) => {
  if (fs.existsSync(d)) checkFiles(d);
});

if (violations.length > 0) {
  console.error("FAIL: Found 'terminal' or 'cli' mentions in UI/data files:");
  violations.forEach((v) => {
    console.error(`  ${v.file}:${v.line} -> ${v.content}`);
  });
  process.exit(1);
} else {
  console.log("PASS: Zero 'terminal' or 'cli' mentions found in UI and data files.");
  process.exit(0);
}
