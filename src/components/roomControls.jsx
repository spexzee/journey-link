import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const RoomControls = ({ joinRoom }) => {
  const [inputRoomId, setInputRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const navigate = useNavigate();

  // Generate a new room ID and ask for location permission
  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substring(2, 11);
    setCreatedRoomId(newRoomId);
    joinRoom(newRoomId); // Join the newly created room

    // Ask for location permission
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        localStorage.setItem('roomId', newRoomId); // Store roomId in localStorage
        localStorage.setItem('location', JSON.stringify(location)); // Store location in localStorage
        navigate(`/map/${newRoomId}`); // Navigate to map with room ID
      },
      (error) => {
        console.error('Error getting location', error);
        // Fallback to default location if permission is denied or an error occurs
        const defaultLocation = { lat: 51.505, lng: -0.09 };
        localStorage.setItem('roomId', newRoomId); // Store roomId in localStorage
        localStorage.setItem('location', JSON.stringify(defaultLocation)); // Store default location in localStorage
        navigate(`/map/${newRoomId}`); // Navigate to map with room ID
      }
    );
  };

  // Handle joining an existing room and ask for location permission
  const handleJoinRoom = () => {
    if (inputRoomId) {
      joinRoom(inputRoomId);

      // Ask for location permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          localStorage.setItem('roomId', inputRoomId); // Store roomId in localStorage
          localStorage.setItem('location', JSON.stringify(location)); // Store location in localStorage
          navigate(`/map/${inputRoomId}`); // Navigate to map with room ID
        },
        (error) => {
          console.error('Error getting location', error);
          // Fallback to default location if permission is denied or an error occurs
          const defaultLocation = { lat: 51.505, lng: -0.09 };
          localStorage.setItem('roomId', inputRoomId); // Store roomId in localStorage
          localStorage.setItem('location', JSON.stringify(defaultLocation)); // Store default location in localStorage
          navigate(`/map/${inputRoomId}`); // Navigate to map with room ID
        }
      );
    }
  };

  return (
    <div className="room-controls-container">
      <div className="room-controls">
        <button onClick={generateRoomId}>Create Room</button>
        {createdRoomId && <p>Room ID: {createdRoomId}</p>}
        <br />
        <span>--------------- OR ---------------</span>
        <input
          type="text"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
};

export default RoomControls;
