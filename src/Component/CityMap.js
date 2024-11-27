import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './CityMap.css'; // Ensure you have CSS for styling the sidebar and markers

// Array of cities with default data
const citiesArray = [
  { name: 'Tokyo', japaneseName: '東京', lat: 35.6762, lng: 139.6503, nights: 0 },
  { name: 'Kobe', japaneseName: '神戸', lat: 34.6901, lng: 135.1955, nights: 0 },
  { name: 'Kamakura Yokohama', japaneseName: '鎌倉・横浜', lat: 35.3197, lng: 139.5467, nights: 0 },
  { name: 'Osaka', japaneseName: '大阪', lat: 34.6937, lng: 135.5023, nights: 0 },
  { name: 'Kyoto', japaneseName: '京都', lat: 35.0116, lng: 135.7681, nights: 0 },
  { name: 'Nara', japaneseName: '奈良', lat: 34.6851, lng: 135.8050, nights: 0 },
  { name: 'Hiroshima', japaneseName: '広島', lat: 34.3853, lng: 132.4553, nights: 0 },
  { name: 'Nagoya', japaneseName: '名古屋', lat: 35.1814, lng: 136.9066, nights: 0 },
];

// Haversine formula to calculate distance in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Main CityMap component
const CityMap = ({ cityList, hotels }) => {
  const [mapCenter] = useState([36.2048, 138.2529]); // Center of Japan
  const [mapZoom] = useState(5);

  // Filtered cities based on cityList prop, with updated nights if present in hotels data
  const cities = citiesArray
    .filter(city => cityList.includes(city.name))
    .map(city => {
      const hotel = hotels.find(hotel => hotel.city === city.name);
      return hotel ? { ...city, nights: hotel.nights } : city;
    });

  // Component to fit map bounds based on cities' coordinates
  const FitBounds = ({ cities }) => {
    const map = useMap();

    useEffect(() => {
      const bounds = L.latLngBounds(cities.map(city => [city.lat, city.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [map, cities]);

    return null;
  };

  // Custom icon with number of nights for each city
  const createCustomIcon = (city) => {
    return new L.DivIcon({
      html: `
        <div style="position: relative; text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" style="width: 30px; height: 30px;" />
          <span style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: white; padding: 2px 5px; border-radius: 3px; font-size: 12px;">
            ${city.nights}N
          </span>
        </div>
      `,
      className: '',
      iconSize: [35, 35],
    });
  };

  const pathPositions = cities.map(city => [city.lat, city.lng]);

  // Calculate midpoints and distances
  const midpointsAndDistances = pathPositions.slice(0, -1).map((start, i) => {
    const end = pathPositions[i + 1];
    const midpoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
    const distance = calculateDistance(start[0], start[1], end[0], end[1]);
    return { midpoint, distance };
  });

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "600px", width: "100%", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <FitBounds cities={cities} />

        {cities.map((city, index) => (
          <Marker
            key={index}
            position={[city.lat, city.lng]}
            icon={createCustomIcon(city)}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{city.name}</strong> ({city.japaneseName})<br />
                <span>Nights: {city.nights}</span>
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline
          positions={pathPositions}
          color="black"
          weight={3}
          dashArray="5, 10"
        />

        {/* Direction and distance arrows along the path */}
        {midpointsAndDistances.map(({ midpoint, distance }, index) => (
          <Marker
            key={`midpoint-${index}`}
            position={midpoint}
            icon={new L.DivIcon({
              html: `<div style="border: 2px solid black; border-radius: 50%; width: 10px; height: 10px; transform: rotate(45deg);"></div>`,
              className: 'direction-circle',
              iconSize: [10, 10],
            })}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent>
              {distance.toFixed(2)} km
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Sidebar inside map */}
      <div className="city-info-sidebar">
        {cities.map((city, index) => (
          <div key={index} className="city-info">
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location icon" className="city-icon" />
            <div>
              <strong>{city.name}</strong> ({city.japaneseName})<br />
              Nights: {city.nights}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityMap;
