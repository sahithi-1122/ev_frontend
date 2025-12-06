import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

function MapView({ tasks }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  const defaultPosition = [
    safeTasks[0]?.latitude || 20.5937,
    safeTasks[0]?.longitude || 78.9629,
  ];

  return (
    <div className="map-view-container">
      <MapContainer
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {safeTasks.map((task) => (
          <Marker
            key={task._id}
            position={[task.latitude, task.longitude]}
          >
            <Popup>
              <strong>{task.name}</strong>
              <br />
              {task.address}
              <br />
              {task.status} - {task.connectortype}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
