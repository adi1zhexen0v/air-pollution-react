import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getColor } from "../utils/getColor";

const center = [43.258949, 76.889709];

const createCustomIcon = (value) => {
  const color = getColor(value);
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class="pm-icon" style="background-color: ${color}">${value.toFixed(
      1
    )}</div>`,
    iconSize: [35, 35],
    iconAnchor: [20, 20]
  });
};

const Map = ({ data, selectedDate }) => {
  return (
    <div className="map-wrapper">
      <h2 className="page-title">
        Detailed PM2.5 Map –
        {new Date(selectedDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long"
        })}
      </h2>
      <MapContainer center={center} zoom={11} className="leaflet-map">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((point, idx) => (
          <Marker
            key={idx}
            position={[point.latitude, point.longitude]}
            icon={createCustomIcon(point["PM2.5"])}
          >
            <Popup>
              <b>{point.station_name}</b>
              <br />
              PM2.5: {point["PM2.5"]}
              <br />
              Date: {point.date}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
