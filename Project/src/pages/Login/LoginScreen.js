import { StyleSheet, View, TextInput, Dimensions, Text } from 'react-native'
import React from 'react'
import SocialButton from '@src/components/SocialButtons/SocialButtons'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import ButtonComp from '@src/components/Buttons/Buttons'
import NetInfo from '@react-native-community/netinfo'
import CarLoader from '@src/components/CarLoader/CarLoader'
import { Reset } from '@src/reduxStore/register/actions/Reset'
import { connect } from 'react-redux'

class LoginScreen extends React.Component {

    NetInfoSubscription = null

    constructor(){
        super()
        this.state = {
            connection_status: false
        }
    }

    componentDidMount() {
        this.NetInfoSubscription = NetInfo.addEventListener(
            this.handleConnectivityChange
        )
    }

    handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected })
    }

    componentWillUnmount() {
        this.NetInfoSubscription && this.NetInfoSubscription()
    }


    onRegister = () => {
        if(this.state.connection_status) {
            const { navigate } = this.props.navigation
            this.props.Reset()
            navigate('Register')
        }
    }

    onMenu = () => {
        if(this.state.connection_status) {
            const { navigate } = this.props.navigation
            navigate('Menu')
        }
    }
    renderLoginScreen = () => {
        return (
            <View style={styles.loginContainer}>
                    <View style= {styles.top}></View>
                    <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style= {styles.container}>
                    <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Email"} keyboardType="email-address" onChangeText={value => this.setState({ email: value })}/>
                    <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Password"} secureTextEntry={true} onChangeText={value => this.setState({ password: value })}/>
                    <View style={styles.containerButton}>
                        <ButtonComp onPress={ this.onMenu }>Sign in</ButtonComp>
                        <ButtonComp styles={{ backgroundColor: '#00a2de' }} onPress={ this.onRegister }>Sign up</ButtonComp>
                    </View>
                        <SocialButton>Login with Facebook</SocialButton>
                        {this.state.connection_status ? <View/> : <CarLoader></CarLoader>}
                </View>
            </View>
        )
    }

    render() {
    return (
        <>
         {this.renderLoginScreen()}
        </>
    )
    }
}
// #12285c
// #00a2de
const styles = StyleSheet.create({
    top: {
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: '#12285c'
    },
    loginContainer: {
        flex:2,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#2A303E',
        marginTop: 30
    },
    containerButton: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#00a2de',
        borderRadius: 8
    },
    inputField: {
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: 0.2,
        color: 'white',
        width: "80%",
        padding: 15,
        marginBottom: 30,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%",
        marginBottom: 70
    },
})

const mapDispatchToProps = dispatch => ({ 
    Reset: () => dispatch(Reset())
})

export default connect(null, mapDispatchToProps)(LoginScreen)