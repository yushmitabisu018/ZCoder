// require('dotenv').config();
// require('express-async-errors');

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const http = require('http');
// const { Server } = require('socket.io');

// const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authentication');
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');
// const ACTIONS = require('./Actions');

// const app = express();

// // CORS Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.options('*', cors()); // Handle preflight requests

// JSON Body Parser
// app.use(express.json());

// // Serve static files (uploads)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routers
// const authRouter = require('./routes/auth');
// const questionsRouter = require('./routes/questions');
// const userRouter = require('./routes/user');

// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/questions', authenticateUser, questionsRouter);
// app.use('/api/v1/user', authenticateUser, userRouter);

// // 404 Middleware
// app.use(notFoundMiddleware);

// // Global Error Handler
// app.use(errorHandlerMiddleware);

// // Create HTTP server from Express app
// const server = http.createServer(app);

// Setup Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// // To keep track of connected users by socketId
// const userSocketMap = {};

// function getAllConnectedClients(roomId) {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(socketId => ({
//     socketId,
//     username: userSocketMap[socketId],
//   }));
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
//     socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
//     io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
//   });

//   socket.on('disconnecting', () => {
//     const rooms = [...socket.rooms];
//     rooms.forEach(roomId => {
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

// Start server and connect to MongoDB
// const PORT = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     server.listen(PORT, () => {
//       console.log(`🚀 Server listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ MongoDB connection failed:', err);
//     process.exit(1);
//   }
// };

// start();

// module.exports = app;












require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const ACTIONS = require('./Actions');

const app = express();

// CORS Middleware
const CLIENT_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

// JSON Body Parser
app.use(express.json());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const authRouter = require('./routes/auth');
const questionsRouter = require('./routes/questions');
const userRouter = require('./routes/user');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/questions', authenticateUser, questionsRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

// ✅ Root route (must be placed **before** 404 handler)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ZCoder backend is running 🚀' });
});

// 404 Middleware (should be after all valid routes)
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorHandlerMiddleware);

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(socketId => ({
    socketId,
    username: userSocketMap[socketId],
  }));
}

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach(roomId => {
      socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

// Start server and connect to MongoDB
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

start();

module.exports = app;
