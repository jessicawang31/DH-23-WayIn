// Function to load the Google Maps API
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB3Q2EaXM5SviZl58CVgkBvJ3FZtKgeXx8&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Load Google Maps when the page loads
window.onload = loadGoogleMaps;

let map;
let placesService;
let searchInput;
let searchResults;

let currentInfoWindow = null; // Track the currently open info window

let doorMarkers = []; // Array to store the manually inputted door markers

function initMap() {
    // Create the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 47.6553, lng: -122.3035 }, // University of Washington, Seattle campus
        zoom: 16,
    });

    // Define coordinates for doors
    const doors = [
        // manual
        { lat: 47.655, lng: -122.305, name: 'Door 3', strokeColor: '#FF0000' },
        { lat: 47.6551, lng: -122.3048, name: 'Door 1', strokeColor: '#FF0000' },
        { lat: 47.655, lng: -122.3049, name: 'Door 2', strokeColor: '#FF0000' },
        // assisted
        { lat: 47.6558, lng: -122.3050, name: 'Door 9', strokeColor: '#00FF00' },
        { lat: 47.6549, lng: -122.3052, name: 'Door 5', strokeColor: '#00FF00' },
        { lat: 47.6549, lng: -122.3056, name: 'Door 6', strokeColor: '#00FF00' },
        { lat: 47.6556, lng: -122.3056, name: 'Door 7', strokeColor: '#00FF00' },
        { lat: 47.6559, lng: -122.3052, name: 'Door 8', strokeColor: '#00FF00' },
        { lat: 47.6552, lng: -122.3047, name: 'Door 4', strokeColor: '#00FF00' },
    ];

    // Create Circle markers for the doors
    doors.forEach((door) => {
        const doorMarker = new google.maps.Marker({
            position: { lat: door.lat, lng: door.lng },
            sName: "Marker Name",
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: door.strokeColor,
                fillOpacity: 1.0,
                strokeWeight: 0.4
            },
        });

        // Add a click event listener to the door marker to open an info window with a Google Maps link
        doorMarker.addListener('click', () => {
            // Construct a Google Maps URL with the door's coordinates
            const googleMapsLink = `https://www.google.com/maps?q=${door.lat},${door.lng}`;

            // Create an info window with the link
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <strong>${door.name}</strong><br>
                    <a href="${googleMapsLink}" target="_blank">Open in Google Maps</a>
                `,
            });

            // Close any previously opened info windows
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }

            infoWindow.open(map, doorMarker);
            currentInfoWindow = infoWindow;
        });
    });

    // Create the search box and link it to the UI element
    searchInput = document.getElementById("search");
    searchResults = document.getElementById("search-results");
    const searchBox = new google.maps.places.SearchBox(searchInput);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    // Bias the SearchBox results towards the current map's viewport
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    placesService = new google.maps.places.PlacesService(map);

    // Add an event listener to the search input
    searchInput.addEventListener('input', handleSearchInput);

    map.addListener('click', () => {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
    });

    placesService = new google.maps.places.PlacesService(map);

    // Add an event listener to the search input
    searchInput.addEventListener('input', handleSearchInput);

    searchInput.addEventListener('input', handleSearchInput);
    
    // Listen for place_changed event in the search box
    searchBox.addListener('places_changed', function() {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }

        // Get the first place from the results
        const place = places[0];

        // Set the map's center to the selected location
        map.setCenter(place.geometry.location);

        // Close any previously opened info windows
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }

        // Your other code...
    });

}

    let markers = []; // Global variable to store markers

    function handleSearchInput() {
        const query = searchInput.value;

        if (query) {
            const request = {
                query: query,
                fields: ['name', 'geometry'],
            };

            placesService.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Clear the map of previous markers
                    clearMarkers();

                    // Create markers for search results
                    results.forEach(place => {
                        createMarker(place);
                    });
                }
            });
        }
    }

    function createMarker(place) {
        const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
        });

        // Create an info window with location details
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <strong>${place.name}</strong><br>
                Address: ${place.formatted_address}<br>
                Coordinates: ${place.geometry.location.lat()}, ${place.geometry.location.lng()}
            `
        });

        // Add a click event listener to the marker to open the info window
        marker.addListener('click', () => {
            // Close any previously opened info windows
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }

            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
        });

        markers.push(marker); // Store the marker in the global array
    }

    function clearMarkers() {
        // Clear all existing markers from the map
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = []; // Clear the global array
    }
