import React from 'react';
import './RoomsBase.css'; 
import { useNavigate } from 'react-router-dom';

const RoomsBase = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/rooms/create');
  };

  return (
    <div className="rooms-base">
      <h2>Join or Create a Room</h2>
      <p>Collaborate with others in real-time.</p>
      <div className="room-buttons">
        <button onClick={handleCreateRoom}>Create Room</button>
        <button disabled>Join Room (Coming Soon)</button>
      </div>
    </div>
  );
};

export default RoomsBase;
