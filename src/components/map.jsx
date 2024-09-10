import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Leaflet for icon customization

import 'leaflet-routing-machine';


// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useStore from '../zustand/store';

// Fix marker icons not showing after deployment
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const MapComponent = ({ roomId, socket }) => {
  const [userLocations, setUserLocations] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : { lat: 51.505, lng: -0.09 };
  });

  const [map, setMap] = useState(null); // State to store the map instance
  const [routeControl, setRouteControl] = useState(null); // State to manage route control


  const userData = useStore((state)=>state.userData);
  const {username}= userData;

  // Handle socket events for location and user count updates
  useEffect(() => {
    if (socket && roomId) {
      socket.on('location-updated', (locations) => {
        setUserLocations(locations);
      });

      socket.on('user-count-updated', (count) => {
        setUserCount(count);
      });

      socket.emit('join-room', { roomId, location });

      return () => {
        socket.off('location-updated');
        socket.off('user-count-updated');
      };
    }
  }, [socket, roomId, location]);

  // Function to copy room ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert('Room ID copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  // Function to get directions to another user's location
  const getDirections = (targetLocation) => {
    if (routeControl) {
      routeControl.remove(); // Remove the existing route if there is one
    }

    const newRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(location.lat, location.lng), // Current user's location
        L.latLng(targetLocation.lat, targetLocation.lng), // Selected user's location
      ],
      routeWhileDragging: true,
    }).addTo(map); // Add the new route to the map

    setRouteControl(newRouteControl); // Store the new route control in the state
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>Room ID: {roomId}</h2>
        <button onClick={copyToClipboard} style={{ marginLeft: '10px' }}>Copy</button>
        <span style={{ marginLeft: '20px' }}>Users Joined: {userCount}</span>
      </div>
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={setMap} // Store the map instance in state
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        {/* Show the current user's location */}
        <Marker position={location}>
          <Popup>{username ? `${username}` : 'Your'} location</Popup>
        </Marker>

        {/* Show other users' locations */}
        {userLocations
          .filter(user => user.id !== socket.id) // Exclude the current user's marker based on socket ID
          .map((user) => (
            <Marker key={user.id || `${user.location.lat}-${user.location.lng}`} position={user.location}>
              <Popup>
                User: {user.id}
                <br />
                <button 
                  onClick={() => getDirections(user.location)}
                  style={{
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Get Directions
                </button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
