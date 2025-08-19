// Centralized configuration and tunables
export const CONFIG = {
  showForks: false,
  showArchived: false,
  maxRepos: 100,
  connectionDistance: 110, // px
  node: {
    pulseSpeed: 0.02,
    sizeScale: 1.0, // global multiplier on node sizes
  },
  starfield: {
    count: 180,
    twinkleSpeed: 0.0007,
  },
  fallback: {
    minVisibleRepos: 8,
    generatedCount: 28,
  },
};
