import { TAU } from './utils.js';
import { CONFIG } from './config.js';

export function createStarfield(w, h) {
  return Array.from({ length: CONFIG.starfield.count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * (0.9 - 0.15) + 0.15,
    tw: Math.random() * TAU
  }));
}

export function drawStars(ctx, stars, t) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (const s of stars) {
    s.tw += 0.025;
    const a = 0.25 + Math.sin(s.tw + t * CONFIG.starfield.twinkleSpeed) * 0.25;
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

export function drawConnections(ctx, nodes, maxDist) {
  ctx.save();
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < maxDist * maxDist) {
        const alpha = 1 - Math.sqrt(d2) / maxDist;
        ctx.globalAlpha = alpha * 0.35;
        const sameLang = (a.repo.language && a.repo.language === b.repo.language);
        ctx.strokeStyle = sameLang ? a.color : 'rgba(200,220,255,0.6)';
        ctx.lineWidth = sameLang ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

export function renderNodes(ctx, nodes) {
  for (const n of nodes) n.draw(ctx);
}
