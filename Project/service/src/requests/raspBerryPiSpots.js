const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')
let allParkingsAvailable = ''

const allParkingsLots = (socket) => {
    socket.emit("ParkingSpaces", allParkingsAvailable)
}

const raspBerryPiSpots = async (parkings) => {
    
    if (parkings !== undefined) {
        try {
            await mysql.connection.getConnection((err, con) => {
                if (err) {
                    res.send({
                        message: messageError.errorConnection
                    })
                } else {
                    const raspBerryPiParkingName = Object.keys(parkings).reduce((el) => { return el })

                    con.query(`SELECT * FROM Parking_Spaces WHERE parkingName = '${raspBerryPiParkingName}'`, (error, result) => {
                        if (error) {
                            return error
                        }

                        if (result.length < 0) {
                            parkings.raspBerryPi.map((el) => {
                                con.query(`INSERT INTO Parking_Spaces (parkingName, id_lots, status, type, code) 
                                VALUES('${raspBerryPiParkingName}', '${el.parkSpace}', '${el.status}', '${el.type}', '${el.code}' )`, (error) => {
                                    if (error) {
                                        console.log(error)
                                        return error
                                    }
                                })
                            })
                        }
                        if(result.length > 0) {
                            allParkingsAvailable = result
                        }
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log("No parkings available")
    }
}

module.exports = {
    raspBerryPiSpots,
    allParkingsLots
}