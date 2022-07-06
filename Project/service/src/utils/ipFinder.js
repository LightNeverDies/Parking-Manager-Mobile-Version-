const os = require('os')

const ipFinder = async() => {
    const userNetwork = os.networkInterfaces()

    const findNetwork = userNetwork.Ethernet.filter((element) => {
        return element.family === 'IPv4'
    })
    
    const getIpAddress = findNetwork[0]['address']

    return getIpAddress
}

module.exports = {
    ipFinder
}