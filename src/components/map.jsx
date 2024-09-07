import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

const MapComponent = ({ roomId, socket, location }) => {
  const [userLocations, setUserLocations] = useState([]);

  // When the component mounts, handle socket events
  useEffect(() => {
    if (socket && roomId) {
      // Listen for when a user joins and receive all users' locations
      socket.on('user-joined', (locations) => {
        setUserLocations(locations);
      });

      // Listen for location updates from users
      socket.on('location-updated', (locations) => {
        setUserLocations(locations);
      });

      // Emit the current user's location when joining
      socket.emit('join-room', { roomId, location });

      // Clean up the socket listeners when the component unmounts
      return () => {
        socket.off('user-joined');
        socket.off('location-updated');
      };
    }
  }, [socket, roomId, location]);

  return (
    <MapContainer center={location} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Show the current user's location */}
      <Marker position={location}>
        <Popup>Your location</Popup>
      </Marker>

      {/* Show other users' locations */}
      {userLocations.map((user) => (
        <Marker key={user.id} position={user.location}>
          <Popup>User {user.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
