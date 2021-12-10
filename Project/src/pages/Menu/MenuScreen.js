import React from 'react'
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native'
import ButtonHub from '@src/components/ButtonImage/ButtonImage'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import BottomNavBar from '@src/components/BottomNavBar/BottomNavBar'
import Information from '../Information/Information'
import Account from '../Account/Account'
import Parking from '../Parking/Parking'
import Payment from '../Payment/Payment'

import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'


class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            active: ''
        }
    }

    renderMainContainer = (active) => {
        switch (active) {
            case 1:
                return (
                    <Parking></Parking>
                )
             case 2:
                return (
                    <Information></Information>
                )
            case 3:
                return (
                    <Payment></Payment>
                )
            case 4:
                return (
                    <Account></Account>
                )
            default:
                return (
                    <>
                        {this.renderHomeScreen()}
                    </>
                ) 
        }
    }

    renderHomeScreen = () => {
        return (
            <Text>Home Page</Text>
        )
    }
    logOut = () => {
        const { navigate } = this.props.navigation
        AsyncStorage.removeItem('token')
        navigate('Login')
    }
   
    renderMainScreen = () => {
        return(
            <View style={styles.loginContainer} >
                <View style= {styles.top}>
                    <Text style={{ color: "white", marginTop: 10, flex: 1, textAlign: 'center' }}> Welcome {this.props.user}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <ButtonHub  onPress = { this.logOut }>
                            <MaterialIcons name="exit-to-app" size={30} color="white" />
                        </ButtonHub>
                    </View>
                </View>
                <LogoHolder source={require('../../../assets/favicon.png')}/>
                <ScrollView style={styles.mainContainer}>
                    {this.renderMainContainer(this.state.active)}
                </ScrollView>
                <View style = {styles.navbarBottom}>

                <BottomNavBar onPress = {() => {this.setState({ active: 0 })} }>
                    <View>
                        <MaterialCommunityIcons name="home" 
                        color={this.state.active === 0 ? 'red' : 'white'} 
                        size={34} />
                        <Text style={styles.textStyle}>Home</Text>
                    </View>
                  </BottomNavBar>

                  <BottomNavBar onPress = {() => {this.setState({ active: 1 })} }>
                    <View>
                        <MaterialCommunityIcons name="parking" 
                        color={this.state.active === 1 ? 'red' : 'white'} 
                        size={34} />
                        <Text style={styles.textStyle}>Parking</Text>
                    </View>
                  </BottomNavBar>

                  <BottomNavBar onPress = {() =>  {this.setState({ active: 2 })} }>
                    <View>
                        <Ionicons name="ios-information-circle" 
                        color={this.state.active === 2 ? 'red' : 'white'} 
                        size={34} />
                        <Text style={styles.textStyle}>Info</Text>
                    </View>
                  </BottomNavBar>

                  <BottomNavBar onPress = {() =>  {this.setState({ active: 3 })} }>
                    <View>
                        <MaterialIcons name="payment" 
                        color={this.state.active === 3 ? 'red' : 'white'} 
                        size={34} />
                        <Text style={styles.textStyle}>Payment</Text>
                    </View>
                  </BottomNavBar>

                  <BottomNavBar onPress = {() =>  {this.setState({ active: 4 })} }>
                    <View>
                        <MaterialCommunityIcons name="account" 
                        color={this.state.active === 4 ? 'red' : 'white'} 
                        size={34} />
                        <Text style={styles.textStyle}>Account</Text>
                    </View>
                  </BottomNavBar>
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
    textStyle: {
        color: 'white',
        textAlign: 'center', 
        fontSize: 10
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: '#12285c',
    },
    mainContainer: {
        flex:1,
        borderColor: 'white',
        borderWidth: 0.2,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingBottom: 300
    },
    loginContainer: {
        flex:1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#2A303E',
        marginTop: 30
    },
    navbarBottom: {
        width: Dimensions.get('window').width,
        backgroundColor: "#12285c",
        height: 60,
        flexDirection: 'row'
    },

})

const mapStateToProps = (state) => {
    return {
        user: state.login.username
    }
}

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)