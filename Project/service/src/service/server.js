const express = require('express')
const app = express()
const port = 3000
const {Server} = require('socket.io')
const server = new Server(8000)

const userChecker = require('../requests/userChecker')
const rqStatistic = require('../requests/requestStatistic')
const loginChecker = require('../requests/loginRequest')
const userInformation = require('../requests/userInformation')
const addPayment = require('../requests/addPayment')
const userHistoryPayments = require('../requests/userHistoryPayments')
const userBalance = require('../requests/userBalance')
const userCars = require('../requests/userCars')
const userRegisteredCars = require('../requests/userRegisteredCars')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

console.log("Info: Socket Server is running on port 8000")

server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  // initialize this client's sequence number

  socket.on("disconnect", () => {
      console.info(`Client disconnected [id=${socket.id}]`);
  });
});

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


app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS,TRACE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin')
  next()
})

app.listen(port, () => {
  console.log(`Info: HTTP Server is running on port ${port}`)
});