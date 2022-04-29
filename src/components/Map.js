import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  Polygon,
} from "@react-google-maps/api";

const data = require("../data/dzejson3.json");
const options = {
  disableDefaultUI: true,
  minZoom: 12,
  mapId: "566559f1b8667aab",
  gestureHandling: "greedy",
  clickableIcons: false,
};
const paths = [
  { lat: 51.104012785873046, lng: 17.030940092544146 },
  { lat: 51.10382415710692, lng: 17.03531745765645 },
  { lat: 51.10420141386945, lng: 17.03630451057393 },
  { lat: 51.10344689726551, lng: 17.040209806899615 },
  { lat: 51.10366247469476, lng: 17.040896452407427 },
  { lat: 51.10730019218651, lng: 17.041711843947954 },
  { lat: 51.10765047579647, lng: 17.04184058998067 },
  { lat: 51.10872825486872, lng: 17.043771780471392 },
  { lat: 51.108943807667224, lng: 17.047247923354693 },
  { lat: 51.1129313531072, lng: 17.049994505385943 },
  { lat: 51.11565238592554, lng: 17.0510673889919 },
  { lat: 51.116729978390595, lng: 17.051196135024615 },
  { lat: 51.117134069085786, lng: 17.04583171699483 },
  { lat: 51.117134069085786, lng: 17.041883505324908 },
  { lat: 51.11357794967673, lng: 17.03986648414571 },
  { lat: 51.115194401517726, lng: 17.035489119033404 },
  { lat: 51.11325465252292, lng: 17.029695547561236 },
  { lat: 51.11422453719875, lng: 17.024288214187212 },
  { lat: 51.11355100833364, lng: 17.023773230056353 },
  { lat: 51.11161119035132, lng: 17.021799124221392 },
  { lat: 51.11077596586495, lng: 17.021756208877154 },
  { lat: 51.10926713498, lng: 17.02209953163106 },
  { lat: 51.10781214425953, lng: 17.0215845475002 },
  { lat: 51.10616848853434, lng: 17.02583316657979 },
];
const polygonOptions = {
  fillColor: "tomato",
  fillOpacity: 0.2,
  strokeColor: "red",
  strokeOpacity: 0.4,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};
const Map = ({ setModal, userPos, modal }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const mapRef = useRef(null);
  const [mapPos, setMapPos] = useState([51.110465, 17.03168]);
  useEffect(() => {
    if (userPos.length !== 0) {
      setMapPos(userPos);
    }
  }, [userPos]);
  return isLoaded ? (
    <GoogleMap
      ref={mapRef}
      options={options}
      mapContainerClassName="map-container"
      center={{ lat: mapPos[0], lng: mapPos[1] }}
      zoom={14}
      onClick={() => {
        modal.open && setModal({ open: false });
      }}
      onDrag={() => {
        modal.open && setModal({ open: false });
      }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          data.map((e) => {
            const lat = e.lat;
            const lng = e.lng;
            return (
              <Marker
                key={e.id}
                position={{ lat: lat, lng: lng }}
                clusterer={clusterer}
                onClick={() => {
                  setModal({
                    open: true,
                    address: e.address,
                    category: e.category,
                    placeId: e.place_id,
                  });
                  setMapPos([lat, lng]);
                }}
              />
            );
          })
        }
      </MarkerClusterer>
      <Polygon options={polygonOptions} paths={paths} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
