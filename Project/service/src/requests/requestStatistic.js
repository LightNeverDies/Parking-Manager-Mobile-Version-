const mysql  = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')
const moment = require("moment")

const rqStatistic = async (req, res) => {
    await mysql.connection.getConnection((err, con) => {
        if(err) {
          res.status(404).send({
            message: messageError.errorConnection
          })
        } else {
            con.query('SELECT * FROM User', (error, row) => {
              if(error) {
                res.send(messageError.errorConnection)
                console.log(error)
                return error
              } else {

                const groupsByDate = row.reduce((groups, date) => {
                  const D = moment(date.created).format('MM/YYYY')
                  if (!groups[D]) {
                      groups[D] = [];
                    }
                  groups[D].push(date);
                  return groups
                }, {})
          
                const groupArrays = Object.keys(groupsByDate).map((date) => {
                  return {
                    date,
                    count: groupsByDate[date].length
                  };
                });
                res.send({
                  data: groupArrays
                })
              }
            })
        } 
    })
}

module.exports = {
    rqStatistic
}