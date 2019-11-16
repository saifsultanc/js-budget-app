const cacheName = 'cache-v1';
const resourcesToPrecache = [
	'/',
	'/index.html',
	'/budget icon.png',
	'/css.bootstrap.min.css',
	'/css/all.css',
	'/css/main.css',
	'/bootsrap.bundle.min.js',
	'/jquery-3.3.1.min.js',
	'/js/app.js'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(resourcesToPrecache);
		})
	);
});

self.addEventListener('activate', (event) => {});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request);
		})
	);
});

let deferredPrompt;
self.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault();
	deferredPrompt = event;
	btnAdd.style.display = 'block';

	btn.addEventListener('click', (event) => {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choiceResult) => {
			deferredPrompt = null;
		});
	});
});

self.addEventListener('appinstalled', (event) => {
	app.logEvent('a2hs', 'installed');
});
