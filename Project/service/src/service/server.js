const express = require('express')
require('dotenv').config()
const app = express()
const http = require('http').createServer(app)
const port = 3000

const io = require("socket.io-client")
const clientSocket = io.connect("http://localhost:8000")

const socketio = require('socket.io')
const server = socketio(8002)

const userChecker = require('../requests/userChecker')
const rqStatistic = require('../requests/requestStatistic')
const loginChecker = require('../requests/loginRequest')
const userInformation = require('../requests/userInformation')
const addPayment = require('../requests/addPayment')
const userHistoryPayments = require('../requests/userHistoryPayments')
const userBalance = require('../requests/userBalance')
const userCars = require('../requests/userCars')
const userRegisteredCars = require('../requests/userRegisteredCars')
const parkingLots = require('../requests/parkingLots')
const getParkings = require('../requests/getParkings')
const raspBerryPiSpots = require('../requests/raspBerryPiSpots')
const allParkingsLots = require('../requests/raspBerryPiSpots')


app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', ( req, res ) => {
  res.send(true)
});

// Adding User
app.get('/user/register/', async ( req, res) => {
  try {
    await userChecker.userCreated( req, res)
  } catch(e) {
    console.log(e)
  }
  
})

app.post('/user/login', async (req, res) => {
  try {
    await loginChecker.loginRequest( req, res)
  } catch(e) {
    console.log(e)
  }

})

app.get('/statistic/', async( req, res ) => {
  try {
    await rqStatistic.rqStatistic( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/user/', async( req, res ) => {
  try {
    await userInformation.userInformation ( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/user/payment/', async( req, res ) => {
  try {
    await addPayment.addPayment( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/user/history/', async( req, res ) => {
  try {
    await userHistoryPayments.userHistoryPayments( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/user/balance/', async ( req, res ) => {
  try {
    await userBalance.userBalance( req, res )
  } catch(e) {
    console.log(e)
  }
  
})

app.get('/user/cars/', async( req,res ) => {
  try {
    await userCars.userCars( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/user/registeredCars/', async( req,res ) => {
  try {
    await userRegisteredCars.userRegisteredCars( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/parkingLots', async ( req,res ) => {
  try{
    await parkingLots.parkingLots( req, res )
  } catch(e) {
    console.log(e)
  }

})

app.get('/getParkings', async ( req, res ) => {
  try{
    await getParkings.getParkings( req, res )
  }catch(e) {
    console.log(e)
  }

})

app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS,TRACE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin')
  next()
})

clientSocket.on("ParkingLots", async (data) => {
  try {
    await raspBerryPiSpots.raspBerryPiSpots(data)
  } catch(e) {
    console.log(e)
  }

})

server.on('connection', (socket) => {
  console.info(`Client connected to Backend [id=${socket.id}]`)

  allParkingsLots.allParkingsLots(socket)
  socket.on("parkinglotsChanged", (row, allData) => {
      // update specific row with data and send it back to raspberryPI
  })

  socket.on('disconnect', () => {
      console.info(`Client disconnected from Backend [id=${socket.id}]`)
  })
})

http.listen(port, () => {
  console.log(`Info: HTTP Server is running on port ${port}`)
});