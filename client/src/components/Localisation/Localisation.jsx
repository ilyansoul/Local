import React, { useState } from "react";
import EditLeft from "../Edit/EditLeft";
import axios from "axios";

const Localisation = () => {
  const [authorized, setAuthorized] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleAuthorize = () => {
    if (navigator.geolocation) {
      const confirmation = window.confirm("Do you want to share your location with us?");
      if (confirmation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLat(lat);
            setLng(lng);
            setAuthorized(true);
            console.log("Button clicked");
            axios.put('/api/store-location', { lat, lng })
              .then(res => console.log(res.data))
              .catch(err => console.error(err));
          },
          error => {
            console.error(`Geolocation error: ${error.message}`);
          }
        );
      }
    }
  };

  const handleLocationClick = () => {
    if (authorized) {
      alert("Location already saved!");
    } else {
      handleAuthorize();
    }
  };

  return (
    <>
    
    </>
  );
};

export default Localisation;