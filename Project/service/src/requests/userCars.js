const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const userCars = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.json({
                message: messageError.errorConnection
            })
        } else {

            let user = {
                username: req.query.username,
                carNumber: req.query.carNumber,
                checked: req.query.checked
            }
            con.query(`SELECT carNumber FROM User_Cars WHERE username='${user.username}'`, (error, result) => {
                if(error) {
                    res.json(messageError.errorConnection)
                    console.log(error)
                    return error
                }

                if(result.length >= 3) {
                    res.json({
                        status: '1',
                        error: messageError.errorCarsLimit
                    })
                } else {
                    con.query(`SELECT * FROM User_Cars WHERE carNumber = '${user.carNumber}'`, (error, result) => {
                        if(error) {
                            res.send(messageError.errorConnection)
                            console.log(error)
                            return error
                        } 
                        if(result.length > 0) {
                            res.json({
                                status: '1',
                                error: messageError.errorCarExists
                            })
                        } else {
                            con.query(`INSERT INTO User_Cars (username, carNumber, disabledParkingSpace) VALUES('${user.username}', '${user.carNumber}', '${user.checked}')`, (error) => {
                                if(error) {
                                    res.send(messageError.errorQuery)
                                    console.log(error)
                                } else {
                                    res.json({
                                        status: '0'
                                    })
                                }
                                con.release()
                            })
                        }
                    })
                }
                con.release()
            })
        }
    })
}

module.exports = {
    userCars
}