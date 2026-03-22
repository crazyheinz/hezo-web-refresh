/**
 * Post-build verification script
 * Checks that pre-rendered HTML files contain required SEO elements
 */
import { readFileSync, existsSync } from "fs";
import path from "path";

const DIST = path.resolve("dist");

// Routes that must be pre-rendered with full SEO content
const routes = [
  "/",
  "/onze-diensten/",
  "/zo-sluit-je-aan/",
  "/opleidingen/",
  "/vacatures/",
  "/blog/",
  "/blog/zelfstandig-thuisverpleegkundige-worden/",
  "/blog/hbo5-graduaat-basisverpleegkunde/",
  "/blog/software-thuisverpleging/",
  "/blog/patienten-thuisverpleegkundige/",
  "/blog/administratie-thuisverpleging/",
  "/contact/",
  "/privacy/",
  "/cookies/",
];

let allPassed = true;

for (const route of routes) {
  const filePath = path.join(DIST, route, "index.html");
  const label = route || "/";
  const issues = [];

  if (!existsSync(filePath)) {
    console.log(`❌ FAIL ${label} — file not found: ${filePath}`);
    allPassed = false;
    continue;
  }

  const html = readFileSync(filePath, "utf-8");

  // 1. Check <title> is present and not empty/default
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/);
  if (!titleMatch || !titleMatch[1].trim()) {
    issues.push("Missing or empty <title>");
  }

  // 2. Check meta description
  const metaDesc = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/
  );
  if (!metaDesc || !metaDesc[1].trim()) {
    issues.push("Missing or empty meta description");
  }

  // 3. Check canonical link
  const canonical = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i);
  if (!canonical) {
    issues.push("Missing canonical link");
  }

  // 4. Check structured data (JSON-LD)
  const jsonLd = html.match(
    /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>/i
  );
  if (!jsonLd) {
    issues.push("Missing structured data (JSON-LD)");
  }

  // 5. Check body has substantial content (>500 chars of text)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
  if (bodyMatch) {
    const textContent = bodyMatch[1].replace(/<[^>]*>/g, "").trim();
    if (textContent.length < 500) {
      issues.push(
        `Body text too short (${textContent.length} chars, need >500)`
      );
    }
  } else {
    issues.push("Could not parse body content");
  }

  if (issues.length === 0) {
    console.log(`✅ PASS ${label}`);
  } else {
    console.log(`❌ FAIL ${label}`);
    issues.forEach((i) => console.log(`   → ${i}`));
    allPassed = false;
  }
}

console.log("");
if (allPassed) {
  console.log("🎉 All routes passed verification!");
} else {
  console.log("⚠️  Some routes failed verification. Check output above.");
  process.exit(1);
}
