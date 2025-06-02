// Google Maps integration
let map;
let marker;
let autocomplete;

function initMap() {
    // Default location (center of the map)
    const defaultLocation = { lat: -34.397, lng: 150.644 };

    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: defaultLocation,
    });

    // Create the autocomplete input
    const input = document.getElementById('location');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // Create the marker
    marker = new google.maps.Marker({
        map: map,
        draggable: true
    });

    // Add event listeners
    autocomplete.addListener('place_changed', onPlaceChanged);
    
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                marker.setPosition(pos);
                getWeather(pos.lat, pos.lng);
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        handleLocationError(false);
    }
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
        document.getElementById('location').placeholder = 'Enter a location';
        return;
    }

    // Update the map
    map.fitBounds(place.geometry.viewport);
    marker.setPosition(place.geometry.location);
    
    // Update weather for the selected location
    getWeather(
        place.geometry.location.lat(),
        place.geometry.location.lng()
    );
}

function handleLocationError(browserHasGeolocation) {
    console.log(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : 'Error: Your browser doesn\'t support geolocation.'
    );
}