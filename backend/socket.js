// socket.js
let io;
const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL, credentials: true },
  });
  return io;
};
const getIO = () => io;
module.exports = { initSocket, getIO };
