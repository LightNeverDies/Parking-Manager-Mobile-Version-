const io = require("socket.io-client")
const { Server } = require('socket.io')
const server = new Server(8001)
const socket = io.connect("http://localhost:8000")

socket.on("ParkingLots", (data) => {
  console.log(data)
})