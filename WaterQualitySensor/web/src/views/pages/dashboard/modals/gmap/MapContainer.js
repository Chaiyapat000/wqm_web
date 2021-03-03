/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

class MapContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      place : {
        lat: 0,
        lng: 0
      }
    }
  }

  componentDidMount() {
    this.setState({
      place: {
        lat: this.props.location.lat,
        lng: this.props.location.long
      }
    });
  }

  addMarker(e) {
    console.log(e);
    const newPlace = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    this.setState({
      place: newPlace
    });
    this.props.setLocation(newPlace)
  }

  render() {
    return (
      <GoogleMap
        onClick={this.addMarker.bind(this)}
        defaultZoom={13}
        defaultCenter={{ lat: this.props.location.lat, lng: this.props.location.long }}
      >
        {
          <Marker
            position={{ lat: this.state.place.lat, lng: this.state.place.lng }}
          />
      }
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MapContainer));
