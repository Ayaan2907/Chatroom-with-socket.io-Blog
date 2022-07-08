import { io } from "socket.io-client";
const messageInput = document.querySelector("#messageInput");
const roomInput = document.querySelector("#roomInput");
const joinRoomButton = document.querySelector("#joinRoomButton");
const leaveRoomButton = document.querySelector("#leaveRoomButton");
const messageContainer = document.querySelector("#messageContainer");
const form = document.querySelector("#form");
const socket = io("http://localhost:3000"); //backend connection port

//  .on is the event listener or a method of socket.io liberary listening to "connect" event
socket.on("connect", () => {
  displayMessage(`client:: user connected with id ${socket.id}`);
});

// listening to send-message event, send-message is the event which is emitted by the server
socket.on("send-message", (message) => {
  displayMessage(message);
  console.log(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const roomId = roomInput.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit("message", message, roomId);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const roomId = roomInput.value;
  //   if (roomId === "") return;
  //   socket.emit("join-room", roomId);
  socket.emit("join-room", roomId, (msg) => {
    displayMessage(msg);
  });
});

leaveRoomButton.addEventListener("click", () => {
  socket.close();
  location.reload();
  displayMessage("One client left the room");
});

function displayMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = message;
  messageContainer.appendChild(messageDiv);
}
