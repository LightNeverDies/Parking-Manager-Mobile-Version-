const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const getParkings = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.send({
                message: messageError.errorConnection
            })
        } else {
            let userLocation = {
                lat: req.query.lat,
                lon: req.query.lon
            }
            con.query(`SELECT * FROM Parking_Lots WHERE usr_lat='${userLocation.lat.split('.')[0]}' AND usr_lng = '${userLocation.lon.split('.')[0]}'`, (error, result) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                    return error
                } if(result.length > 0) {
                    res.send({
                        parkings: result.length,
                        markers: result,
                        status: '0'

                    })
                } else {
                    res.send({
                        status: '1',
                        error: messageError.errorNoInformation
                    })
                }
                con.release()
            })
        }
    })
    
}

module.exports = {
    getParkings
}