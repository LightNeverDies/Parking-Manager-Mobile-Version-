// this is only for Take Now method and Maybe will contain the Extend Time method
const mysql = require('../mysql/mysqlConnector')
const moment = require("moment")
const messageError = require('../messages/error')

const userPaymentInfo = async(info, socket) => {
    await placeChecker(socket, info)
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
                    let residue = 0
                    if(balance[0].balance > 0) {
                        residue = balance[0].balance - user.funds
                    } else {
                        residue = 0
                    }

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
                    await takePlace(info.carNumber, info, socket)
                    await userBalance(info.user_price, info.type, info.username, socket)
                } else {
                    errorMessageSender(socket, messageError.errorPlaceTaken)
                    console.log(messageError.errorPlaceTaken)
                }
            }
        })
    })
}

const takePlace = async(carNumber, info, socket) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            errorMessageSender(socket, messageError.errorConnection)
            console.log(err)
        } else {
            const timeNow = moment()
            const timeExpired = moment().add(1, 'hours')
            con.query(`UPDATE Parking_Spaces SET username = '${info.username}', time_entered = '${timeNow}', time_expired = '${timeExpired}', car_number = '${carNumber}', 
            status = '${info.status}', code = '${info.code}'
            WHERE id_lots = '${info.placeId}'`, (error) => {
                if(error) {
                    console.log(error)
                    errorMessageSender(socket, messageError.errorQuery)
                } else {
                    con.query(`SELECT status, time_expired FROM Parking_Spaces WHERE username = '${info.username}' AND id_lots = '${info.placeId}'`, async(error, statusOfPlace) => {
                        if(error) {
                            console.log(error)
                            errorMessageSender(socket, messageError.errorQuery)
                        } else {
                           await timerSetup(socket,info.placeId, statusOfPlace[0].time_expired)
                           await setChangePlace(socket, statusOfPlace[0].status, info.placeId)
                        }
                    })
                }
            })
        }
    })
}

// const timerChecker = (timeEnded) => {
    //const entered = new Date().toLocaleTimeString('it-IT')
    //const ended = new Date("Wed Jun 29 2022 21:06:13 GMT+0300").toLocaleTimeString('it-IT')
//     const entered = new Date().toLocaleTimeString('it-IT')
//     const ended = new Date(timeEnded).toLocaleTimeString('it-IT')

//     const startDate = new Date()
//     const endDate = new Date()

//     startDate.setHours(startHours)
//     startDate.setMinutes(startMinutes)
//     startDate.setSeconds(startSeconds)

//     endDate.setHours(endHours)
//     endDate.setMinutes(endMinutes)
//     endDate.setSeconds(endSeconds)

//     const differenceInMilliseconds = endDate - startDate

//     return differenceInMilliseconds 
// }


const timerSetup = async(socket, placeId, timeEnded) => {

    const infoSetup = {
        placeId: placeId,
        status: true,
        duration: 3600000
    }

    socket.emit('settingTimer', infoSetup)
}

const setChangePlace = async(socket, status, placeId) => {

    const changedPlace = {
        status,
        placeId
    }

    socket.emit('changedPlace', changedPlace)
}

module.exports = {
    userPaymentInfo
}