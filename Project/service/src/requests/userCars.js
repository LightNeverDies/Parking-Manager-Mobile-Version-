const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const userCars = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.send({
                message: messageError.errorConnection
            })
        } else {
            let user = {
                username: req.query.username,
                carNumber: req.query.carNumber
            }
            con.query(`SELECT carNumber FROM User_Cars WHERE username='${user.username}'`, (error, result) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                    return error
                }

                if(result.length >= 3) {
                    res.send({
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
                            res.send({
                                status: '1',
                                error: messageError.errorCarExists
                            })
                        } else {
                            con.query(`INSERT INTO User_Cars (username, carNumber) VALUES('${user.username}', '${user.carNumber}')`, (error) => {
                                if(error) {
                                    res.send(messageError.errorQuery)
                                    console.log(error)
                                } else {
                                    res.send({
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