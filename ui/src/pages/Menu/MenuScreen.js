import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CarLoader from '@src/components/CarLoader/CarLoader'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import MenuButtons from '@src/components/MenuButtons/MenuButtons'

class Main extends React.Component {
    constructor(){
        super()
    }

    renderMainScreen = () => {
        return(
            <View style={styles.loginContainer} >
                <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style={styles.row}>
                    <MenuButtons>Account</MenuButtons>
                    <MenuButtons>Parking</MenuButtons>
                </View>
                <View style={styles.row}>
                    <MenuButtons>Payment</MenuButtons>
                    <MenuButtons>Statistics</MenuButtons>
                </View>
            </View>
        )
    }

    render() {
        return(
            <>
            { this.renderMainScreen() }
              <CarLoader/>
            </>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    row:{
        flexDirection: 'row',
        margin: 10
    }
})

module.exports = Main