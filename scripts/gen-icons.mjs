/**
 * scripts/gen-icons.mjs
 * One-time script to generate PNG icon files from icon-512.jpg.
 * Run with: node scripts/gen-icons.mjs
 * Requires sharp: npm install --save-dev sharp
 *
 * Output files placed in public/:
 *   icon-512.png   (512x512, general PWA icon)
 *   icon-192.png   (192x192, PWA icon)
 *   apple-touch-icon.png (180x180, iOS home screen)
 *   favicon.ico    (multi-size ICO: 16x16, 32x32, 48x48)
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SRC = join(PUBLIC, 'icon-512.jpg');

console.log('Generating icons from', SRC);

// Generate PNG versions
const sizes = [
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-16.png', size: 16 },
];

for (const { name, size } of sizes) {
  await sharp(SRC)
    .resize(size, size)
    .png()
    .toFile(join(PUBLIC, name));
  console.log(`  ✓ ${name} (${size}x${size})`);
}

// Generate a maskable icon (512x512 with safe-zone padding ~10%)
const PADDING = Math.round(512 * 0.1);
await sharp(SRC)
  .resize(512 - PADDING * 2, 512 - PADDING * 2)
  .extend({
    top: PADDING, bottom: PADDING, left: PADDING, right: PADDING,
    background: { r: 15, g: 23, b: 42, alpha: 1 } // #0f172a
  })
  .png()
  .toFile(join(PUBLIC, 'icon-maskable-512.png'));
console.log('  ✓ icon-maskable-512.png (512x512 maskable)');

// Generate favicon.ico from 32x32 PNG (simple single-size ICO)
// For a proper multi-size ICO, use the png-to-ico package or a service.
// Here we write a 32x32 PNG named favicon.ico as a fallback — most modern
// browsers accept PNG for favicon.ico.
await sharp(SRC)
  .resize(32, 32)
  .png()
  .toFile(join(PUBLIC, 'favicon.ico'));
console.log('  ✓ favicon.ico (32x32 PNG-as-ICO fallback)');

console.log('\nDone! Commit all files in public/ to your repo.');
console.log('NOTE: For a true multi-size .ico file, run through https://www.favicon.cc or use the "png-to-ico" npm package.');
