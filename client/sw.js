// sw.js

// Mantienes tu nombre de caché y URLs
const CACHE_NAME = 'cti-center-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
];

// Se añade la URL base de tu API para poder diferenciar las peticiones
const API_BASE_URL = 'http://localhost:3000/api';

// El evento de instalación no cambia, está correcto
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
        return cache.addAll(requests);
      })
  );
});

// El evento de activación no cambia, está correcto
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// --- EL EVENTO FETCH ES LA CLAVE DE LA CORRECCIÓN ---
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // ESTRATEGIA 1: Network First para las peticiones a la API.
  if (requestUrl.href.startsWith(API_BASE_URL)) {

    // --- INICIO DE LA CORRECCIÓN ---
    // Si la petición a la API no es de tipo GET (es POST, PUT, DELETE, etc.),
    // no la procesamos con la caché. Simplemente la enviamos a la red.
    if (event.request.method !== 'GET') {
      event.respondWith(fetch(event.request));
      return;
    }
    // --- FIN DE LA CORRECCIÓN ---

    // Si la petición es GET, aplicamos la estrategia "Network First" como antes.
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              // Esta línea ahora solo se ejecutará para peticiones GET, evitando el error.
              cache.put(event.request, responseToCache);
            });
          return networkResponse;
        })
        .catch(() => {
          // Si la red falla (estás offline), intenta servir desde el caché
          return caches.match(event.request);
        })
    );
    return;
  }

  // ESTRATEGIA 2: Cache First para todo lo demás (App Shell, librerías, etc.)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});