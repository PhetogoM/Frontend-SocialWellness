import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { getLocations } from "../../apiComponents/api.js"; 
import "./CampusMapPage.css";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "10px",
};

const CAMPUS_CENTER = { lat: -26.6906, lng: 27.1 }; // NWU Potch center

function CampusMapPage() {
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Fetch locations from API on mount. 
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };
    fetchLocations();
  }, []);

  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => alert("Unable to retrieve your location")
      );
    } else {
      alert("Geolocation not supported by your browser");
    }
  };

  /*NB!!! THIS IS THE HARD CODE TO TEST THE DESITINATION ROUTE. REMOVE COMENTS AND LOCATE THE
   useEffect() at the top and comment it out the code*/

  /*useEffect(() => {
  setLocations([
    {
      id: "library",
      name: "Library",
      lat: -26.68897566681695,
      lng: 27.091789954128075,
    },
    {
      id: "admin",
      name: "Admin Block",
      lat: -26.688517124237258,
      lng: 27.09326263617408,
    },
  ]);
}, []);*/

  const handleFindRoute = () => {
    if (!start || !destination) {
      alert("Please select both starting point and destination.");
      return;
    }

    const startLoc = locations.find((loc) => loc.id === start);
    const destLoc = locations.find((loc) => loc.id === destination);

    if (!startLoc || !destLoc) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: startLoc.lat, lng: startLoc.lng },
        destination: { lat: destLoc.lat, lng: destLoc.lng },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK") setDirections(result);
        else alert("Could not calculate route. Try again.");
      }
    );
  };

  return (
    <div className="campus-map-container">
      <h1 className="page-title">Campus Map</h1>
      <p className="page-subtitle">
        Select your starting point and destination, or find your location on the map.
      </p>

      <div className="map-controls">
        <select value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select Starting Point</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select Destination</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        <button onClick={handleFindRoute}>Find My Destination</button>
        <button onClick={handleFindMe}>Find My Location</button>
      </div>

      <div className="map-frame">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={CAMPUS_CENTER}
            zoom={16}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              scrollwheel: true,
              gestureHandling: "greedy",
            }}
          >
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={{ lat: loc.lat, lng: loc.lng }}
                label={loc.name}
                onClick={() => setSelectedMarker(loc)}
              />
            ))}

            {currentPosition && (
              <Marker
                position={currentPosition}
                label="You"
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
              />
            )}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h3>{selectedMarker.name}</h3>
                  <p>{selectedMarker.info}</p>
                </div>
              </InfoWindow>
            )}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      <a
        href="/files/nwu-campus-map.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="pdf-link"
      >
        Link to download Map.pdf
      </a>
    </div>
  );
}

export default CampusMapPage;
