import { io } from "socket.io-client";
const messageInput = document.querySelector("#messageInput");
const roomInput = document.querySelector("#roomInput");
const joinRoomButton = document.querySelector("#joinRoomButton");
const leaveRoomButton = document.querySelector("#leaveRoomButton");
const messageContainer = document.querySelector("#messageContainer");
const form = document.querySelector("#form");
const socket = io("http://localhost:3000"); //backend connection port


function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
}
