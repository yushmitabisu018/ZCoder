import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/client';
import Editor from '../components/editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import './Editorpage.css';
const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef('');
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [code, setCode] = useState('');  

  
  if (!location.state?.username) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const handleErrors = (error) => {
      console.error('Socket error:', error);
      toast.error('Socket connection failed, try again later.');
      reactNavigator('/rooms');
    };

    const handleJoined = ({ clients, username, socketId }) => {
      if (username !== location.state?.username) {
        toast.success(`${username} joined the room.`);
        console.log(`${username} joined`);
      }
      setClients(clients);

      // Sync code with the new user who joined
      socketRef.current?.emit(ACTIONS.SYNC_CODE, {
        code: codeRef.current,
        socketId,
      });
    };

    const handleDisconnected = ({ socketId, username }) => {
      toast.success(`${username} left the room.`);
      setClients(prev => prev.filter(client => client.socketId !== socketId));
    };

    const handleSyncCode = ({ code }) => {
      console.log("Received SYNC_CODE with code:", code);
      setCode(code);       
      codeRef.current = code;
    };

    const init = async () => {
      try {
        socketRef.current = await initSocket();

        socketRef.current.on('connect_error', handleErrors);
        socketRef.current.on('connect_failed', handleErrors);

        socketRef.current.on(ACTIONS.JOINED, handleJoined);
        socketRef.current.on(ACTIONS.DISCONNECTED, handleDisconnected);
        socketRef.current.on(ACTIONS.SYNC_CODE, handleSyncCode);

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });
      } catch (error) {
        handleErrors(error);
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off('connect_error', handleErrors);
        socketRef.current.off('connect_failed', handleErrors);
        socketRef.current.off(ACTIONS.JOINED, handleJoined);
        socketRef.current.off(ACTIONS.DISCONNECTED, handleDisconnected);
        socketRef.current.off(ACTIONS.SYNC_CODE, handleSyncCode);
        socketRef.current.disconnect();
      }
    };
  }, [location.state?.username, reactNavigator, roomId]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
      toast.error('Could not copy the Room ID');
      console.error(err);
    }
  };

  const leaveRoom = () => {
    reactNavigator('/home/bookmark');
  };

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <h3 className="roomMembers">Room Members</h3>
          <div className="clientList">
            {clients.map(client => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
      </div>
      <div className="editorWrap">
        <div className="editor-container">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {  
            codeRef.current = code;
            setCode(code);
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default EditorPage;
