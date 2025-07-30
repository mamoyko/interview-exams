import fs from 'fs';

const CACHE_FILE = 'cache.json';
let cache = {};

try {
  if (fs.existsSync(CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE));
  }
} catch (e) {
  console.error('Failed to load cache file:', e);
}

export function getCache(key) {
  return cache[key];
}

export function setCache(key, data) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export function isExpired(timestamp, duration) {
  return Date.now() - timestamp > duration;
}