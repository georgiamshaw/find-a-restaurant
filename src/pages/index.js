import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import * as trial from '../trial.js'

const mapStyles = {
  width: "100%",
  height: "100%",
};

const MapContainer = () => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

console.log(trial, 'hello')

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props.name);
    setActiveMarker(marker);
    setInfoWindow(true);
  };

  const onClose = (props) => {
    if (infoWindow) {
      setInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      google={google}
      zoom={13.5}
      style={mapStyles}
      initialCenter={{
        lat: 51.505,
        lng: -0.1,
      }}
    >
      <Marker onClick={onMarkerClick}
      name={"Current location"}
      position={{ lat: 51.505, lng: -0.1 }}
      />
      <Marker
        onClick={onMarkerClick}
        name={"Current location"}
        position={{ lat: 51.50, lng: -0.1 }}
      />
      <Marker
        onClick={onMarkerClick}
        title={'Hello'}
        name={"Curr location"}
        position={{ lat: 51.495, lng: -0.1 }}
      />
      <InfoWindow marker={activeMarker} visible={infoWindow}>
        <div>
          <h1>{selectedPlace}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_SECRET,
})(MapContainer);
