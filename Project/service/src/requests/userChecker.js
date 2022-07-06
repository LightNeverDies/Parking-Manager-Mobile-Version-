const moment = require("moment")
const mysql  = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')
const bcrypt = require("bcrypt")

const userCreated = async(req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
          res.status(404).send({
            message: messageError.errorConnection
          })
        } else {
           let user = { 
            username: req.query.username,
            password: bcrypt.hashSync(req.query.password, 10), 
            email: req.query.email,
            created: moment().format('YYYY-MM-DD HH:mm:ss')
           }
           con.query(`SELECT * FROM User WHERE email = '${user.email}' OR username = '${user.username}'`, (error, row) => {
              if(error) { 
                res.send(messageError.errorConnection)
                console.log(error)
                return error
              }
              
              if(row.length > 0) {
                if(user.username) {
                  res.json({
                    data: row,
                    status: '1',
                    error: messageError.errorUsername })
                } else {
                  res.json({
                    data: row,
                    status: '1',
                    error: messageError.errorEmail })
                }
                 con.release()
              }
              else {
                con.query(`INSERT INTO User (username, email, password, created) 
                VALUES('${user.username}', '${user.email}', '${user.password}', '${user.created}')`, (error) => {
                  if(error) {
                    res.send(messageError.errorQuery)
                    return error
                  } else {
                    res.json({
                      username: user.username,
                      status: '0',
                    })
                  }
                  con.release()
                })
              }
            })
          }
        })
}



module.exports = {
    userCreated
}