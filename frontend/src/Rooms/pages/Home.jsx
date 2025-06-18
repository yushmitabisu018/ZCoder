import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Routes/Header';
import Footer from '../../components/LandingPage/Footer';
import './home.css';
const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUserName] = useState('');
  const navigate = useNavigate();

  const createNewRoom = () => {
    const id = uuidV4();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('ROOM ID & username are required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  return (
    <>
      <Navbar />
      <div className="homePageWrapper">
        <Toaster position="top-right" />
        <div className="formWrapper">
          <h1 className="roomLable">Rooms</h1>
          <h4 className="mainLable">Paste invitation Room ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              name="roomId"
              className="inputBox"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              required
            />
            <input
              type="text"
              name="username"
              className="inputBox"
              placeholder="USERNAME"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              required
            />
            <button className="btn joinBtn" onClick={joinRoom}>
              Join
            </button>
          </div>
          <div>
            <p className="createInfo">
              If you don't have an invite then create&nbsp;
                 <button
                    onClick={createNewRoom}
                    className="NwBtn"
                    type="button"
                   >
                    new room
                 </button>
             </p>
          </div>
       
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
