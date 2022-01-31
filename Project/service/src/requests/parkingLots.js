const axios = require('axios')
const mysql = require('../mysql/mysqlConnector')
const messageError = require('../messages/error')

const key = process.env.GOOGLE_API_KEY

const parkingLots = async (req, res) => {
    if (req.query !== undefined) {
        let userLocation = {
            lat: req.query.lat,
            lon: req.query.lon
        }
        try {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=parking+lots/&location=${userLocation.lat},${userLocation.lon}&radius=5000&key=${key}`)
            if (data !== undefined || data !== null || data !== {}) {
                await mysql.connection.getConnection((err, con) => {
                    if (err) {
                        res.send({
                            message: messageError.errorConnection
                        })
                    } else {
                        data.results.map((el) => {
                            con.query(`INSERT INTO Parking_Lots (parking_name, rating_place, lat, lng, usr_lat, usr_lng) VALUES('${el.name}', '${el.rating}', '${el.geometry.location.lat}', '${el.geometry.location.lng}', '${userLocation.lat.split('.')[0]}', '${userLocation.lon.split('.')[0]}')`, (error) => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    parkingLots
}