import React, { useState } from 'react';

const RoomControls = ({ joinRoom }) => {
  const [inputRoomId, setInputRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');

  // Generate a new room ID
  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substring(2, 11);
    setCreatedRoomId(newRoomId);
    joinRoom(newRoomId); // Join the newly created room
  };

  // Handle joining an existing room
  const handleJoinRoom = () => {
    if (inputRoomId) {
      joinRoom(inputRoomId);
    }
  };

  return (
    <div>
      <button onClick={generateRoomId}>Create Room</button>
      {createdRoomId && <p>Room ID: {createdRoomId}</p>}
      
      <input
        type="text"
        value={inputRoomId}
        onChange={(e) => setInputRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default RoomControls;
