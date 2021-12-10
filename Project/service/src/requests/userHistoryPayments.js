const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const userHistoryPayments = async(req,res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.status(404).send({
                message: messageError.errorConnection
            })
        } else {
            let username = req.query.username

            con.query(`SELECT username, time, funds FROM Payment WHERE username = '${username}'`, (error, data) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                } else {
                    res.send({
                        userHistory: data,
                        status: '0'
                    })
                }
            })
            con.release()
        }
    })
}

module.exports = {
    userHistoryPayments
}