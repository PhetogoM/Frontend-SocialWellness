import React, { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Fetch locations from API + add static ones
  const loadLocations = async () => {
    try {
      const data = await getLocations();

      // Add only Library + Main Office to dropdowns (not markers)
      const extraLocations = [
        {
          id: "library",
          name: "Library",
          lat: -26.68897566681695,
          lng: 27.091789954128075,
        },
        {
          id: "main_office",
          name: "Main Office",
          lat: -26.688517124237258,
          lng: 27.09326263617408,
        },
        {
          id: "FEC",
          name: "Faculty of Educational Sciences",
          lat: -26.691829441306055,
          lng: 27.090416926718675,
        },
        {
          id: "FOH",
          name: " Faculty of Humanities",
          lat: -26.688163434111267, 
          lng: 27.09177080242623,
        },
        {
          id: "CENTRE",
          name: "Campus Student Centre",
          lat: -26.686744722343935,
          lng:  27.092865143669712,
        },
        {
          id: "ProServ",
          name: "Protection Services",
          lat: -26.68731987789143,
          lng: 27.094174061627612,
        },
         {
          id: "HealthCen",
          name: "Healthcare Centre",
          lat: -26.689179527632323, 
          lng: 27.094603215056434,
        },
         {
          id: "main_gate",
          name: "Main Gate",
          lat: -26.690080584119812, 
          lng: 27.093337212441416,
        },
         {
          id: "FNAS",
          name: "Faculty of Natural Sciences",
          lat: -26.685776912101034, 
          lng:  27.093218981496793,
        },
        {
          id: "FE",
          name: "Faculty of Engineering",
          lat: -26.67926204239378, 
          lng:  27.095147021221823,
        },
        {
          id: "ParK",
          name: "Cachet Park Shopping",
          lat: -26.69198864860571, 
          lng:  27.09439136743063,
        },
        {
          id: "Sports",
          name: "SPORTS VILLAGE",
          lat: -26.693997340213116, 
          lng:  27.09985940136247,
        },
      ];

      setLocations([...data, ...extraLocations]);
    } catch (err) {
      console.error("Failed to fetch locations:", err);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCurrentPosition(userLoc);

          // Center map on user's position
          if (mapRef.current) {
            mapRef.current.panTo(userLoc);
          }

          // Add "My Location" to dropdowns
          const myLoc = {
            id: "my_location",
            name: "My Location",
            lat: userLoc.lat,
            lng: userLoc.lng,
          };

          setLocations((prev) => {
            const exists = prev.find((loc) => loc.id === "my_location");
            if (exists) return prev.map((loc) => (loc.id === "my_location" ? myLoc : loc));
            return [...prev, myLoc];
          });

          // Auto-select "My Location" as start point
          setStart("my_location");
        },
        () => alert("Unable to retrieve your location")
      );
    } else {
      alert("Geolocation not supported by your browser");
    }
  };

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

        <button 
          onClick={handleFindRoute} 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Find My Destination
        </button>

        <button 
          onClick={handleFindMe} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Find My Location
        </button>

        <button 
          onClick={loadLocations} 
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Refresh Map
        </button>
      </div>

      <div className="map-frame">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={CAMPUS_CENTER}
            zoom={16}
            onLoad={(map) => (mapRef.current = map)}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              scrollwheel: true,
              gestureHandling: "greedy",
            }}
          >
            {/* Only show API locations, NOT library/main_office */}
            {locations
              .filter((loc) => loc.id !== "library" && loc.id !== "main_office" && loc.id !== "FEC" && loc.id !== "FOH" && loc.id !== "CENTRE" && loc.id !== "ProServ" && loc.id !== "HealthCen" && loc.id !== "main_gate" && loc.id !== "FNAS" && loc.id !== "FE" && loc.id !== "ParK" && loc.id !== "Sports")
              .map((loc) => (
                <Marker
                  key={loc.id}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  label={loc.name !== "My Location" ? loc.name : ""}
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
