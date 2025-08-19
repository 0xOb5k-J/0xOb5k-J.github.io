(() => {
  const canvas = document.getElementById('nebula');
  const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w = 0, h = 0, cx = 0, cy = 0;

  function resize() {
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2;
    cy = h / 2;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Elements
  const usernameEl = document.getElementById('username');
  const greetEl = document.getElementById('greet');
  const avatarEl = document.getElementById('avatar');
  const nameEl = document.getElementById('name');
  const bioEl = document.getElementById('bio');
  const updatedEl = document.getElementById('updated');
  const statReposEl = document.getElementById('statRepos');
  const statStarsEl = document.getElementById('statStars');
  const statFollowersEl = document.getElementById('statFollowers');
  const profileLink = document.getElementById('profileLink');
  const tooltipEl = document.getElementById('tooltip');

  // Detect username from host; fallback to "0xOb5k-J" if running locally
  const detected = (location.hostname.endsWith('.github.io') ?
    location.hostname.split('.github.io')[0] : '0xOb5k-J');
  const USERNAME = detected;
  usernameEl.textContent = USERNAME;

  greetEl.textContent = (() => {
    const h = new Date().getHours();
    if (h < 5) return 'Night Owl';
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    if (h < 21) return 'Good Evening';
    return 'Hello';
  })();

  // Utilities
  const TAU = Math.PI * 2;
  const rand = (a=0, b=1) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  // Deterministic color from string
  function stringToHSL(str) {
    let h = 0, s = 65, l = 58;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) % 360;
    }
    // tweak saturation/lightness for better contrast
    s = 50 + (h % 20);
    l = 45 + ((h * 3) % 15);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  function niceNumber(n) {
    try {
      return Intl.NumberFormat().format(n);
    } catch {
      return String(n);
    }
  }

  // Particle (repo node)
  class Node {
    constructor(repo, idx, total) {
      this.repo = repo;
      const angle = (idx / total) * TAU + rand(-0.2, 0.2);
      const radius = Math.sqrt(idx / total) * Math.min(cx, cy) * rand(0.5, 0.95);
      this.x = cx + Math.cos(angle) * radius;
      this.y = cy + Math.sin(angle) * radius;
      const speed = rand(0.05, 0.25);
      this.vx = Math.cos(angle + Math.PI / 2) * speed * rand(0.5, 1.5);
      this.vy = Math.sin(angle + Math.PI / 2) * speed * rand(0.5, 1.5);
      this.baseSize = Math.sqrt((repo.stars || 0) + 1) + rand(0.2, 0.8);
      this.size = this.baseSize;
      this.color = stringToHSL(repo.language || repo.name);
      this.pulse = rand(0, TAU);
      this.hovered = false;
    }
    step(mouse) {
      // gentle pull to center
      const dx = cx - this.x, dy = cy - this.y;
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
      if (this.x < -200 || this.x > w + 200) this.vx *= -1, this.x = clamp(this.x, -200, w + 200);
      if (this.y < -200 || this.y > h + 200) this.vy *= -1, this.y = clamp(this.y, -200, h + 200);

      // pulse
      this.pulse += 0.02;
      const p = (Math.sin(this.pulse) + 1) / 2;
      this.size = lerp(this.baseSize * 0.9, this.baseSize * 1.2, p);
    }
    draw(ctx) {
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

  // Starfield
  const stars = Array.from({ length: 180 }, () => ({
    x: rand(0, w), y: rand(0, h), r: rand(0.15, 0.9), tw: rand(0, TAU)
  }));

  function drawStars(t) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (const s of stars) {
      s.tw += 0.025;
      const a = 0.25 + Math.sin(s.tw + t * 0.0007) * 0.25;
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  // Connections
  function drawConnections(nodes) {
    ctx.save();
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110) {
          const alpha = 1 - Math.sqrt(d2) / 110;
          ctx.globalAlpha = alpha * 0.35;
          // language similarity boost
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

  // Mouse handling
  const mouse = { x: cx, y: cy, active: false };
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.active = false; }, { passive: true });

  // Tooltip
  function showTooltip(node, x, y) {
    tooltipEl.innerHTML = `
      <div class="repo">${node.repo.name}</div>
      <div class="desc">${node.repo.description ? escapeHTML(node.repo.description) : 'No description'}</div>
      <div class="meta">
        <span class="pill">★ ${niceNumber(node.repo.stars || 0)}</span>
        <span class="pill">⑂ ${niceNumber(node.repo.forks || 0)}</span>
        ${node.repo.language ? `<span class="pill">${node.repo.language}</span>` : ''}
        <span class="pill">Updated ${relativeTime(node.repo.updated_at)}</span>
      </div>
    `;
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
    tooltipEl.classList.add('visible');
    tooltipEl.setAttribute('aria-hidden', 'false');
  }
  function hideTooltip() {
    tooltipEl.classList.remove('visible');
    tooltipEl.setAttribute('aria-hidden', 'true');
  }
  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }
  function relativeTime(iso) {
    try {
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
      const d = new Date(iso);
      const diff = (Date.now() - d.getTime()) / 1000;
      const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1],
      ];
      for (const [unit, sec] of units) {
        if (Math.abs(diff) >= sec || unit === 'second') {
          const val = Math.round(-diff / sec);
          return rtf.format(val, unit);
        }
      }
    } catch { /* ignore */ }
    return new Date(iso).toLocaleDateString();
  }

  // Data + animation
  let nodes = [];
  let hoveredNode = null;
  let t0 = performance.now();

  function drawFrame(now) {
    const t = now - t0;
    ctx.clearRect(0, 0, w, h);
    drawStars(t);

    // step + hover detection
    hoveredNode = null;
    for (const n of nodes) {
      n.step(mouse);
    }
    if (nodes.length) {
      let best = { node: null, d2: Infinity };
      for (const n of nodes) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        n.hovered = false;
        if (d2 < (n.size + 10) * (n.size + 10) && d2 < best.d2) {
          best = { node: n, d2 };
        }
      }
      if (best.node) {
        best.node.hovered = true;
        showTooltip(best.node, mouse.x, mouse.y);
        hoveredNode = best.node;
      } else {
        hideTooltip();
      }
    }

    drawConnections(nodes);
    for (const n of nodes) n.draw(ctx);

    requestAnimationFrame(drawFrame);
  }
  requestAnimationFrame(drawFrame);

  // Click to open repository
  window.addEventListener('click', () => {
    if (hoveredNode && hoveredNode.repo && hoveredNode.repo.html_url) {
      window.open(hoveredNode.repo.html_url, '_blank', 'noopener');
    }
  });

  // Fetch profile + repos
  async function fetchProfile(username) {
    const uResp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!uResp.ok) throw new Error('Profile fetch failed');
    return uResp.json();
  }
  async function fetchRepos(username) {
    const rResp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);
    if (!rResp.ok) throw new Error('Repos fetch failed');
    return rResp.json();
  }

  function updateProfileUI(profile, repos) {
    avatarEl.src = profile.avatar_url;
    avatarEl.alt = (profile.name || profile.login) + ' avatar';
    nameEl.textContent = profile.name || profile.login;
    bioEl.textContent = profile.bio || 'Crafting things that spark curiosity.';
    profileLink.href = profile.html_url;
    statReposEl.textContent = `${repos.length} repos`;
    const totalStars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
    statStarsEl.textContent = `${niceNumber(totalStars)} stars`;
    statFollowersEl.textContent = `${niceNumber(profile.followers || 0)} followers`;
    updatedEl.textContent = `Updated ${new Date().toLocaleString()}`;
  }

  function buildNodes(repos) {
    const filtered = repos
      .filter(r => !r.fork) // hide forks for clarity
      .filter(r => !r.archived) // hide archived
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    const total = Math.max(1, filtered.length);
    nodes = filtered.map((r, i) => new Node({
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated_at: r.updated_at
    }, i, total));

    // If there are very few repos, add some ambient phantom nodes for aesthetics
    if (nodes.length < 8) {
      const phantom = 12 - nodes.length;
      for (let i = 0; i < phantom; i++) {
        const fakeRepo = {
          name: `space-${i + 1}`,
          html_url: '#',
          description: 'Generative star',
          language: ['TypeScript','Rust','Go','Python','Kotlin','C++'][i % 6],
          stars: Math.floor(rand(0, 10)),
          forks: Math.floor(rand(0, 3)),
          updated_at: new Date(Date.now() - rand(1, 90) * 86400000).toISOString()
        };
        nodes.push(new Node(fakeRepo, nodes.length + i, nodes.length + phantom));
      }
    }
  }

  function fallbackGenerative() {
    // create a pleasant field of color-coded particles without GitHub data
    const langs = ['JavaScript','TypeScript','Python','Go','Rust','C++','Kotlin','Swift','Ruby','Elixir'];
    const fake = Array.from({ length: 28 }, (_, i) => ({
      name: `nebula-${i+1}`,
      html_url: '#',
      description: 'Procedurally generated node',
      language: langs[i % langs.length],
      stars: Math.floor(rand(0, 50)),
      forks: Math.floor(rand(0, 10)),
      updated_at: new Date(Date.now() - rand(1, 365) * 86400000).toISOString()
    }));
    buildNodes(fake.map(r => ({
      ...r,
      stargazers_count: r.stars,
      forks_count: r.forks
    })));
    nameEl.textContent = USERNAME;
    avatarEl.src = 'https://avatars.githubusercontent.com/u/583231?v=4';
    avatarEl.alt = 'Octocat';
    bioEl.textContent = 'Offline mode: generative stars.';
    statReposEl.textContent = '—';
    statStarsEl.textContent = '—';
    statFollowersEl.textContent = '—';
    updatedEl.textContent = 'Using offline generative data';
    profileLink.href = `https://github.com/${encodeURIComponent(USERNAME)}`;
  }

  (async () => {
    try {
      const [profile, repos] = await Promise.all([fetchProfile(USERNAME), fetchRepos(USERNAME)]);
      updateProfileUI(profile, repos);
      buildNodes(repos);
    } catch (e) {
      console.warn('Falling back to generative mode:', e);
      fallbackGenerative();
    }
  })();

  // Konami code -> toggle light/dark glow surge
  const seq = [38,38,40,40,37,39,37,39,66,65];
  let buf = [];
  window.addEventListener('keydown', (e) => {
    buf.push(e.keyCode);
    if (buf.length > seq.length) buf.shift();
    if (seq.every((k, i) => buf[i] === k)) {
      document.body.classList.toggle('storm');
      buf = [];
    }
  });
  // Storm mode effect
  let stormT = 0;
  const origFillRect = ctx.fillRect.bind(ctx);
  ctx.fillRect = function(x, y, w2, h2) {
    if (document.body.classList.contains('storm')) {
      stormT += 0.01;
      const shakeX = Math.sin(stormT * 8) * 0.5;
      const shakeY = Math.cos(stormT * 6) * 0.5;
      return origFillRect(x + shakeX, y + shakeY, w2, h2);
    }
    return origFillRect(x, y, w2, h2);
  };

})();
