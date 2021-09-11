import React from 'react'
import { StyleSheet, View } from 'react-native'
import Card from '@src/components/Card/Card'


class Parking extends React.Component {
    constructor() {
        super()
        this.state = {
            active: false
        }

    }

    spawnCard = () => {
        // dummy data
       const parkingSpaces = [
            {
              parkSpace: 1,
              carNumber: "B 2716 TC",
              isFreeSpace: 0,
            },
            {
              parkSpace: 2,
              carNumber: "CO 5555 KP",
              isFreeSpace: 0,
            },
            {
              parkSpace: 3,
              carNumber: "PP 1231 RF",
              isFreeSpace: 0,
            },
            {
              parkSpace: 4,
              carNumber: "",
              isFreeSpace: 1,
            },
            {
              parkSpace: 5,
              carNumber: "GG 1231 RF",
              isFreeSpace: 0,
            },
            {
              parkSpace: 6,
              carNumber: "",
              isFreeSpace: 1,
            },
            {
              parkSpace: 7,
              carNumber: "",
              isFreeSpace: 1,
            },
            {
              parkSpace: 8,
              carNumber: "",
              isFreeSpace: 1,
            },
            {
              parkSpace: 9,
              carNumber: "",
              isFreeSpace: 1,
            },
            {
              parkSpace: 10,
              carNumber: "",
              isFreeSpace: 1,
            },
          ]
          return (
            <Card information={parkingSpaces} active={this.state.active} onPress= {this.onChangeIcon}></Card>
          )

    }

    onChangeIcon = () => {
        this.state.active === false ? this.setState({ active: true }) : this.setState({ active: false })
        return this.state.active
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', width: "100%"}}>
                {this.spawnCard()}
            </View>
        )
    }

}
const styles = StyleSheet.create({
        
})

module.exports = Parking