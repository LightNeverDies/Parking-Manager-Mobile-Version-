const mysql = require('../mysql/mysqlConnector')
const moment = require("moment")
const messageError = require('../messages/error')

const addPayment = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.status(404).send({
                message: messageError.errorConnection
            })
        } else {
            let user = {
                username: req.query.username,
                card_number: req.query.card_number,
                first_name: req.query.first_name,
                last_name: req.query.last_name,
                security_code: req.query.security_code,
                exp_date: req.query.exp_date,
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                type: req.query.type,
                funds: req.query.funds
            }

            con.query(`SELECT balance FROM User_Balance WHERE username = '${user.username}'`, (error, userBalance) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                }
                else {
                    if(userBalance.length > 0) {

                        let balance = parseInt(userBalance[0].balance) + parseInt(user.funds)
                        con.query(`UPDATE User_Balance SET balance = ${balance} WHERE username = '${user.username}'`, (error) => {
                            if(error) {
                                res.send(messageError.errorQuery)
                                console.log(error)
                            }
                        })
                    } else {
                        con.query(`INSERT INTO User_Balance (username, balance) VALUES('${user.username}', '${user.funds}')`, (error) => {
                            if(error) {
                                res.send(messageError.errorQuery)
                                console.log(error)
                            }
                        })
                    }
                    res.send({
                        username: user.username,
                        status: '0'
                    })
                }

                con.release()
            })

            con.query(`INSERT INTO Payment (username, card_number, first_name, last_name, security_code, exp_date, time, type, funds) 
            VALUES('${user.username}', '${user.card_number}', '${user.first_name}', '${user.last_name}', 
                   '${user.security_code}', '${user.exp_date}', '${user.time}', '${user.type}', '${user.funds}')`, (error) => {
                if(error) {
                    res.send(messageError.errorQuery)
                    console.log(error)
                }
                con.release()
            })
        }
    })
}

module.exports = {
    addPayment
}