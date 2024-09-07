import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MapComponent from './components/map'; // Map component for showing map and locations
import RoomControls from './components/roomControls'; // Component for creating/joining room

// Connect to the Socket.IO server
const socket = io('http://localhost:3000');

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

  // Handle joining a room
  const joinRoom = (newRoomId) => {
    setRoomId(newRoomId);
    console.log(`Joining room ${newRoomId} with location:`, location);
    socket.emit('join-room', { roomId: newRoomId, location });
  };

  return (
    <div>
      {/* RoomControls for creating or joining a room */}
      <RoomControls joinRoom={joinRoom} />

      {/* Show the map with user locations if a room is joined */}
      {roomId && (
        <MapComponent
          roomId={roomId}
          socket={socket}
          location={location}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
