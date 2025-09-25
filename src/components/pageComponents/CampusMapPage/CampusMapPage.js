import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./CampusMapPage.css";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "10px",
};

const NWU_POTCH = { lat: -26.6906, lng: 27.1000 }; // NWU Potch Campus

function CampusMapPage() {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Load Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Store in .env
  });

  // Find user location
  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => alert("Unable to retrieve your location")
      );
    } else {
      alert("Geolocation not supported by your browser");
    }
  };

  return (
    <div className="campus-map-container">
      <h1 className="page-title">Campus Map</h1>
      <p className="page-subtitle">
        Explore NWU Potchefstroom Campus and find your current location.
      </p>

      <button onClick={handleFindMe} className="find-me-btn">
        📍 Find My Location
      </button>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={NWU_POTCH}
          zoom={15}
        >
          {/* Default marker for campus */}
          <Marker position={NWU_POTCH} label="NWU Potch Campus" />

          {/* Show user location if found */}
          {currentPosition && (
            <Marker
              position={currentPosition}
              label="You"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default CampusMapPage;
