import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from '@react-native-community/picker'
import SocketIOClient from 'socket.io-client'
import { selectedCar } from '@src/reduxStore/selectedCar/actions/selectedCar'
import { parkingSpaces } from '@src/reduxStore/updateParkingSpaces/actions/updateParkingSpaces'

class TakeNowMethod extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            timeLeft: '',
            noCarsMessage: 'No registered cars to the current account!',
            noCarsMessage1: 'Go to Account and make registration of your cars.'
        }
    }

    componentDidMount = () => {
        this.socket = SocketIOClient('http://192.168.0.103:8002')
        this.socket.emit("ParkingLots")
    }

    carSelector = () => {
        if(this.props.cars) {
            const allCars = Object.values(this.props.cars).map((item) => {return item.carNumber})
            return (
                <View style={styles.carSelectorStyle}>
                    <Picker
                        mode='dropdown'
                        style={{ height: 50, width: 150, color: 'white', marginTop: 10 }}
                        selectedValue={this.props.selected}
                        onValueChange={(itemValue) => {
                            this.props.selectedCar(itemValue)
                        }}
                        >  
                          <Picker.Item label='Choose Car' value = ''/>
                          <Picker.Item label={allCars[0]} value={allCars[0]}/>
                          <Picker.Item label={allCars[1]} value={allCars[1]}/>
                          <Picker.Item label={allCars[2]} value={allCars[2]}/>
                    </Picker>
                </View>
                
            )
        }
    }

    errorMessageShower = () => {
        return (
            <>
                <Text style={styles.errorMessageStyle}>{this.state.noCarsMessage} {this.state.noCarsMessage1}</Text>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.cars ? this.carSelector() :  this.errorMessageShower()} 
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 0
    },
    errorMessageStyle:{
        textAlign: 'center',
        fontSize: 20,
        color: 'red',
        margin: 10
    },
    carSelectorStyle: {
        margin: 6,
        alignItems: 'center',
        width: Dimensions.get('screen').width
    }
})

const mapStateToProps = (state) => {
    return {
        cars: state.registeredCars.cars,
        selected: state.selectedCar.selected,
        parkingsLots: state.getAllParkingsSpaces
    }
}

const mapDispatchToProps = dispatch => ({
    registeredCars: (username) => dispatch(registeredCars(username)),
    selectedCar: (carSelected) => dispatch(selectedCar(carSelected)),
    parkingSpaces: (data) => dispatch(parkingSpaces(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeNowMethod)