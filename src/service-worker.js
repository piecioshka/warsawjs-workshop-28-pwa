const debug = {
  log: (...args) => console.log('[Service Worker]', ...args),
  error: (...args) => console.error('[Service Worker]', ...args),
};

debug.log('Hello from Service Worker');

const CACHE_NAME = 'pwa-1.0.0';
const CACHED_FILES = [
  '/',
  'https://picsum.photos/200/100?image=100',
  'https://picsum.photos/200/100?image=200',
  'https://picsum.photos/200/100?image=300',
];

self.addEventListener('install', (evt) => {
  debug.log('Event: install', { evt });
  evt.waitUntil(startCaching());
});

async function startCaching() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHED_FILES);
  return await self.skipWaiting();
}

self.addEventListener('activate', (evt) => {
  debug.log('Event: activate', { evt });
  evt.waitUntil(startActivating());
});

async function startActivating() {
  const keys = await caches.keys();
  const deleted = keys
    .filter(key => (key !== CACHE_NAME))
    .map(key => caches.delete(key));
  return await Promise.all(deleted);
}

self.addEventListener('fetch', (evt) => {
  debug.log('Event: fetch', { evt });

  // Spr. czy zasób pochodzi z domeny aplikacji
  if (!new RegExp(self.origin).test(evt.request.url)) {
    // Jeśli nie pochodzi - nie dodajemy do Cache-a
    debug.log(' => ignore', evt.request.url);
    return;
  }

  evt.respondWith(handleRequest(evt));
});

async function handleRequest(evt) {
  const request = evt.request;

  const cache = await caches.open(CACHE_NAME);

  // Spr. czy jest istnieje response na ten request w Cache
  const resource = await cache.match(request);

  // Zasób jest w Cache — zwracamy go
  if (resource) {
    return resource;
  }

  // Nie ma w Cache — tworzymy zapytanie HTTP
  const response = await fetch(request.clone());

  // Dodajemy do Cache
  await cache.put(request, response.clone());

  return response;
}
