// Genera la ilustración PLACEHOLDER del hero (plano técnico de una brida) en src/assets/. Uso: npm run images
// Reemplaza src/assets/hero-pieza.png por una foto real de planta o pieza (4:3, ≥ 1200 px de ancho).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = (name) => fileURLToPath(new URL(`../src/assets/${name}`, import.meta.url));
const L = '#c5d1db'; // líneas
const A = '#fdba74'; // cotas
const F = 'font-family="Consolas, monospace" font-size="18" fill="#fdba74"';

const holes = [0, 60, 120, 180, 240, 300]
  .map((d) => {
    const r = (d * Math.PI) / 180;
    return `<circle cx="${300 + 150 * Math.cos(r)}" cy="${330 + 150 * Math.sin(r)}" r="16" fill="none" stroke="${L}" stroke-width="3"/>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">
  <rect width="960" height="720" fill="#16232e"/>
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
    ${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 32} 0v720"/>`).join('')}
    ${Array.from({ length: 23 }, (_, i) => `<path d="M0 ${i * 32}h960"/>`).join('')}
  </g>
  <!-- vista frontal -->
  <path d="M300 120v420M90 330h420" stroke="${A}" stroke-width="1.5" stroke-dasharray="14 6 3 6" opacity=".7"/>
  <circle cx="300" cy="330" r="200" fill="none" stroke="${L}" stroke-width="4"/>
  <circle cx="300" cy="330" r="150" fill="none" stroke="${A}" stroke-width="1.5" stroke-dasharray="14 6 3 6" opacity=".7"/>
  <circle cx="300" cy="330" r="95" fill="none" stroke="${L}" stroke-width="4"/>
  <circle cx="300" cy="330" r="55" fill="none" stroke="${L}" stroke-width="3"/>
  ${holes}
  <!-- cota diámetro exterior -->
  <path d="M100 590h400M100 575v30M500 575v30" stroke="${A}" stroke-width="2"/>
  <text x="300" y="625" text-anchor="middle" ${F}>Ø 160.00 ±0.02</text>
  <text x="430" y="170" ${F}>6× Ø 12.0 H7</text>
  <path d="M425 175l-35 40" stroke="${A}" stroke-width="2"/>
  <!-- vista lateral en corte -->
  <g transform="translate(640 130)">
    <path d="M0 0h70v120h80v160h-80v120H0z" fill="rgba(197,209,219,0.08)" stroke="${L}" stroke-width="4"/>
    <path d="M0 145h150M0 255h150" stroke="${L}" stroke-width="3"/>
    <clipPath id="cut"><rect x="0" y="0" width="70" height="145"/><rect x="70" y="120" width="80" height="25"/><rect x="0" y="255" width="70" height="145"/><rect x="70" y="255" width="80" height="25"/></clipPath>
    <g stroke="${L}" stroke-width="1.5" opacity=".45" clip-path="url(#cut)">
      ${Array.from({ length: 40 }, (_, i) => `<path d="M0 ${i * 14}l150 -130"/>`).join('')}
    </g>
    <path d="M-40 0v400M-55 0h30M-55 400h30" stroke="${A}" stroke-width="2"/>
    <text x="-50" y="210" text-anchor="middle" transform="rotate(-90 -50 210)" ${F}>160.00</text>
    <path d="M0 440h150M0 425v30M150 425v30" stroke="${A}" stroke-width="2"/>
    <text x="75" y="475" text-anchor="middle" ${F}>38.00 ±0.01</text>
    <text x="165" y="205" ${F}>Ra 0.8</text>
  </g>
  <!-- cuadro de título -->
  <g transform="translate(590 640)">
    <rect width="345" height="56" fill="none" stroke="${L}" stroke-width="2"/>
    <text x="16" y="35" font-family="Consolas, monospace" font-size="17" fill="${L}">BRIDA-0420 · AL 6061-T6 · EJEMPLO</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out('hero-pieza.png'));
console.log('src/assets/hero-pieza.png generado');
