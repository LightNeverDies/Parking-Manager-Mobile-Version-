const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')
let allParkingsAvailable = ''

const getParkingsLots = async() => {
    try {
        await mysql.connection.getConnection((err, con) => {
            try {
                if(err) {
                    console.log(err)
                } else {
                    con.query('SELECT * FROM Parking_Spaces', (error, result) => {
                        if(error) {
                            return error
                        } else {
                            allParkingsAvailable = result
                        }
                    })
                }
            } catch(err) {
                console.log(err)
            } finally {
                con.release()
            }
        })
    } catch(err) {
       console.log(err)
    }

    return allParkingsAvailable
}

const raspBerryPiSpots = async (parkings, socket) => {
    if (parkings !== undefined && Object.keys(parkings).length > 0) {
        try {
            await mysql.connection.getConnection((err, con) => {
                try {
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
                } catch(err) {
                    console.log(err)
                } finally {
                    con.release()
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
    getParkingsLots
}