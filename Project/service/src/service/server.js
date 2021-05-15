const express = require('express')
const app = express()
const port = 3000
const userChecker = require('../requests/userChecker')
const rqStatistic = require('../requests/requestStatistic')
const loginChecker = require('../requests/loginRequest')
const userInformation = require('../requests/userInformation')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)


app.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS,TRACE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin')
    next()
})


app.get('/', ( req, res ) => {
  res.send(true)
});

// Adding User
app.get('/user/register/', async ( req, res) => {
  await userChecker.userCreated( req, res)
})

app.post('/user/login', async (req, res) => {
  await loginChecker.loginRequest( req, res)
})

app.get('/statistic/', async( req, res ) => {
  await rqStatistic.rqStatistic( req, res )
})

app.get('/user/', async( req, res ) => {
  await userInformation.userInformation ( req, res )
})

app.listen(port, () => {
  console.log(`Info: Server is running on port ${port}`)
});