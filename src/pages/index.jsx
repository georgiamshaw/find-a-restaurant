// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import getRestaurants from '../getRestaurants';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const MapContainer = () => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedReview, setSelectedReview] = useState('');
  const [restaurants, setRestaurants] = useState({});

  const onMarkerClick = (restaurant, marker) => {
    setSelectedPlace(restaurant.name);
    setSelectedReview(restaurant.review);
    setActiveMarker(marker);
    setInfoWindow(true);
  };

  const onClose = () => {
    if (infoWindow) {
      setInfoWindow(false);
      setActiveMarker(null);
    }
  };

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  const restaurantArray = restaurants.items?.map((item) => ({
    name: item.fields.name,
    review: item.fields.review,
    location: item.fields.location,
  }));

  return (
    <Map
      // eslint-disable-next-line no-undef
      google={google}
      zoom={13.5}
      style={mapStyles}
      onClick={onClose}
      initialCenter={{
        lat: 51.505,
        lng: -0.1,
      }}
    >
      {
      restaurantArray
        && restaurantArray.map((restaurant) => (
          <Marker
            onClick={onMarkerClick}
            name={restaurant.name}
            review={restaurant.review}
            position={{
              lat: restaurant.location.lat,
              lng: restaurant.location.lon,
            }}
          />

        ))
}
      <InfoWindow marker={activeMarker} visible={infoWindow}>
        <h1>{selectedPlace}</h1>
        <div>{selectedReview}</div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_SECRET,
})(MapContainer);
