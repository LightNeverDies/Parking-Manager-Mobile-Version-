const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const userRegisteredCars = async (req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
            res.send({
                message: messageError.errorConnection
            })
        } else {
            let username = req.query.username
            con.query(`SELECT carNumber FROM User_Cars WHERE username ='${username}'`, (error, result) => {
              if(error) {
                  res.send(messageError.errorConnection)
                  console.log(error)
                  return error
              }

              if(result.length > 0) {
                  res.send({
                      status: '0',
                      cars: result,
                      items: result.length
                  })
              } else {
                  res.send({
                    status: '1',
                    error: messageError.errorNoInformation
                  })
              }
            })
        }
    })
}

module.exports = {
    userRegisteredCars
}