import { niceNumber, escapeHTML, relativeTime } from './utils.js';

// Username detection and greeting
export function detectUsername() {
  return (location.hostname.endsWith('.github.io')
    ? location.hostname.split('.github.io')[0]
    : '0xOb5k-J');
}

export function setGreeting(greetEl) {
  const h = new Date().getHours();
  greetEl.textContent = (h < 5) ? 'Night Owl'
    : (h < 12) ? 'Good Morning'
    : (h < 17) ? 'Good Afternoon'
    : (h < 21) ? 'Good Evening'
    : 'Hello';
}

export function updateProfileUI({ profile, repos }) {
  const avatarEl = document.getElementById('avatar');
  const nameEl = document.getElementById('name');
  const bioEl = document.getElementById('bio');
  const updatedEl = document.getElementById('updated');
  const statReposEl = document.getElementById('statRepos');
  const statStarsEl = document.getElementById('statStars');
  const statFollowersEl = document.getElementById('statFollowers');
  const profileLink = document.getElementById('profileLink');

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

export function setUsernameLabel(username) {
  document.getElementById('username').textContent = username;
}

export function initTooltip() {
  const tooltipEl = document.getElementById('tooltip');
  return {
    show(node, x, y) {
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
    },
    hide() {
      tooltipEl.classList.remove('visible');
      tooltipEl.setAttribute('aria-hidden', 'true');
    }
  };
}
