// este archivo siorve para el registro de la progressive app
if (navigator.serviceWorker) {
  //console.log("si, existe");
  // le paso el nombre del service worker y la ruta
  navigator.serviceWorker.register("./sw.js");
}
