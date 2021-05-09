import React from "react"
import {Animated, Dimensions, StyleSheet, View, Text} from 'react-native';
import Dash from 'react-native-dash';

const carImageRight = require('../../../assets/car.png')

class CarLoader extends React.Component {

    constructor(props) {
        super(props)
        this.car = new Animated.ValueXY({x: -200, y: 10})
    }

    moveCar = () => {
        const width = Dimensions.get('screen').width
        Animated.loop(
        Animated.sequence([
         Animated.delay(3000),
         Animated.timing(this.car, {
             toValue: {x: width, y: 10},
             duration: 3000,
             useNativeDriver: false
         })
        ]),
        {
            iterations: 20
        }
        ).start()
    }

    componentDidMount () {
        this.moveCar()
    }

    renderRoadDesign = () => {
        return (
            <>
                 <View style={styles.loginContainer}>
                    <Dash style={styles.dashed} dashGap={10} dashLength={10}/>
                    <Text style = {{ position: "absolute", color: 'white', fontSize: 16 }}>No Internet Connection</Text>
                    <Animated.Image source={carImageRight} style={[styles.car, this.car.getLayout()]}/>
                 </View>
            </>
        )
    }

    render ()  {
        return (
            <>
                { this.renderRoadDesign() }
            </>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        width: Dimensions.get('screen').width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth:1,
        borderTopColor: 'black'
    },
    car: {
        width: 55,
        height: 30,
    },
    dashed: {
        width: Dimensions.get('screen').width,
        position: 'absolute',
    }
});


module.exports = CarLoader