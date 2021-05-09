const mysql = require("mysql")

const connection = mysql.createPool({
    host: "remotemysql.com",
    user: "dvlamvQ4xv",
    password: "HvCRKvgAtC",
    database: "dvlamvQ4xv"
})

module.exports = {
    connection
}