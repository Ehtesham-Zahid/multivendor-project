// socket.js
let io;
const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });
  return io;
};
const getIO = () => io;
module.exports = { initSocket, getIO };
