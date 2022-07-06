import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { HelperText } from 'react-native-paper'
import ButtonHub from '@src/components/ButtonImage/ButtonImage'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import BottomNavBar from '@src/components/BottomNavBar/BottomNavBar'
import Information from '../Information/Information'
import Account from '../Account/Account'
import Parking from '../Parking/Parking'
import Payment from '../Payment/Payment'

import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { userBalance } from '@src/reduxStore/userBalance/actions/userBalance'
import { connect } from 'react-redux'
import MapView, { Callout, Marker } from 'react-native-maps'
import { setUserLocation } from '@src/reduxStore/parkingLots/actions/setUserLocation'
import { getParkings } from '@src/reduxStore/getParkings/actions/getParkings'
import * as Location from 'expo-location'


class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            active: 0,
            time: new Date().toLocaleString(),
            currLocation: null,
            setError: true,
            error: '',
            poi: null,
            regionName: null
        }
    }

    onPoiClick = (e) => {
        let poi = e.nativeEvent
        if (poi != undefined) {
            this.setState({ poi })
        }
    }

    componentDidMount = async () => {
        
        this.intervalID = setInterval(() => this.setState({ time: new Date().toLocaleString() }), (1000))
        this.props.userBalance(this.props.username)
        let status = await Location.requestForegroundPermissionsAsync({})
        if (status.granted !== true) {
            this.setState({ error: 'Permission to access location was denied' })
        } else {
            let location = await Location.getCurrentPositionAsync()
            // only when Needed it's getting all parking Lots around the user at radius 5 km
            //this.props.setUserLocation(location.coords.latitude, location.coords.longitude)
            this.props.getParkings(location.coords.latitude, location.coords.longitude)
            let regionName = await Location.reverseGeocodeAsync({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            })
            this.setState({ error: '' })
            this.setState({
                currLocation: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            })
            this.setState({
                regionName: regionName[0].city
            })
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalID)
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
                    <View style={styles.mainContainer}>
                        {this.renderHomeScreen()}
                        {this.renderMap()}
                    </View>
                )
        }
    }

    renderMap = () => {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ width: Dimensions.get('screen').width, height: 400 }}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    initialRegion={this.state.currLocation}
                    onPoiClick={this.onPoiClick}>
                    {this.state.poi && (
                        <Marker coordinate={this.state.poi.coordinate}>
                            <Callout tooltip={true}>
                                <View style={styles.bubble}>
                                    <Text>Name: {this.state.poi.name}</Text>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </Callout>
                        </Marker>
                    )}
                    { this.props.parkings > 0 ?
                        this.props.markers.map((el) => {
                            return (<Marker key={el.id} coordinate={{ latitude: +el.lat, longitude: +el.lng }} 
                            title={el.parking_name}
                            description={`Rating ${el.rating_place}`}
                            >
                                <MaterialCommunityIcons name="parking"
                                color={'red'}
                                size={26} />
                            </Marker>)
                        })
                        : null
                    }
                </MapView>
            </View>
        )
    }
    renderHomeScreen = () => {
        return (
            <View style={{ flex:1 }}>
                <Text style={styles.text}>{this.state.time}</Text>
                <Text style={styles.text}>Parking Lots available: {this.props.parkings}</Text>
                {this.state.error ? <HelperText type="error" style={styles.errorMessage} visible = {this.state.error}>{this.state.error}</HelperText> : null}
            </View>
        )
    }
    logOut = () => {
        const { navigate } = this.props.navigation
        AsyncStorage.removeItem('token')
        navigate('Login')
    }

    renderMainScreen = () => {
        return (
            <View style={styles.loginContainer} >
                <View style={styles.top}>
                    <Text style={{ color: "white", marginTop: 10, flex: 1, textAlign: 'center' }}> Welcome {this.props.username}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <ButtonHub onPress={this.logOut}>
                            <MaterialIcons name="exit-to-app" size={30} color="white" />
                        </ButtonHub>
                    </View>
                </View>
                <LogoHolder source={require('../../../assets/logo.png')} />
                {this.renderMainContainer(this.state.active)}

                <View style={styles.navbarBottom}>

                    <BottomNavBar onPress={() => { this.setState({ active: 0 }) }}>
                        <View>
                            <MaterialCommunityIcons name="home"
                                color={this.state.active === 0 ? 'red' : 'white'}
                                size={34} />
                            <Text style={styles.textStyle}>Home</Text>
                        </View>
                    </BottomNavBar>

                    <BottomNavBar onPress={() => { this.setState({ active: 1 }) }}>
                        <View>
                            <MaterialCommunityIcons name="parking"
                                color={this.state.active === 1 ? 'red' : 'white'}
                                size={34} />
                            <Text style={styles.textStyle}>Parking</Text>
                        </View>
                    </BottomNavBar>

                    <BottomNavBar onPress={() => { this.setState({ active: 2 }) }}>
                        <View>
                            <Ionicons name="ios-information-circle"
                                color={this.state.active === 2 ? 'red' : 'white'}
                                size={34} />
                            <Text style={styles.textStyle}>Info</Text>
                        </View>
                    </BottomNavBar>

                    <BottomNavBar onPress={() => { this.setState({ active: 3 }) }}>
                        <View>
                            <MaterialIcons name="payment"
                                color={this.state.active === 3 ? 'red' : 'white'}
                                size={34} />
                            <Text style={styles.textStyle}>Payment</Text>
                        </View>
                    </BottomNavBar>

                    <BottomNavBar onPress={() => { this.setState({ active: 4 }) }}>
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
        return (
            <>
                {this.renderMainScreen()}
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
        flex: 1,
        borderColor: 'white',
        borderWidth: 0.2,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingBottom: 300
    },
    loginContainer: {
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#2A303E',
        marginTop: 30,
        bottom: 0,
        top: 0
    },
    navbarBottom: {
        width: Dimensions.get('window').width,
        backgroundColor: "#12285c",
        height: 60,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center'
    },
    bubble: {
        width: 160,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#4da2ab',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#4da2ab',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
    },
    errorMessage: {
        textAlign: 'center',
        width: '100%'
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        parkings: state.getParkings.parkings,
        markers: state.getParkings.markers
    }
}

const mapDispatchToProps = dispatch => ({
    userBalance: (username) => dispatch(userBalance(username)),
    setUserLocation: (lat, lon) => dispatch(setUserLocation(lat, lon)),
    getParkings: (lat, lon) =>  dispatch(getParkings(lat, lon))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)