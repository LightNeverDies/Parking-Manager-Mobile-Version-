import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import React from 'react'
import SocialButton from '@src/components/SocialButtons/SocialButtons'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import ButtonComp from '@src/components/Buttons/Buttons'
import CarLoader from '@src/components/CarLoader/CarLoader'
import ConnectionChecker from '@src/components/ConnectionChecker/ConnectionChecker'
import { HelperText } from 'react-native-paper'
import { userFind } from '@src/reduxStore/login/actions/findUser'
import { Reset } from '@src/reduxStore/register/actions/Reset'
import { connect } from 'react-redux'
//import { checkInternet } from '@src/reduxStore/checkInternet/actions/checkInternet'


class LoginScreen extends React.Component {

    constructor(){
        super()
        this.state = {
            connection_status: false,
            email: '',
            password: '',
            errorStatusLogged: true
        }
    }

    componentDidMount = () => {
        //this.setState({ connection_status: this.props.check })
    }
    
    onRegister = () => {
        //if(this.state.connection_status) {
            const { navigate } = this.props.navigation
            this.props.Reset()
            navigate('Register')
        //}
    }

    onMenu = async() => {
        const { email, password } = this.state
        const { navigate } = this.props.navigation
            if(email != '' && password != '') {
                await this.props.userFind(email, password)
                if(this.props.logged == true) {
                    this.setState({ errorStatusLogged: true })
                    navigate('Menu')
                } else {
                    this.setState({ errorStatusLogged: false })
                }
            }
    }

    renderLoginScreen = () => {
        return (
            <View style={styles.loginContainer}>
                    <View style= {styles.top}></View>
                    {/* <ConnectionChecker/> */}
                    <LogoHolder source={require('../../../assets/logo.png')}/>
                <View style= {styles.container}>
                    <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Email"} keyboardType="email-address" onChangeText={value => this.setState({ email: value })}/>
                    <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Password"} secureTextEntry={true} onChangeText={value => this.setState({ password: value })}/>
                    <HelperText type="error" style={ styles.errorMessage } visible = { !this.state.errorStatusLogged }>{ this.props.error }</HelperText>
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

const styles = StyleSheet.create({
    top: {
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: '#12285c',
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
        marginTop: 140,
        marginBottom: 100
    },
})

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        logged: state.login.logged,
        username: state.login.username,
        check: state.checkInternet.status
    }
}

const mapDispatchToProps = dispatch => ({ 
    userFind: (email, password) => dispatch(userFind(email, password)),
    Reset: () => dispatch(Reset()),
    checkInternet: (netInfo) => dispatch(checkInternet(netInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)