import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Compass } from 'lucide-react';
import { withImageFallback } from '../utils/images';

// Leaflet's default marker PNGs break when bundled by Vite. These divIcon
// pins are inline SVG, so there is no image file to fail loading.
const pinSvg = (color) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
       fill="${color}" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
       stroke-linejoin="round" style="filter:drop-shadow(0 3px 4px rgba(15,23,42,.45))">
    <path d="M20 10c0 5-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 1 1 16 0"/>
    <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="none"/>
  </svg>`;

const makePin = (active) =>
  L.divIcon({
    className: 'sg-map-pin',
    html: pinSvg(active ? '#f43f5e' : '#0ea5e9'),
    iconSize: [30, 30],
    iconAnchor: [15, 29],
    popupAnchor: [0, -26],
  });

const PIN = makePin(false);
const PIN_ACTIVE = makePin(true);

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13, { duration: 1.2 });
  }, [position, map]);
  return null;
}

export default function MapComponent({ destinations, selectedDestination, className = '' }) {
  const [focus, setFocus] = useState(null);
  const defaultCenter = [20, 0];

  const selectedCoords = selectedDestination?.location?.coordinates;
  const flyToPosition =
    focus ||
    (selectedCoords ? [selectedCoords[1], selectedCoords[0]] : null);

  const markers = (destinations || []).map((d) => {
    const coords = d.location?.coordinates;
    if (!coords || coords.length < 2) return null;
    const isSelected = selectedDestination && d._id === selectedDestination._id;
    const position = [coords[1], coords[0]];

    return (
      <Marker
        key={d._id}
        position={position}
        icon={isSelected ? PIN_ACTIVE : PIN}
        eventHandlers={{ click: () => setFocus(position) }}
      >
        <Popup>
          <div className="w-48">
            <img
              src={d.image}
              alt={d.name}
              className="w-full h-24 object-cover rounded-t-lg"
              onError={withImageFallback}
              loading="lazy"
            />
            <div className="p-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-sm">{d.name}</h4>
                <span className="text-[10px] badge-outline">{d.category}</span>
              </div>
              <p className="text-xs text-slate-500">{d.shortDescription}</p>
              <button
                className="mt-2 w-full text-xs text-sky-600 underline underline-offset-2 hover:text-sky-700"
                onClick={() => setFocus(position)}
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
    <div className={`glass-card overflow-hidden ${className}`}>
      <div className="relative h-[400px]">
        <MapContainer
          center={defaultCenter}
          zoom={2}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
          {flyToPosition && <FlyTo position={flyToPosition} />}
        </MapContainer>

        {/* Compass decoration */}
        <div className="absolute top-4 left-4 z-[500] flex items-center gap-2 glass-chip px-3 py-1.5 rounded-lg">
          <Compass size={16} className="text-sky-600" />
          <span className="text-xs font-semibold text-slate-700">Travel Map</span>
        </div>
      </div>
    </div>
  );
}
