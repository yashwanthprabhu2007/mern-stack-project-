  
   mapboxgl.accessToken  = mapToken;
    const map = new mapboxgl.Map({
        
        container: 'map',
        style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
        projection: 'globe', // display the map as a globe
        zoom: 3, // initial zoom level, 0 is the world view, higher values zoom in
        center: coordinates // center the map on this longitude and latitude
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });

    // Add a marker to the map
  // ✅ single custom icon marker
// ✅ Airbnb icon in a red circle with hover tooltip
const el = document.createElement("div");
el.innerHTML = `
  <div class="airbnb-marker">
    <i class="fa-brands fa-airbnb"></i>
    <div class="airbnb-marker-tooltip">Welcome to booking.com </div>
    
  </div>
`;

new mapboxgl.Marker({ element: el, anchor: "bottom" })
  .setLngLat(coordinates)
  .addTo(map);


  
 