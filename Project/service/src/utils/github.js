const { exec } = require('child_process');
const { Console } = require('console');
const fs = require('fs');
const moment = require("moment")
const path = require('path')

exec('git log --pretty=format:%ad%n%s', (error, stdout) => {
    if(error) {
        console.log(error)
        return error
    } else {
       
        const splitByNewLine = stdout.split("\n")

        const id = []
        const update = []

        for(let i = 0; i < splitByNewLine.length; i = i+2) {
            id.push(splitByNewLine[i])
        }

        for(let i=1; i< splitByNewLine.length; i = i+2) {
            update.push(splitByNewLine[i])
        }

        const result = id.map((key, i) => {
            return {
                "id": i,
                "date": moment(new Date(key)).format('DD/MM/YYYY'),
                "update": update[i]
            }
        })

        const json = {
            "Added features": result
        }

        console.log('Getting news from github .....')

        fs.writeFileSync(path.join(__dirname, '../../..', 'src/pages/Information/information.json'), JSON.stringify(json))

        console.log('Finnished')
    }
})