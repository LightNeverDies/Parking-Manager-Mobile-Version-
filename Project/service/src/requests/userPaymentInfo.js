const mysql = require('../mysql/mysqlConnector')
const moment = require("moment")
const messageError = require('../messages/error')

const userPaymentInfo = async(info, socket) => {
    // await placeChecker(socket, info)
    const placeTaken = "Taken"

    const infoSetup = {
        placeId: info.placeId,
        status: true,
        duration: 3600000

    }
    await timerSetup(socket, infoSetup)
    await setChangePlace(socket, placeTaken, info.placeId)

    await errorMessageSender(socket, 'Place is already taken')
}

const errorMessageSender = (socket, error) => {
    socket.emit('errorMessage', error)
}

const userBalance = async(funds, type, username, socket) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            errorMessageSender(socket, messageError.errorConnection)
            console.log(err)
        } else {
            let user = {
                username: username,
                type: type,
                funds: funds,
                time: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            con.query(`SELECT balance FROM User_Balance WHERE username='${user.username}'`, (error, balance) =>{
                if(error) {
                    errorMessageSender(socket, messageError.errorQuery)
                    console.log(error)
                } else {
                    const residue = balance[0].balance - user.funds

                    con.query(`UPDATE User_Balance SET balance= ${residue} WHERE username = '${user.username}'`, (error) => {
                        if(error) {
                            errorMessageSender(socket, messageError.errorQuery)
                            console.log(error)
                        }
                    })
                }
                con.release()
            })

            con.query(`INSERT INTO Payment (username, time, type, funds) 
            VALUES('${user.username}', '${user.time}', '${user.type}', '${user.funds}')`, (error) => {
                if(error) {
                    errorMessageSender(socket, messageError.errorQuery)
                    console.log(error)
                }

                con.release()
            })
        }
    })
}

const placeChecker = async(socket, info) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            errorMessageSender(socket, messageError.errorConnection)
            console.log(err)
        }
        con.query(`SELECT status FROM Parking_Spaces WHERE id_lots= '${info.placeId}'`, async(error, placeInfo) => {
            if(error) {
                errorMessageSender(socket, messageError.errorQuery)
                console.log(error)
            } else {
                if(placeInfo[0].status === info.placeStatus) {
                    await takePlace(info.carNumber, info.placeId, info.username, socket)
                    await userBalance(info.user_price, info.type, info.username, socket)
                } else {
                    errorMessageSender(socket, messageError.errorPlaceTaken)
                    console.log(messageError.errorPlaceTaken)
                }
            }
        })
    })
}

const takePlace = async(carNumber, placeId, username, socket) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            errorMessageSender(socket, messageError.errorConnection)
            console.log(err)
        } else {
            const timeNow = moment()
            const timeExpired = moment().add(1, 'hours')
            const placeStatus = "Taken"
            const code = "#bc0000"
            con.query(`UPDATE Parking_Spaces SET username = '${username}', time_entered = '${timeNow}', time_expired = '${timeExpired}', car_number = '${carNumber}', 
            status = '${placeStatus}', code = '${code}'
            WHERE id_lots = '${placeId}'`, (error) => {
                if(error) {
                    console.log(error)
                    errorMessageSender(socket, messageError.errorQuery)
                } else {
                    con.query(`SELECT status FROM Parking_Spaces WHERE username = '${username}' AND id_lots = '${placeId}'`, (error, statusOfPlace) => {
                        if(error) {
                            console.log(error)
                            errorMessageSender(socket, messageError.errorQuery)
                        } else {
                            //timerSetup(socket, placeId, timeNow, timeExpired)
                            //changePlace(socket, statusOfPlace[0].status, placeId)
                        }
                    })
                }
            })
        }
    })
}

const timerSetup = (socket, infoSetup) => {
    socket.emit('settingTimer', infoSetup)
}

const setChangePlace = (socket, status, placeId) => {

    const changedPlace = {
        status,
        placeId
    }

    socket.emit('changedPlace', changedPlace)
}

module.exports = {
    userPaymentInfo
}