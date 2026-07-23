import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function readProjectFile(path) {
  return readFile(new URL(path, root), "utf8");
}

test("static website contains the active Nia Hagler content", async () => {
  const html = await readProjectFile("static/index.html");

  assert.match(html, /<title>Nia Hagler Wrestling — Private Training in Southern Utah<\/title>/);
  assert.match(html, /NIA HAGLER/);
  assert.match(html, /WRESTLING/);
  assert.match(html, /https:\/\/www\.instagram\.com\/nia_tortilla7\//);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /id="privacy-policy"/);
  assert.match(html, /id="training-disclaimer"/);
  assert.match(html, /parent\/guardian/i);
  assert.match(html, /Photos or videos should only be submitted or used on the site with permission/i);
  assert.doesNotMatch(html, /These policies keep the website simple/i);
});

test("security headers are strict for a static public site", async () => {
  const headers = await readProjectFile("_headers");

  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /script-src 'none'/);
  assert.match(headers, /form-action 'none'/);
  assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /Strict-Transport-Security:/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Permissions-Policy:/);
  assert.match(headers, /camera=\(\)/);
  assert.match(headers, /microphone=\(\)/);
  assert.match(headers, /geolocation=\(\)/);
  assert.match(headers, /payment=\(\)/);
});

test("repo security documentation covers the requested checklist", async () => {
  const [readme, security, gitignore] = await Promise.all([
    readProjectFile("README.md"),
    readProjectFile("SECURITY.md"),
    readProjectFile(".gitignore"),
  ]);

  assert.match(gitignore, /^\.env\*/m);
  assert.match(readme, /Project structure/);
  assert.match(readme, /Security posture/);

  for (const topic of [
    "Environment variables",
    "Authentication / auth flow",
    "User input validation",
    "API/server-side logic",
    "Database tables",
    "Availability logs",
    "System logs",
    "Threat logs",
    "Endpoint monitoring",
    "Architecture diagram",
    "Update workflow",
    "Project/file structure",
    "App checklist",
  ]) {
    assert.match(security, new RegExp(topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("no dotenv files are committed", async () => {
  const entries = await readdir(root);
  assert.deepEqual(entries.filter((entry) => entry.startsWith(".env")), []);
});
