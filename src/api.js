// GitHub public API access (no token)
export async function fetchProfile(username) {
  const uResp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
  if (!uResp.ok) throw new Error('Profile fetch failed');
  return uResp.json();
}

export async function fetchRepos(username, max = 100) {
  const rResp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${max}&sort=updated`);
  if (!rResp.ok) throw new Error('Repos fetch failed');
  return rResp.json();
}
