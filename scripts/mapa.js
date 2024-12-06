function initMap() {
  const empresaUbicacion = { lat: 18.150630, lng: -94.442855 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: empresaUbicacion,
  });

  const marker = new google.maps.Marker({
    position: empresaUbicacion,
    map: map,
    title: "Materiales SADA",
  });
}