import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
      {/* Show other users' locations in the room */}
      {console.log(userLocations)}
      {Object.entries(userLocations).map(([userId, userLocation]) => (
        <Marker key={userId} position={userLocation}>
          <Popup>User {userId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
