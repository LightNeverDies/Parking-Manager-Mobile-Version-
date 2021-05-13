const mysql  = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')


const userInformation = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.status(404).send({
                message: messageError.errorConnection
            })
        } else {
            let username = req.query.username
            con.query(`SELECT * FROM User WHERE username = '${username}'`, (error, row) => {
                if(error) {
                    res.send(messageError.errorConnection)
                    console.log(error)
                    return error
                }
                if(row.length > 0) {
                    res.send({
                        username: row[0].username,
                        email: row[0].email,
                        dataCreated: row[0].created
                    })
                }
                else {
                    res.status(400).send({
                        error: messageError.errorUserInformation
                    })
                }
            })
        }
    })
}

module.exports = {
    userInformation
}