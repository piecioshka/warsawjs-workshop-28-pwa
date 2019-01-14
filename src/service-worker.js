const debug = {
  log: (...args) => console.log('[Service Worker]', ...args),
  error: (...args) => console.error('[Service Worker]', ...args),
};

debug.log('Hello from Service Worker');

const CACHE_NAME = 'pwa-1.0.0';
const CACHED_FILES = [
  '/*',
  // 'https://picsum.photos/200/285?image=100',
  // 'https://picsum.photos/200/285?image=200',
  // 'https://picsum.photos/200/285?image=300',
]

self.addEventListener('install', (evt) => {
  debug.log('install event');
  evt.waitUntil(startCaching)
});

async function startCaching() {
  try {
    const cache = await caches.open(CACHE_NAME);
    // self.skipWaiting();
    await cache.addAll(CACHED_FILES);
  } catch (err) {
    debug.log(err);
  }
}

self.addEventListener('activate', (evt) => {
  debug.log('activate event');
  evt.waitUntil(startActivating)
});

async function startActivating() {
  try {
    const keys = await caches.keys();
    const deleted = keys
      .filter(key !== CACHE_NAME)
      .map(key => caches.delete(key));
    return await Promise.all(deleted);
  } catch (err) {
    debug.log(err);
  }
}

self.addEventListener('fetch', (evt) => {
  debug.log('fetch event', evt.request);

  // Spr. czy zasób pochodzi z domeny aplikacji
  if (!new RegExp(location.host).test(evt.request.url)) {
    // Jeśli nie pochodzi - nie dodajemy do Cache-a
    debug.log('ignore request', evt.request.url);
    return;
  }

  evt.respondWith(handleRequest);
});

async function handleRequest(evt) {
  const cache = await caches.open(CACHE_NAME);

  // Spr. czy jest istnieje response na ten request w Cache
  const resource = await cache.match(evt.request);

  // Zasób jest w Cache — zwracamy go
  if (resource) {
    return resource;
  }

  // Nie ma w Cache — tworzymy zapytanie HTTP
  const response = await fetch(evt.request);

  // Dodajemy do Cache
  await cache.put(request, response.clone());

  return response;
}
