import { TAU, rand, clamp, lerp, stringToHSL } from './utils.js';
import { CONFIG } from './config.js';

export class RepoNode {
  constructor(repo, idx, total, center, bounds) {
    this.repo = repo;
    const angle = (idx / total) * TAU + rand(-0.2, 0.2);
    const radius = Math.sqrt(idx / total) * Math.min(center.x, center.y) * rand(0.5, 0.95);

    this.x = center.cx + Math.cos(angle) * radius;
    this.y = center.cy + Math.sin(angle) * radius;

    const speed = rand(0.05, 0.25);
    this.vx = Math.cos(angle + Math.PI / 2) * speed * rand(0.5, 1.5);
    this.vy = Math.sin(angle + Math.PI / 2) * speed * rand(0.5, 1.5);

    const base = Math.sqrt((repo.stars || 0) + 1) + rand(0.2, 0.8);
    this.baseSize = base * CONFIG.node.sizeScale;
    this.size = this.baseSize;

    this.color = stringToHSL(repo.language || repo.name);
    this.pulse = rand(0, TAU);
    this.hovered = false;

    this.bounds = bounds;
    this.center = center;
  }

  step(mouse) {
    // gentle pull to center
    const dx = this.center.cx - this.x, dy = this.center.cy - this.y;
    this.vx += dx * 0.00005;
    this.vy += dy * 0.00005;

    // mouse influence
    if (mouse.active) {
      const mdx = this.x - mouse.x, mdy = this.y - mouse.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < 20000) {
        const m = 1 / Math.max(80, Math.sqrt(md2));
        this.vx += mdx * m * 0.4;
        this.vy += mdy * m * 0.4;
      }
    }

    // friction and motion
    this.vx *= 0.995;
    this.vy *= 0.995;
    this.x += this.vx;
    this.y += this.vy;

    // soft bounds
    const { w, h } = this.bounds;
    if (this.x < -200 || this.x > w + 200) { this.vx *= -1; this.x = clamp(this.x, -200, w + 200); }
    if (this.y < -200 || this.y > h + 200) { this.vy *= -1; this.y = clamp(this.y, -200, h + 200); }

    // pulse
    this.pulse += CONFIG.node.pulseSpeed;
    const p = (Math.sin(this.pulse) + 1) / 2;
    this.size = lerp(this.baseSize * 0.9, this.baseSize * 1.2, p);
  }

  draw(ctx) {
    // core
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.hovered ? 1 : 0.9;
    ctx.arc(this.x, this.y, this.size, 0, TAU);
    ctx.fill();

    // halo
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
    g.addColorStop(0, 'rgba(255,255,255,0.25)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.globalAlpha = this.hovered ? 0.35 : 0.15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function buildNodesFromRepos(repos, dims) {
  const filtered = repos
    .filter(r => CONFIG.showForks || !r.fork)
    .filter(r => CONFIG.showArchived || !r.archived)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

  const total = Math.max(1, filtered.length);
  const center = { cx: dims.w / 2, cy: dims.h / 2, x: dims.w / 2, y: dims.h / 2 };
  const bounds = { w: dims.w, h: dims.h };

  return filtered.map((r, i) => new RepoNode({
    name: r.name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updated_at: r.updated_at
  }, i, total, center, bounds));
}
