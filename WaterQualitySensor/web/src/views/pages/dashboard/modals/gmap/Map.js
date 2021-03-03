import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";

function Map(props) {

  const refMap = useRef(null);

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter(); //get map center
    //setCenter(mapCenter)
    props.setLocation(mapCenter)
  };

  const onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    marker = {
      title: "",
      name: "",
      position: { lat, lng }
    };
  };


  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={13}
      defaultCenter={{ lat: props.location.lat, lng: props.location.long }}
      draggable={true}
      onBoundsChanged={useCallback(handleBoundsChanged)}
      onClick={useCallback(onClick)}
    >
      <Marker position={{ lat: marker.position.lat, lng: marker.position.lng }} />
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
