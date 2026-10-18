import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);
const assetPattern = /['"`]\/(?!\/)([^'"`?#]+\.(?:png|jpe?g|webp|gif|svg|ico|mp4|mov|webm|avif))[^'"`]*['"`]/gi;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return extensions.has(path.extname(entry.name)) ? [full] : [];
  });
}

const refs = new Set();
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(assetPattern)) refs.add(`/${match[1]}`);
}

if (!fs.existsSync(publicDir)) {
  console.error('public/ is missing. Copy the public folder from the current React project first.');
  process.exit(1);
}

const missing = [...refs].filter((ref) => !fs.existsSync(path.join(publicDir, ref.slice(1))));
if (missing.length) {
  console.error(`Missing ${missing.length} referenced public assets:`);
  for (const item of missing) console.error(`  ${item}`);
  process.exit(1);
}

console.log(`Public assets OK: ${refs.size} referenced files found.`);
