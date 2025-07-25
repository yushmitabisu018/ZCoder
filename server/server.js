// const express = require('express');
// const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
// const ACTIONS = require('./Actions');

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST'],
//   },
// });

// const userSocketMap = {};

// function getAllConnectedClients(roomId) {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//     (socketId) => ({
//       socketId,
//       username: userSocketMap[socketId],
//     })
//   );
// }

// io.on('connection', (socket) => {
//   console.log('Socket connected:', socket.id);

//   socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
//     userSocketMap[socket.id] = username;
//     socket.join(roomId);
//     const clients = getAllConnectedClients(roomId);
//     clients.forEach(({ socketId }) => {
//       io.to(socketId).emit(ACTIONS.JOINED, {
//         clients,
//         username,
//         socketId: socket.id,
//       });
//     });
//   });

//   socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
//     console.log(`Received CODE_CHANGE from ${socket.id} for room ${roomId}`);
//     socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
//     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on('disconnecting', () => {
//     const rooms = [...socket.rooms];
//     rooms.forEach((roomId) => {
//       socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
//         socketId: socket.id,
//         username: userSocketMap[socket.id],
//       });
//     });
//     delete userSocketMap[socket.id];
//   });
// });
// app.get('/', (req, res) => {
//   res.send('Socket.IO server is up!');
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Listening on port ${PORT}`));