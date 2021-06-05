// service worker, esto cachea toda la info de mi app en el navegador
// esto se hace para probar:
//console.log("registrado");

const CACHE_ELEMENTS = [
  "./",
  "./static/style.css",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./components/Contador.js",
  "./index.js",
  "./register.js",
];

// le doy nombre al cache
const CACHE_NAME = "v2_cache_contador_react"; // si le cambio el v1 por v2, por ejemplo, se rfelja en activate event listener. agrega el nuevo y tambien cuenta el viejo y se refleja en la consola.

const self = this;

self.addEventListener(
  "install", //primer parte del ciclo de vida del Service Worker SW.
  (e) => {
    //console.log(e); // esto da la informacion de la instalacion
    e.waitUntil(
      // espero hasta que haga el cache de mi app
      caches.open(CACHE_NAME).then((cache) => {
        // le paso el nombre del cache, devuelve promesa
        //
        cache
          .addAll(CACHE_ELEMENTS) // le paso las rutas, devuelve promesa y la trabajo con then
          .then(() => {
            self.skipWaiting(); // hago que deje de esperar si es que hay que actualizar algo, porque sino hay que reiniciar la app desde el navegador manualmente.
          })
          .catch((err) => console.log(err)); //catcheo el error tambien
      })
    );
  }
);

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME]; // Le paso todos mis cache names, porque puede haber dinamicos, estaticos, etc.
  e.waitUntil(
    // espero hasta que haga el cache de mi app
    caches
      .keys()
      .then(
        (cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              return (
                cacheWhitelist.indexOf(cacheName) === -1 &&
                caches.delete(cacheName)
              ); //si esto es -1, entonces no es la ultima version del cache, si retorna 0, este es el index y existe aqui. Y si es -1, borro ese cache, porque es viejo.
            })
          );
        } //me da todas las claves todos los caches que tengo activos
      )
      .then(() => self.clients.claim()) // esto cobrar el cache y pide desde el service worker en vez de peticiones por internet
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request); // e.request me da todos los pedidos que se hacen de mi app
  e.respondWith(
    caches.match(e.request).then((res) => (res ? res : fetch(e.request))) // con el match ver que existe los request path  dentro de mi cache en la app
  );
});
