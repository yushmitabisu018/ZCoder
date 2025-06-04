
import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    //timeout: 100000,
   transports: ["websocket"],
  };
 
  return io(import.meta.env.VITE_BACKEND_URL, options);
};
