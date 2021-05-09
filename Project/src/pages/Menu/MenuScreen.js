import React from 'react'
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar'

import Information from '../Information/Information'
import Account from '../Account/Account'
import Parking from '../Parking/Parking'
import Payment from '../Payment/Payment'

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
                <Main></Main>   
        }
    }
   
    renderMainScreen = () => {
        return(
            <View style={styles.loginContainer} >
                <View style= {styles.top}>
                    <Text style={{ color: "white", marginTop: 10 }}> Welcome {this.props.user}</Text>
                </View>
                <View style = {{ flex:1 }} >
                    <LogoHolder source={require('../../../assets/favicon.png')}/>
                </View>
                <ScrollView style = {styles.mainContainer}>
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
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: '#12285c',
        alignItems: 'center',
    },
    mainContainer: {
        height: "70%",
        width: '100%',
        borderColor: 'white',
        borderWidth: 0.2,
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
        user: state.register.username
    }
}

export default connect(mapStateToProps, null)(Main)