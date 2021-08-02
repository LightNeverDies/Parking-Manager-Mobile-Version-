import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import Tabs from '../../components/Tabs/Tabs'
import { AntDesign } from '@expo/vector-icons'
import FloatButton from '../../components/FloatButton/FloatButton'
import { HelperText } from 'react-native-paper'
import { connect } from 'react-redux'


class Account extends React.Component {
    constructor(){
        super()
        this.state = {
            active: '',
            currentImage: 0,
            intervalID: 0,
            carNumber: '',
            balance: 0,
            errorMessageCarNumber: '',
            errorStatusCarNumber: true,
            disabled: false,
            carImage: [
                require('../../../assets/carNum.png'),
                require('../../../assets/carNumP.png')
            ]
        }
    }
    componentDidMount() {
        this.onSettings()
        this.onTabSelected()
    }


    onSettings = () => {
        this.setState({ active: 'onSettings' })
    }

    onHistory = () => {
        this.setState({ active: 'onHistory' })
    }

    onClickImage = () => {
        if(this.state.disabled === false) {
            this.onStartTimer()
        } else {
            this.onStopTimer()
        }
    }

    onStartTimer = () => {
        const intervalID = setInterval(this.onStart, 1000)
        this.setState({ intervalID })
        this.setState({ disabled: true})
    }

    onStopTimer = () => {
        clearInterval(this.state.intervalID)
        this.setState({ currentImage: 0})
        this.setState({ disabled: false})
    }
    componentWillUnmount() {
        this.onStopTimer()
    }

    onStart = () => {

        if (this.state.currentImage < this.state.carImage.length - 1) {

            this.setState({ currentImage: this.state.currentImage + 1 })
        } else {
            this.setState({ currentImage: 0 })
        } 
        return this.currentImage;
    }

    carNumberValidationEU = (carNumber) => {
        let reg = /([0-9-A-Z][- ]?[-0-9 A-Z]+)/
        if(carNumber.length != '') {
            if(reg.test(carNumber) === false) {
                this.state.errorStatusCarNumber = false
                this.setState({ errorMessageCarNumber: 'Error: Write correct car number (EU)' })
            } else {
                this.setState({ carNumber: carNumber })
                this.state.errorStatusCarNumber = true
            }
        } else {
            this.state.errorStatusCarNumber = false
            this.setState({ errorMessageCarNumber: 'Error: Input field cannot be empty' })
            return false
        }
    }

    sendCarNumber = () => {
        const { carNumber } = this.state
        if(this.carNumberValidationEU(carNumber) == true) {
            console.log('Welcome')
        }
    }

    onSettingsPage = () => {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style = {styles.mainContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style = {{color: 'white', fontSize: 20, width: Dimensions.get('window').width, textAlign: 'right', marginRight: 10 }}>Balance {this.state.balance}$</Text>
                    </View>
                    <View style = {{ position: 'absolute', left: 0, top: 0, height: Dimensions.get('window').height, alignItems: 'center'}}>
                        <LogoHolder onPress={ this.onClickImage } source={this.state.carImage[this.state.currentImage]}/>
                    </View>
                    <View style={styles.columnLine}>
                        <View style = {styles.rows}>
                            <Text style = {styles.noEditableFields}>Car Number</Text>
                            <TextInput style = {styles.inputField} onChangeText={value => this.setState({ carNumber: value })}></TextInput>
                            <FloatButton onPress={this.sendCarNumber}>
                                <AntDesign name="pluscircle" color={"white"} size={28} />
                            </FloatButton>
                        </View>
                        <HelperText type="error" style={styles.errorMessage} visible = {!this.state.errorStatusCarNumber}>{this.state.errorMessageCarNumber}</HelperText>
                        <View style = {styles.rows}>
                            <Text style = {styles.noEditableFields}>Username {this.props.username}</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    onHistoryPage = () => {
        return (
            <View>
                <Text>Hello on History</Text>
                {/* List with whole user information  */}
            </View>
        )
    }

    onTabSelected = () => {
        return (
            <>
            {this.state.active === 'onSettings' 
            ? this.onSettingsPage() 
            : this.onHistoryPage()}
            </>
        )
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.screen}>
                    <View style={styles.container}>
                        <Tabs onPress={ this.onSettings } styles={{ backgroundColor: this.state.active === 'onSettings' ? 'red' : '#12285c' }}>Account Settings</Tabs>
                        <Tabs onPress={ this.onHistory } styles= {{ backgroundColor: this.state.active === 'onHistory' ? 'red' : '#12285c' }}>Account History</Tabs>
                    </View>
                    {this.onTabSelected()}
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: Dimensions.get('window').height,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
    },
    mainContainer: {
        flexDirection: 'column', 
        height: Dimensions.get('window').height, 
        flex: 1
    },
    inputField: {
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: 0.2,
        color: 'white',
        fontSize: 20,
        width: '50%',
        marginLeft: 20,
        marginRight: 20
    },
    columnLine: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    rows: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,  
        justifyContent: 'center',
        padding: 20,
    },
    noEditableFields: {
        color:'white', 
        fontSize: 20,
    },
    floatB: {
        width: '50%',
        height: '30%'
    },
    errorMessage: {
        marginLeft: 115,
        marginTop: -20,
        width: '80%'
    }
})

const mapStateToProps = (state) => {   
    return {
        username: state.login.username,
        email: state.login.email,
        created: state.login.accountCreated
    }
}


// const mapDispatchToProps = dispatch => ({ 
// })


export default connect(mapStateToProps, null)(Account)