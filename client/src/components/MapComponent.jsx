import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Compass } from 'lucide-react';

function MapMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, 13, { duration: 1.5 });
  }, [position, map]);
  return null;
}

export default function MapComponent({ destinations, selectedDestination, className = '' }) {
  const [center, setCenter] = useState([20, 0]);
  const [zoom, setZoom] = useState(2);

  // Default center if no destinations
  const defaultCenter = [20, 0];

  const markers = (destinations || []).map((d) => {
    const coords = d.location?.coordinates;
    if (!coords || coords.length < 2) return null;
    const isSelected = selectedDestination && d._id === selectedDestination._id;
    return (
      <Marker
        key={d._id}
        position={[coords[1], coords[0]]}
        onClick={() => setCenter([coords[1], coords[0]])}
      >
        <Popup>
          <div className="w-48">
            <img
              src={d.image}
              alt={d.name}
              className="w-full h-24 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-sm">{d.name}</h4>
                <span className="text-[10px] badge-outline">{d.category}</span>
              </div>
              <p className="text-xs text-slate-500">{d.shortDescription}</p>
              <button
                className="mt-2 w-full text-xs text-sky-600 underline underline-offset-2 hover:text-sky-700"
                onClick={() => setCenter([coords[1], coords[0]])}
              >
                View on map
              </button>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className={`rounded-2xl border border-slate-200 overflow-hidden ${className}`}>
      <div className="relative h-[400px]">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          onZoomChange={(e) => setZoom(e.target._zoom)}
          onMoveEnd={(e) => setCenter(e.target.getCenter())}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
          {selectedDestination && selectedDestination.location?.coordinates && (
            <MapMarker position={[selectedDestination.location.coordinates[1], selectedDestination.location.coordinates[0]]} />
          )}
        </MapContainer>
        {/* Compass decoration */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
          <Compass size={16} className="text-sky-600" />
          <span className="text-xs font-semibold text-slate-700">Travel Map</span>
        </div>
      </div>
    </div>
  );
}
