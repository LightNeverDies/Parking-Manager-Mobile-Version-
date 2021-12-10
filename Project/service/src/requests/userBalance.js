const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const userBalance = async(req,res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.send({
                message: messageError.errorConnection
            })
        } else {
            let username = req.query.username
            con.query(`SELECT * FROM User_Balance WHERE username = '${username}'`, (error, row) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                } 
                res.send({
                    username: row[0].username,
                    balance: row[0].balance,
                    status: '0'
                })
            })
        }
    })
}

module.exports = {
    userBalance
}