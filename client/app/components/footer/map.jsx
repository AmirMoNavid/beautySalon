import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "../../assets/images/marker.png";

const Map = ({ className = "" }) => {
  const center = { lat: 35.732825191167024, lng: 51.3332863113248 };
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();

  const markerIcon = new L.Icon({
    iconUrl: marker.src,
    iconSize: [40, 40],
    iconAnchor: [17, 90], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  const osm = {
    maptiler: {
      url: "https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=Fw25i3lsnM9J42ZHLppZ",
      attribution: "",
      // attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  return (
    <div className="row">
      <div className="col text-center">
        <div className="col">
          <MapContainer
            className={className}
            center={center}
            zoom={ZOOM_LEVEL}
            ref={mapRef}
          >
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
            <Marker position={[center.lat, center.lng]} icon={markerIcon}>
              <Popup>
                <b>سالن زیبایی آرمیس</b>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
