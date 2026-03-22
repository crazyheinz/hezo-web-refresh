/**
 * Auto-generate public/sitemap.xml from static routes + blogArticles.ts
 * Run as prebuild step: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const SITE = "https://www.hezo.be";

// Static routes with their priority and changefreq
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/onze-diensten/", priority: "0.8", changefreq: "monthly" },
  { path: "/zo-sluit-je-aan/", priority: "0.8", changefreq: "monthly" },
  { path: "/opleidingen/", priority: "0.8", changefreq: "monthly" },
  { path: "/vacatures/", priority: "0.8", changefreq: "weekly" },
  { path: "/contact/", priority: "0.7", changefreq: "monthly" },
  { path: "/blog/", priority: "0.8", changefreq: "weekly" },
  { path: "/privacy/", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies/", priority: "0.3", changefreq: "yearly" },
];

// Parse blogArticles from the TS source file
const blogFile = readFileSync(
  path.resolve("src/data/blogArticles.ts"),
  "utf-8"
);

// Extract article objects using a simple regex approach
const articleRegex = /{\s*id:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g;
const blogRoutes = [];
let match;
while ((match = articleRegex.exec(blogFile)) !== null) {
  blogRoutes.push({
    path: `/blog/${match[1]}/`,
    lastmod: match[2],
    priority: "0.7",
    changefreq: "monthly",
  });
}

// Build XML
const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticRoutes.map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
  ...blogRoutes.map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(path.resolve("public/sitemap.xml"), xml, "utf-8");
console.log(`✅ Sitemap generated with ${urls.length} URLs`);
