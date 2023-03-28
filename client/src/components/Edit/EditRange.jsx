import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, Circle } from "react-google-maps";

const Map = withScriptjs(withGoogleMap(props => {
  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
  const [radius, setRadius] = useState(props.radius);

  const handleMarkerDrag = event => {
    setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const handleRadiusChange = event => {
    setRadius(event.target.getRadius());
  };

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={center}
    >
      <Marker position={center} onDragEnd={handleMarkerDrag} />
      <Circle center={center} radius={radius} onRadiusChanged={handleRadiusChange} />
    </GoogleMap>
  );
}));

const EditRange = () => {
  const [lat, setLat] = useState(48.856614);
  const [lng, setLng] = useState(2.352222);
  const [radius, setRadius] = useState(10000);

  useEffect(() => {
    // Get the user's current location and update the state
  }, []);

  return (
    <Map
      lat={lat}
      lng={lng}
      radius={radius}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDiBGD7ws6IPvTK2NpDLrBH2mfYC5dniZc`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default EditRange;