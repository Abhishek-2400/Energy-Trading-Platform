import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './maps.css';

// Set your Mapbox access token here
mapboxgl.accessToken = "pk.eyJ1IjoiYWJoaXNoZWsyNDAwIiwiYSI6ImNtMHpnYXQxOTAybW0ya3MxenRxZmU2cGEifQ.aw-mjMxCIvFg4Jbs1S54PQ";

const MapComponent = () => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true,
        });

        function successLocation(position) {
            setupMap([position.coords.longitude, position.coords.latitude]);
        }

        function errorLocation() {
            setupMap([78.9629, 20.5937]); // Default center location in India
        }

        // Sample trading locations as coordinates (longitude, latitude)
        const sellerTradingLocations = [
            [77.209, 28.6139],  // Delhi, India
            [88.3639, 22.5726], // Kolkata, India
            [72.8777, 19.0760], // Mumbai, India
            [73.8567, 18.5204], // Pune, India
            [77.1025, 28.7041], // New Delhi, India
            [78.4867, 17.3850], // Hyderabad, India
        ];

        const TradedAreas = [
            [80.9462, 26.8467],  // Lucknow, India
            [76.6413, 12.9716],  // Bengaluru, India
            [75.8577, 22.7196],  // Indore, India
            [78.0322, 30.3165],  // Dehradun, India
            [77.3910, 28.5355],  // Noida, India
            [78.6569, 22.9734],  // Bhopal, India
            [85.3240, 23.3441],  // Ranchi, India
            [88.2461, 26.8467],  // Siliguri, India
            [85.8245, 20.2961],  // Bhubaneswar, India
            [76.2673, 9.9312],   // Kochi, India
            [72.5797, 23.0225],  // Ahmedabad, India
            [79.0882, 21.1458],  // Nagpur, India
            [85.1376, 25.5941],  // Patna, India
            [74.7973, 34.0837],  // Srinagar, India
            [73.1812, 22.3072],  // Vadodara, India
        ];


        // Latitude and longitude bounds for India
        const indiaBounds = {
            latMin: 6.7,
            latMax: 37.1,
            lonMin: 68.7,
            lonMax: 97.25,
        };

        function setupMap(center) {
            const map = new mapboxgl.Map({
                container: "map", // HTML element ID
                style: "mapbox://styles/mapbox/streets-v11",
                center: center,
                zoom: 4, // Adjusted to show India entirely
            });

            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav);

            // Filter and add markers only for locations within India
            const indianLocations = filterLocationsInIndia(sellerTradingLocations);
            addSellerMarkers(map, indianLocations);
            addTradeMarkers(map, TradedAreas);
        }

        function filterLocationsInIndia(locations) {
            return locations.filter(([longitude, latitude]) => {
                return (
                    latitude >= indiaBounds.latMin &&
                    latitude <= indiaBounds.latMax &&
                    longitude >= indiaBounds.lonMin &&
                    longitude <= indiaBounds.lonMax
                );
            });
        }

        function addSellerMarkers(map, locations) {
            locations.forEach((location) => {
                // Create a new marker for each location
                new mapboxgl.Marker({ color: "blue" })
                    .setLngLat(location) // Set the marker position using coordinates
                    .addTo(map); // Add marker to map
            });
        }

        function addTradeMarkers(map, locations) {
            locations.forEach((location) => {
                // Create a new marker for each location
                new mapboxgl.Marker({ color: "red" })
                    .setLngLat(location) // Set the marker position using coordinates
                    .addTo(map); // Add marker to map
            });
        }
    }, []);

    return (
        <div className="map-container">
            <div className="legend">
                <div><span className="blue-marker"></span> Operational Units</div>
                <div><span className="red-marker"></span> Traded Areas</div>
            </div>
            <div className="map-wrapper">
                <div id="map"></div>
            </div>
        </div>
    );
};

export default MapComponent;
