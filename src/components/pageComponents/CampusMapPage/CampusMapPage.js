// src/components/pageComponents/CampusMapPage/CampusMapEmbed.js
import React from "react";
import "./CampusMapPage.css"; 

const CampusMapEmbed = () => {
  return (
    <div className="campus-map-container">
      <h1 className="page-title">NWU Potchefstroom Campus Map</h1>
      <p className="page-subtitle">
        Explore the campus — zoom and drag to view different areas.
      </p>

      <div className="map-frame">
        <iframe
          title="NWU Potchefstroom Campus"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1474.9099990561172!2d27.091399518704474!3d-26.690512860259556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9680dac6cf292d%3A0x71bc9401a11834dc!2sNorth-West%20University!5e0!3m2!1sen!2sza!4v1758736795696!5m2!1sen!2sza"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default CampusMapEmbed;
