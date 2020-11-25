import { StyleSheet, View, TextInput  } from 'react-native'
import React from 'react'
import ButtonComp from '../../components/Buttons/Buttons'
import SocialButton from '../../components/SocialButtons/SocialButtons'
import LogoHolder from '../../components/LogoHolder/LogoHolder'

class LoginScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            status: true
        }
    }

    onLogin = () => {
        alert("OK")
    }

    onNext = () => {
        this.setState((prevState) => ({ status: !prevState.status }))
    }

    
    renderNextScreen = () =>{
        return (
        <View style={styles.loginContainer}>
                <LogoHolder style={styles.imageContainer} source={require('../../../assets/favicon.png')}/>
            <View style= {styles.container}>
                <TextInput style={styles.inputField} placeholder={"Username"}  onChangeText={value => this.setState({ username: value })}/>
                <View>
                    <ButtonComp onPress={this.onLogin}>Login</ButtonComp>
                    <ButtonComp onPress={this.onNext}>Back</ButtonComp>
                </View>
            </View>
        </View>
        )
    }

    renderLoginScreen = () => {
        return (
            <View style={styles.loginContainer}>
                    <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style= {styles.container}>
                    <TextInput style={styles.inputField} placeholder={"Email"} keyboardType="email-address" onChangeText={value => this.setState({ email: value })}/>
                    <TextInput style={styles.inputField} placeholder={"Password"} secureTextEntry={true} onChangeText={value => this.setState({ password: value })}/>
                    <View>
                        <ButtonComp onPress={this.onNext}>Next</ButtonComp>
                    </View>
                    <View>
                    <SocialButton>Login with Facebook</SocialButton>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const newStatus = this.state
    return (
        <>
         {newStatus.status ? this.renderLoginScreen() : this.renderNextScreen()}
        </>
    )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        height: "80%",
    },
    inputField: {
        borderRadius: 3,
        borderWidth: 0.2,
        width: "80%",
        padding: 15,
        marginBottom: 20,
    },
    container: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        height: "60%",
        width: "100%"
    }
})

module.exports = LoginScreen