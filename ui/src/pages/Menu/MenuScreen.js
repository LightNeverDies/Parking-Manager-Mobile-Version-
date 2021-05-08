import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
// import CarLoader from '@src/components/CarLoader/CarLoader'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import MenuButtons from '@src/components/MenuButtons/MenuButtons'
import { connect } from 'react-redux'

class Main extends React.Component {
    constructor(){
        super()
    }

    renderMainScreen = () => {
        const { navigate } = this.props.navigation
        return(
            <View style={styles.loginContainer} >
                <Text>{this.props.user}</Text>
                <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style={styles.menuContainer}>
                    <View style={styles.rowLeft}>
                        <MenuButtons onPress= { () => navigate('Account')} styles = {styles.menuButtonsLeft} source={require('../../../assets/CardDesign/CardDesign-Account.png')}>Account</MenuButtons>
                        <MenuButtons onPress= { () => navigate('Parking')} styles = {styles.menuButtonsRight} source={require('../../../assets/CardDesign/CardDesign-Parking.png')}>Parking</MenuButtons>
                    </View>
                    <View style={styles.rowRight}>
                        <MenuButtons onPress= { () => navigate('Payment')} styles = {styles.menuButtonsLeft} source={require('../../../assets/CardDesign/CardDesign-Payment.png')}>Payment</MenuButtons>
                        <MenuButtons onPress= { () => navigate('Statistic')} styles = {styles.menuButtonsRight} source={require('../../../assets/CardDesign/CardDesign-Statistics.png')}>Statistics</MenuButtons>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <>
            { this.renderMainScreen() }
            </>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    menuButtonsLeft: {
        width: 200,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    menuButtonsRight: {
        width: 200,
        height: 80,
        margin: 10,
        marginTop: 70,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rowLeft: {
        flexDirection: 'row'
    },
    rowRight: {
        flexDirection: 'row'
    },
    menuContainer: {
        flex: 2,
        justifyContent: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.register.username
    }
}

export default connect(mapStateToProps, null)(Main)