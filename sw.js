var staticCacheName = 'restaurant-review-cache-v2';

self.addEventListener('install', function(event) {
 event.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/index.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/data/restaurants.json',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg',
       '/restaurant.html',
       '/js/restaurant_info.js'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('restaurant-review-')&&
               cacheName != staticCacheName;
      }).map(function(cacheName) {
        return cache.delete(cacheName);
      })
    );
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
 
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        
        caches.open('restaurant-review-cache-v2').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/index.html');
      });
    }
  }));
});

//IDB CODE
/* 
 *
 * INCOMPLETE IDB CODE COMMENTED
if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}

  var dbPromise = idb.open('couches-n-things', 1);
  console.log('making a new object store');
  if (!upgradeDb.objectStoreNames.contains('restaurants')) {
      let restaurantsOS = upgradeDb.createObjectStore('restaurants', {keyPath: 'id'});
      restaurantsOS.createIndex('name', 'name', {unique: true});
      restaurantsOS.createIndex('neighborhood', 'neighborhood', {unique: false});
      restaurantsOS.createIndex('photograph', 'photograph', {unique: true});
      restaurantsOS.createIndex('address', 'address', {unique: true});
      restaurantsOS.createIndex('latlng', 'latlng', {unique: true});
      restaurantsOS.createIndex('cuisine_type', 'cuisine_type', {unique: false});
      restaurantsOS.createIndex('operating_hours', 'operating_hours', {unique: false});
      restaurantsOS.createIndex('reviews', 'reviews', {unique: false});
      restaurantsOS.createIndex('createdAt', 'createdAt', {unique: true});
      restaurantsOS.createIndex('updatedAt', 'updatedAt', {unique: true});
      restaurantsOS.createIndex('id', 'id', {unique: true});
  }

dbPromise.then(function(db){
  var tx = db.transaction('store', 'readwrite');
  var store = tx.objectStore('store');
    var item = [
        
    ];
    return Promise.all(items.map(function(item){
        console.log('Adding item: ', item);
        return store.add(item);
    })
    ).catch(function(e) {
        tx.abort();
        console.log(e);
    }).then(function() {
  console.log('added item to the store os!');
});
});
*/
/* 
 *idb not complete as at this period due to technical challeneges with PC
 */