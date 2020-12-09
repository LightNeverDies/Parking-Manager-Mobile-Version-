import React from "react"
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import Dash from 'react-native-dash';

class CarLoader extends React.Component {

    constructor(props) {
        super(props)
        this.ball = new Animated.ValueXY({x: -200, y: 30})
    }

    moveBall = () => {
        const width = Dimensions.get('screen').width
        Animated.loop(
        Animated.sequence([
         Animated.delay(3000),
         Animated.timing(this.ball, {
             toValue: {x: width, y: 30},
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
        this.moveBall()
    }

    renderCarDesign = () => {
        return (
            <>
                <Animated.View style={[styles.ball, this.ball.getLayout()]}/>
            </>
        )
    }

    renderRoadDesign = () => {
        return (
            <>
                 <View style={styles.loginContainer}>
                    <Dash style={styles.dashed} dashGap={10} dashLength={10}/>
                    <Animated.View style={[styles.ball, this.ball.getLayout()]}/>
                 </View>
            </>
        )
    }

    render ()  {
        return (
            <>
                {this.renderRoadDesign() }
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
    ball: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
        marginBottom: 60
    },
    dashed: {
        width: Dimensions.get('screen').width,
        position: 'absolute',
    }
});


module.exports = CarLoader