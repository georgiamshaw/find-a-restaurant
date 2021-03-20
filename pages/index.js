import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };


  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13.5}
        style={mapStyles}
        initialCenter={
          {
            lat: 51.5050,
            lng: -0.1000
          }
        }
      >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{lat: 51.1050,
                  lng: -0.1000}}
                />
        <Marker onClick={this.onMarkerClick}
                name={'Curr location'}
                position={{lat: 51.050,
                  lng: -0.1000}}
                />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_SECRET
})(MapContainer);
