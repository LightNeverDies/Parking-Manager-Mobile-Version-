import React from "react"
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import Dash from 'react-native-dash';

const carImageRight = require('../../../assets/car.png')


/* might be needed for animation 
 // this.ball = new Animated.ValueXY({x: -200, y: 30})

     // moveBall = () => {
    //     const width = Dimensions.get('screen').width
    //     Animated.loop(
    //     Animated.sequence([
    //      Animated.delay(3000),
    //      Animated.timing(this.ball, {
    //          toValue: {x: width, y: 30},
    //          duration: 3000,
    //          useNativeDriver: false
    //      })
    //     ]),
    //     {
    //         iterations: 10
    //     }
    //     ).start()
    //  }

    // this.moveBall()

    // <Animated.View style={[styles.ball, this.ball.getLayout()]}/>

        ball: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
        marginBottom: 60
    },

*/

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
            iterations: 10
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
        height: 30
    },
    dashed: {
        width: Dimensions.get('screen').width,
        position: 'absolute',
    }
});


module.exports = CarLoader