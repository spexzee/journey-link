import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import MapComponent from './components/map'; // Map component for showing map and locations
import RoomControls from './components/roomControls'; // Component for creating/joining room
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

// Connect to the Socket.IO server
const socket = io('http://localhost:3000', {
  secure : true,
  transports: ["websocket", "polling"]
});

const App = () => {
  const [location, setLocation] = useState([0, 0]); // User's location
  const [roomId, setRoomId] = useState(null); // Room ID user is joining
  const [users, setUsers] = useState([]); // Other users in the room

  // Get the user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Handle receiving updated locations of users in the room
  useEffect(() => {
    if (socket) {
      socket.on('location-updated', (usersInRoom) => {
        console.log('Updated user locations:', usersInRoom);
        setUsers(Object.values(usersInRoom)); // Update user locations
      });
    }

    return () => {
      socket.off('location-updated');
    };
  }, [socket]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roomCreate" element={<RoomControls joinRoom={setRoomId} />} />
        <Route path="/map/:roomId" element={<MapComponent roomId={roomId} socket={socket} location={location} users={users} />} />
      </Routes>
    </Router>
  );
};

export default App;
