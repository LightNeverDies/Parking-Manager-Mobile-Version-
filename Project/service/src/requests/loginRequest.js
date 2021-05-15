const mysql  = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const loginRequest = async (req, res) => {
    const secret = "parkingManager"
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.status(404).send({
              message: messageError.errorConnection
            })
        } else {
            let email = req.body.email
            let password = req.body.password
            con.query(`SELECT * FROM User WHERE email = '${email}'`, (err, row) => {
                if(err) {
                    res.send(messageError.errorConnection)
                }
                if(row.length < 0) {
                    return res.status(400).send('The user not found')
                }
                if(row.length > 0 && bcrypt.compareSync(password, row[0].password)){
                    const token = jwt.sign({
                        username: row[0].username
                    }, secret, {
                        expiresIn: '1d'
                    })
                    res.status(200).send({
                        logged: true,
                        username: row[0].username,
                        token: token
                    })
                } else {
                    res.status(400).send({
                        logged: false,
                        error: messageError.errorUserLogged
                    })
                }
            })
        }
    })
}


module.exports = {
    loginRequest
}