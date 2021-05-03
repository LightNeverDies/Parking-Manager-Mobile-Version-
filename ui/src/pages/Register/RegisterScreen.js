import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import ButtonComp from '@src/components/Buttons/Buttons'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import forbiddenWords from '@src/config/ForbiddenNames.json'
import { HelperText } from 'react-native-paper'

class LoginScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            status: true,
            errorStatusEmail: true,
            errorMessageEmail: '',
            errorStatusPassword: true,
            errorMessagePassword: '',
            errorStatusUsername: true,
            errorMessageUsername: ''
        }
    }

    emailValidation = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(email.length != '') {
            if (reg.test(email) === false) {
                this.state.errorStatusEmail = false
                this.setState({ errorMessageEmail: 'Error: Email address is invalid.' })
            } else {
                this.setState({ email: email })
                this.state.errorStatusEmail = true
            }
            
            return true
        } else {
            this.state.errorStatusEmail = false
            this.setState({ errorMessageEmail: 'Error: Input field cannot be empty.' })
            return false
        }
    }

    passwordValidation = (password) => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if(password.length != '') {
            if(reg.test(password) === false) {
                this.state.errorStatusPassword = false
                this.setState({ errorMessagePassword: 'Error: Password is invalid. Minimum eight characters, at least one letter and one number' })
            } else {
                this.setState({ password: password })
                this.state.errorStatusPassword = true
            }
            return true
        } else {
            this.state.errorStatusPassword = false
            this.setState({ errorMessagePassword: 'Error: Input field cannot be empty.'})
            return false
        }
    }

    usernameValidation = (username) => {
        if(username.length != '' && username.length > 2) {
            if(forbiddenWords.reservedwords.includes(username)) {
                this.state.errorStatusUsername = false
                this.setState({ errorMessageUsername: 'Error: This username is forbidden' })
            } else {
                this.setState({ username: username })
                this.state.errorStatusUsername = true
            }
            return true
        } else {
            this.state.errorStatusUsername = false
            this.setState({ errorMessageUsername: 'Error: Input field needs to contains at least 3 letters.' })
            return false
        }
    }

    onNext = () => {
        const { email, password } = this.state
        // email => asadasda@abv.bg
        // password -> daddasdasdsa
        // next
        // user -> georgi
        // next -> Menu
        if(this.emailValidation(email) === true && this.passwordValidation(password) === true) {

            this.setState((prevState) => ({status: !prevState.status}))
            // Firebase.auth()
            //     .createUserWithEmailAndPassword(email, password)
            //     .then(this.setState((prevState) => ({status: !prevState.status})))
            //     .catch(error => this.setState({ errorMessageEmail: `${error}` }), this.state.errorStatusEmail = false)
        }
    }

    onMenu = () => {
        const { username } = this.state
        const { navigate } = this.props.navigation
        if(this.usernameValidation(username) === true){
            navigate('Menu')
        }
    }

    renderNextScreen = () =>{
        return (
        <View style={styles.loginContainer}>
                <LogoHolder style={styles.imageContainer} source={require('../../../assets/favicon.png')}/>
            <View style= {styles.container}>
                <View style = {styles.inputForm}>
                    <TextInput style={styles.inputField} placeholder={"Username"} onChangeText={(username) => this.usernameValidation(username)}/>
                    <HelperText type="error" style={styles.errorMessage} visible = {!this.state.errorStatusUsername}>{this.state.errorMessageUsername}</HelperText>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <ButtonComp onPress={this.onMenu}>Sign in</ButtonComp>
                </View>
                <View>
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
                    <View style = {styles.inputForm}>
                        <TextInput style={styles.inputField} placeholder={"Email"} keyboardType="email-address" onChangeText={(email) => this.emailValidation(email)}/>
                        <HelperText type="error" style={styles.errorMessage} visible = {!this.state.errorStatusEmail}>{this.state.errorMessageEmail}</HelperText>
                    </View>
                    <View style = {styles.inputForm}>
                        <TextInput style={styles.inputField} placeholder={"Password"} secureTextEntry={true} onChangeText={(password) => this.passwordValidation(password)}/>
                        <HelperText type="error" style={styles.errorMessage} visible = {!this.state.errorStatusPassword}>{this.state.errorMessagePassword}</HelperText>
                    </View>
                    <View>
                        <ButtonComp onPress={this.onNext}>Next</ButtonComp>
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
        marginBottom: 70
    },
    inputField: {
        borderRadius: 3,
        borderWidth: 0.2,
        width: "80%",
        padding: 15
    },
    container: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%"
    },
    inputForm: {
        alignItems: 'center',
        width: "80%",
        marginBottom: 30
    },
    errorMessage: {
        alignSelf: 'center',
        width: "80%"
    }
})

module.exports = LoginScreen