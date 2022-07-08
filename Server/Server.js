const io = require("socket.io")(3000, {
  // backend connection port
  // here if we keep it like this, then we'll get CORS errors,
  // so we need to set the origins to allow all origins
  cors: {
    origin: "*", //allowing connection from all ports
  },
});

io.on("connection", (socket) => {
  console.log(`server:: user connected with id ${socket.id}`);
  socket.on("message", (message, roomId) => {
    // message event is emitted by client whe a message is sent
    // send-message is the event which is emitted by the server
    if (roomId == "") {
      socket.broadcast.emit("send-message", message);
    } else {
      socket.to(roomId).emit("send-message", message);
    }
    console.log(message);
  });

  socket.on("join-room", (roomId, callBacl) => {
    socket.join(roomId);
    //   io.to(room).emit("send-message", `${socket.id} has joined the room`); // we can use this to send an event to client to display the joined info, but we can effectively do this thing using call_backs. refer script.js sending a callback
    callBacl(`s-c cBack:: user joined room ${roomId}`);
    console.log(`server:: user joined room ${roomId}`);
  });
});
