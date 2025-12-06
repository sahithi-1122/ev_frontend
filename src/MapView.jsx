import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

function MapView({ tasks }) {
  // Fix default marker icon issue in Leaflet
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })
  }, [])

  const defaultPosition = [tasks[0]?.lat || 20.5937, tasks[0]?.lng || 78.9629] // fallback to India

  return (
    <div className="map-view-container">
      <MapContainer center={defaultPosition} zoom={5} scrollWheelZoom={true} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tasks.map((task) => (
          <Marker key={task.id} position={[task.lat, task.lng]}>
            <Popup>
              <strong>{task.Name}</strong><br />
              {task.Location}<br />
              {task.Status} - {task.ConnectorType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
