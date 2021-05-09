import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import React from 'react'
import ButtonComp from '@src/components/Buttons/Buttons'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import forbiddenWords from '@src/config/ForbiddenNames.json'
import { HelperText } from 'react-native-paper'
import { addUser } from '@src/reduxStore/register/actions/addUser'
import { connect } from 'react-redux'

class RegisterScreen extends React.Component {
    constructor(props){
        super(props)
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
            if(forbiddenWords.reservedwords.includes(username.toLowerCase())) {
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
    
    onNext = async() => {
        const { email, password } = this.state
        if(this.emailValidation(email) == true || this.passwordValidation(password) == true) {
            await this.setState((prevState) => ({status: !prevState.status}))
        }
    }

    onLogin = async() => {
        const { navigate } = this.props.navigation
        navigate('Login')
    }
    
    AddUser = async () => {
        const { navigate } = this.props.navigation
        if(this.props.status == '0') {
            await this.setState({ errorStatusEmail: true })
            navigate('Login')
        } else {
            await this.setState({ errorStatusEmail: false })
        }
    }

    onMenu = async() => {
        const { username, email, password } = this.state
        if(this.usernameValidation(username) == true){
            await this.props.addUser(username, password, email)
            await this.AddUser()
        }
    }

    renderNextScreen = () =>{
        return (
        <View style={ styles.loginContainer }>
                <View style= {styles.top}></View>
                <LogoHolder style={ styles.imageContainer } source={ require('../../../assets/favicon.png') }/>
            <View style= { styles.container }>
                <View style = { styles.inputForm }>
                    <TextInput style={ styles.inputField } placeholderTextColor="white" placeholder={"Username"} onChangeText={(username) => this.usernameValidation(username)}/>
                    <HelperText type="error" style={ styles.errorMessage } visible = { !this.state.errorStatusUsername }>{ this.state.errorMessageUsername }</HelperText>
                </View>
                <View style={{ marginBottom: 20 }}>
                <HelperText type="error" style={ styles.errorMessage } visible = { !this.state.errorStatusEmail }>{ this.props.error }</HelperText>
                    <ButtonComp onPress={ this.onMenu }>Sign in</ButtonComp>
                </View>
                <View>
                    <ButtonComp onPress={ this.onLogin }>Go To Login</ButtonComp>
                </View>
            </View>
        </View>
        )
    }

    renderLoginScreen = () => {
        return (
            <View style={styles.loginContainer}>
                    <View style= {styles.top}></View>
                    <LogoHolder source={require('../../../assets/favicon.png')}/>
                <View style= {styles.container}>
                    <View style = {styles.inputForm}>
                        <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Email"} keyboardType="email-address" onChangeText={(email) => this.emailValidation(email)}/>
                        <HelperText type="error" style={styles.errorMessage} visible = {!this.state.errorStatusEmail}>{this.state.errorMessageEmail}</HelperText>
                    </View>
                    <View style = {styles.inputForm}>
                        <TextInput style={styles.inputField} placeholderTextColor="white" placeholder={"Password"} secureTextEntry={true} onChangeText={(password) => this.passwordValidation(password)}/>
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
    inputField: {
        borderRadius: 3,
        borderWidth: 0.2,
        borderColor: 'white',
        width: "80%",
        padding: 15,
        color: "white",
    },
    container: {
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        width: "100%",
        marginBottom: 140
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

const mapStateToProps = (state) => {
    return {
        loading: state.register.loading,
        username: state.register.username,
        email: state.register.email,
        error: state.register.error,
        status: state.register.status
    }
}

const mapDispatchToProps = dispatch => ({ 
    addUser: (username, password, email) => dispatch(addUser(username, password, email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)