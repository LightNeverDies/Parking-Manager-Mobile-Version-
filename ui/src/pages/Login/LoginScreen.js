import { StyleSheet, View, TextInput, Button } from 'react-native'
import React from 'react'
import SocialButton from '@src/components/SocialButtons/SocialButtons'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import ButtonComp from '@src/components/Buttons/Buttons'

class LoginScreen extends React.Component {
    constructor(){
        super()
    }

    renderLoginScreen = () => {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.loginContainer}>
                    <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style= {styles.container}>
                    <TextInput style={styles.inputField} placeholder={"Email"} keyboardType="email-address" onChangeText={value => this.setState({ email: value })}/>
                    <TextInput style={styles.inputField} placeholder={"Password"} secureTextEntry={true} onChangeText={value => this.setState({ password: value })}/>
                    <View style={styles.containerButton}>
                        <ButtonComp onPress={ () => navigate('Menu')}>Sign in</ButtonComp>
                        <ButtonComp styles={{ backgroundColor: '#00a2de' }} onPress={ () => navigate('Register')}>Sign up</ButtonComp>
                    </View>
                    <View style={styles.containerSocial}>
                        <SocialButton>Login with Facebook</SocialButton>
                    </View>
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
    loginContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 150
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
        borderWidth: 0.2,
        width: "80%",
        padding: 15,
        marginBottom: 30,
    },
    container: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%"
    },
    containerSocial: {
        marginTop: 30
    }
})

module.exports = LoginScreen