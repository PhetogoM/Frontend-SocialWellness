import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { mapsAPI } from "../../apiComponents/mapsApi.js";
import { Helmet } from "react-helmet-async";
import "./CampusMapPage.css";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "10px",
};

const CAMPUS_CENTER = { lat: -26.6906, lng: 27.1 };

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

  // Load locations
  const loadLocations = async () => {
    try {
      const data = await mapsAPI.getLocations();
      const extraLocations = [
        { id: "library", name: "Library", lat: -26.6889757, lng: 27.0917899 },
        { id: "main_office", name: "Main Office", lat: -26.6885171, lng: 27.0932626 },
        { id: "FEC", name: "Faculty of Educational Sciences", lat: -26.6918294, lng: 27.0904169 },
        { id: "FOH", name: "Faculty of Humanities", lat: -26.6881634, lng: 27.0917708 },
        { id: "CENTRE", name: "Campus Student Centre", lat: -26.6867447, lng: 27.0928651 },
        { id: "ProServ", name: "Protection Services", lat: -26.6873198, lng: 27.0941740 },
        { id: "HealthCen", name: "Healthcare Centre", lat: -26.6891795, lng: 27.0946032 },
        { id: "main_gate", name: "Main Gate", lat: -26.6900805, lng: 27.0933372 },
        { id: "FNAS", name: "Faculty of Natural Sciences", lat: -26.6857769, lng: 27.0932189 },
        { id: "FE", name: "Faculty of Engineering", lat: -26.6792620, lng: 27.0951470 },
        { id: "ParK", name: "Cachet Park Shopping", lat: -26.6919886, lng: 27.0943913 },
        { id: "Sports", name: "Sports Village", lat: -26.6939973, lng: 27.0998594 },
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
          if (mapRef.current) mapRef.current.panTo(userLoc);
          const myLoc = { id: "my_location", name: "My Location", lat: userLoc.lat, lng: userLoc.lng };
          setLocations((prev) => {
            const exists = prev.find((loc) => loc.id === "my_location");
            if (exists) return prev.map((loc) => (loc.id === "my_location" ? myLoc : loc));
            return [...prev, myLoc];
          });
          setStart("my_location");
        },
        () => alert("Unable to retrieve your location")
      );
    } else alert("Geolocation not supported by your browser");
  };

  const handleFindRoute = () => {
    if (!start || !destination) return alert("Please select both starting point and destination.");
    const startLoc = locations.find((loc) => loc.id === start);
    const destLoc = locations.find((loc) => loc.id === destination);
    if (!startLoc || !destLoc) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      { origin: startLoc, destination: destLoc, travelMode: window.google.maps.TravelMode.WALKING },
      (result, status) => {
        if (status === "OK") setDirections(result);
        else alert("Could not calculate route. Try again.");
      }
    );
  };

  return (
    <div className="campus-map-container">
      <Helmet>
        <title>NWU Potchefstroom Campus Map | Find Locations & Directions</title>
        <meta
          name="description"
          content="Explore the NWU Potchefstroom campus map. Find faculty buildings, student centres, libraries, and get walking directions."
        />
        <meta name="keywords" content="NWU, Campus Map, Potchefstroom, Directions, Faculty, Library, Student Centre" />
      </Helmet>

      <h1 className="page-title">NWU Potchefstroom Campus Map</h1>
      <p className="page-subtitle">
        Select your starting point and destination, or find your location on the map.
      </p>

      <div className="map-controls">
        <select aria-label="Select Starting Point" value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select Starting Point</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        <select aria-label="Select Destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select Destination</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>

        <button onClick={handleFindRoute} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Find My Destination
        </button>
        <button onClick={handleFindMe} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Find My Location
        </button>
      </div>

      <div className="map-frame">
        {isLoaded ? (
          <GoogleMap mapContainerStyle={containerStyle} center={CAMPUS_CENTER} zoom={16} onLoad={(map) => (mapRef.current = map)}>
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={{ lat: loc.lat, lng: loc.lng }}
                label={loc.name !== "My Location" ? loc.name : ""}
                onClick={() => setSelectedMarker(loc)}
              />
            ))}

            {currentPosition && <Marker position={currentPosition} label="You" icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} />}

            {selectedMarker && (
              <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <h3>{selectedMarker.name}</h3>
                  <p>{selectedMarker.info || ""}</p>
                </div>
              </InfoWindow>
            )}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      <section className="locations-list">
        <h2>Campus Buildings & Facilities</h2>
        <ul>
          {locations.map((loc) => (
            <li key={loc.id}>{loc.name}</li>
          ))}
        </ul>
      </section>

      <a href="/files/nwu-campus-map.pdf" target="_blank" rel="noopener noreferrer">
        Download the full NWU Potchefstroom Campus Map (PDF)
      </a>
    </div>
  );
}

export default CampusMapPage;
