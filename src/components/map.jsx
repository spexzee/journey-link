import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import L from 'leaflet'; // Leaflet for icon customization

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker icons not showing after deployment
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ roomId, socket, location, users }) => {
  const [userLocations, setUserLocations] = useState({});

  // Update user's location periodically
  useEffect(() => {
    if (socket && roomId) {
      const interval = setInterval(() => {
        socket.emit('update-location', { roomId, location });
      }, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [socket, roomId, location]);

  // Update user locations when new data is received
  useEffect(() => {
    if (socket) {
      socket.on('location-updated', (locations) => {
        setUserLocations(locations);
      });

      // Clean up the event listener on component unmount
      return () => {
        socket.off('location-updated');
      };
    }
  }, [socket]);

  // Component to update the map view
  const SetViewOnChange = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(location);
    }, [location, map]);
    return null;
  };

  return (
    <MapContainer center={location} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <SetViewOnChange location={location} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {/* Show the current user's location */}
      <Marker position={location}>
        <Popup>Your location</Popup>
      </Marker>

      {/* Show other users' locations */}
      {Object.entries(userLocations).map(([userId, userLocation]) => (
        <Marker key={userId} position={userLocation}>
          <Popup>User {userId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
