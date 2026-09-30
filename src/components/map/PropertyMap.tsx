import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Property } from '../../types';
import { MapPin, Bed, Bath, Maximize2, School, Hospital, Bus } from 'lucide-react';

// Fix default Leaflet icon assets
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom price pill icon HTML for real-estate maps
const createCustomPriceIcon = (priceText: string, isVerified: boolean) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background: ${isVerified ? '#059669' : '#0F2942'};
        color: white;
        font-weight: 700;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        white-space: nowrap;
        cursor: pointer;
      ">
        ${priceText}
      </div>
    `,
    iconSize: [60, 26],
    iconAnchor: [30, 13]
  });
};

interface PropertyMapProps {
  properties: Property[];
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  showLandmarksToggle?: boolean;
}

// Controller component to re-center map dynamically when properties change
const MapRecenter: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  return null;
};

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  centerLat = 19.0760, // Default Maharashtra / Mumbai-Pune mid-point
  centerLng = 74.8770,
  zoom = 7,
  showLandmarksToggle = true
}) => {
  const [showSchools, setShowSchools] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  // Auto calculate center if properties are present
  const activeLat = properties.length > 0 ? properties[0].latitude : centerLat;
  const activeLng = properties.length > 0 ? properties[0].longitude : centerLng;
  const activeZoom = properties.length === 1 ? 14 : zoom;

  const formatPriceShort = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)}L`;
    return `₹${(price / 1000).toFixed(0)}k`;
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      
      {/* Map Control Landmark Overlay */}
      {showLandmarksToggle && (
        <div className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-md border border-slate-200 text-xs flex flex-wrap gap-2">
          <button 
            onClick={() => setShowSchools(!showSchools)}
            className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${showSchools ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Schools</span>
          </button>
          <button 
            onClick={() => setShowHospitals(!showHospitals)}
            className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${showHospitals ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <Hospital className="w-3.5 h-3.5" />
            <span>Hospitals</span>
          </button>
        </div>
      )}

      <MapContainer 
        center={[activeLat, activeLng]} 
        zoom={activeZoom} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <MapRecenter lat={activeLat} lng={activeLng} zoom={activeZoom} />
        
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Property Price Markers */}
        {properties.map(property => (
          <Marker 
            key={property.id} 
            position={[property.latitude, property.longitude]}
            icon={createCustomPriceIcon(formatPriceShort(property.price), property.verification_status === 'Verified')}
          >
            <Popup className="property-map-popup">
              <div className="p-1 max-w-[220px]">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div className="font-bold text-navy-900 text-sm">
                  ₹{property.price.toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-semibold text-slate-700 truncate">
                  {property.title}
                </div>
                <div className="text-[11px] text-slate-500 mb-2">
                  {property.locality}, {property.city}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t">
                  <span>{property.bedrooms ? `${property.bedrooms} Bed` : 'Plot'}</span>
                  <span>{property.carpet_area} sq.ft</span>
                  <Link 
                    to={`/properties/${property.id}`}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};
