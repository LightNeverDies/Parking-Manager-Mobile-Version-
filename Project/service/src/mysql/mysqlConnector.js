const mysql = require("mysql2")

const connection = mysql.createPool({
    host: "remotemysql.com",
    user: "dvlamvQ4xv",
    password: "HvCRKvgAtC",
    database: "dvlamvQ4xv",
    connectionLimit: 10,
})

module.exports = {
    connection
}