const CACHE_NAME = 'FoodHunt-v18';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    '/nav.html',
    '/pages/home.html',
    '/pages/indonesian.html',
    '/pages/japanese.html',
    '/pages/western.html',
    '/css/materialize.min.css',
    '/css/style.css',
    '/js/materialize.min.js',
    '/js/nav.js',
    '/js/register.js',
    '/assets/images/banner.jpg',
    '/assets/images/beefwellington.jpg',
    '/assets/images/betutu.jpg',
    '/assets/images/facebook.png',
    '/assets/images/gudeg.jpg',
    '/assets/images/hotdog.jpg',
    '/assets/images/nasicampur.jpg',
    '/assets/images/pancake.jpg',
    '/assets/images/pizza.jpg',
    '/assets/images/ramen.jpg',
    '/assets/images/sate.jpg',
    '/assets/images/serabi.jpg',
    '/assets/images/soto.jpg',
    '/assets/images/spaghetti.jpg',
    '/assets/images/steak.jpg',
    '/assets/images/sushi.jpg',
    '/assets/images/takoyaki.jpg',
    '/assets/images/telegram.png',
    '/assets/images/tempura.jpg',
    '/assets/images/tonkatsu.jpg',
    '/assets/images/twitter.png',
    '/assets/images/udon.jpg',
    '/assets/icons/favicon.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
                    return response;
                }

                console.log(
                    'ServiceWorker: Memuat aset dari server : ',
                    event.request.url
                );

                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});