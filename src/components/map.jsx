import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Leaflet for icon customization

import 'leaflet-routing-machine';
import { MdFileCopy } from "react-icons/md";

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useStore from '../zustand/store';
import '../css/MapComponent.css'; // Import the CSS file

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

  const userData = useStore((state) => state.userData);
  const { username } = userData;

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert('Room ID copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const getDirections = (targetLocation) => {
    if (routeControl) {
      routeControl.remove();
    }

    const newRouteControl = L.Routing.control({
      waypoints: [
        L.latLng(location.lat, location.lng),
        L.latLng(targetLocation.lat, targetLocation.lng),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    setRouteControl(newRouteControl);
  };

  return (
    <div className="map-component">
      <div className="map-header">
        {/* Wrap Room ID and Copy button */}
        <div className="room-id-container">
          <h2>
            Room ID: <span className="room-id">{roomId}</span>
          </h2>
          <MdFileCopy size={25} onClick={copyToClipboard} className="copy-icon" />
        </div>

        <h2 className='user_joined-headding'>
          Users Joined: <span className="user-count">{userCount}</span>
        </h2>
      </div>

      <MapContainer
        center={location}
        zoom={13}
        className="map-container"
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={location}>
          <Popup>{username ? `${username}` : 'Your'} location</Popup>
        </Marker>

        {userLocations
          .filter((user) => user.id !== socket.id)
          .map((user) => (
            <Marker key={user.id || `${user.location.lat}-${user.location.lng}`} position={user.location}>
              <Popup>
                User: {user.id}
                <br />
                <button onClick={() => getDirections(user.location)} className="direction-button">
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