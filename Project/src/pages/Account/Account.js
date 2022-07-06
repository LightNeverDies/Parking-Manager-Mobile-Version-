import React from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Tabs from '../../components/Tabs/Tabs'
import { AntDesign } from '@expo/vector-icons'
import FloatButton from '../../components/FloatButton/FloatButton'
import { HelperText } from 'react-native-paper'
import Table from '../../components/Table/Table'
import Checkbox from '../../components/Checkbox/Checkbox'
import { connect } from 'react-redux'
import { userBalance } from '@src/reduxStore/userBalance/actions/userBalance'
import { userCars } from '@src/reduxStore/userCars/actions/userCars'
import { history } from '@src/reduxStore/history/actions/history'
import { registeredCars } from '@src/reduxStore/registeredCars/actions/registeredCars'


class Account extends React.Component {

    constructor() {
        super()
        this.state = {
            active: '',
            currentImage: 0,
            intervalID: 0,
            carNumber: '',
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

        this.props.userBalance(this.props.username)
        this.props.registeredCars(this.props.username)
        this.props.history(this.props.username)
    }

    componentDidUpdate() {
        if(this.props.status === "loading") {
            return (
                this.onTabSelected()
            )
            
        }
    }

    onSettings = () => {
        this.setState({ active: 'onSettings' })
    }

    onHistory = () => {
        this.setState({ active: 'onHistory' })
    }

    onClickImage = () => {
        if (this.state.disabled === false) {
            this.onStartTimer()
        } else {
            this.onStopTimer()
        }
    }

    onStartTimer = () => {
        const intervalID = setInterval(this.onStart, 1000)
        this.setState({ intervalID })
        this.setState({ disabled: true })
    }

    onStopTimer = () => {
        clearInterval(this.state.intervalID)
        this.setState({ currentImage: 0 })
        this.setState({ disabled: false })
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

    carNumberValidationEU = () => {
        let reg = /([0-9-A-Z][- ]?[-0-9 A-Z]+)/
        const carNumber = this.state.carNumber
        if (carNumber.length > 0) {
            if (reg.test(carNumber) === false) {
                this.state.errorStatusCarNumber = false
                this.setState({ errorMessageCarNumber: 'Write correct car number (EU)' })
            } else {
                this.setState({ carNumber: carNumber })
                this.state.errorStatusCarNumber = true
                this.props.userCars(this.props.username, carNumber, this.props.checked)
                this.setState({ carNumber: '' })
            }

        } else {
            this.state.errorStatusCarNumber = false
            this.setState({ errorMessageCarNumber: 'Input field cannot be empty' })
        }
        this.props.registeredCars(this.props.username)
    }

    onSettingsPageTable = () => {
        const headers = ['User Car Number', 'Symbol of Access']
        return (
            <>
                {this.props.cars ?
                    <Table headers={headers} content={this.props.cars} itemPerPage={this.props.items}></Table>
                    : <Text style={styles.textStyle}>No information for the User</Text>}
            </>
        )
    }

    onSettingsPage = () => {
        return (
            <ScrollView style={styles.scrollContainer}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

                    <View style={styles.mainContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'white', fontSize: 20, width: Dimensions.get('window').width, textAlign: 'right', marginRight: 10 }}>Balance {this.props.balance}€</Text>
                        </View>
                        <View style={{ position: 'absolute', left: 0, top: 218, bottom: 0 }}>
                            <TouchableOpacity onPress={this.onClickImage}>
                                <Image fadeDuration={0} source={this.state.carImage[this.state.currentImage]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columnLine}>
                            <View style={styles.rows}>
                                <Text style={styles.noEditableFields}>Car Number</Text>
                                <TextInput style={styles.inputField} value={this.state.carNumber} onChangeText={value => this.setState({ carNumber: value })}></TextInput>
                                <Image style={{ width: 28, height: 28 }} source={require('../../../assets/disabled.png')} />
                                <Checkbox />
                                <FloatButton onPress={this.carNumberValidationEU}>
                                    <AntDesign name="pluscircle" color={"white"} size={28} />
                                </FloatButton>
                            </View>
                            {this.props.status == 0 ? <ActivityIndicator size="large" color="red" /> : null}
                            {!this.state.errorStatusCarNumber ? <HelperText type="error" style={styles.errorMessage} visible={!this.state.errorStatusCarNumber}>{this.state.errorMessageCarNumber}</HelperText> : null}
                            {this.props.error ? <HelperText type="error" style={styles.errorMessage} visible={this.props.error}>{this.props.error}</HelperText> : null}
                        </View>
                        <View>
                            {this.onSettingsPageTable()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

    renderHistory = () => {
        const itemPerPage = 10
        const headers = ['Username', 'Time', 'Type', 'Funds']
        const text = 'User History Found:'
        return (
            <>
                {this.props.userHistory ?
                    <Table headers={headers} content={this.props.userHistory} text={text} itemPerPage={itemPerPage}></Table>
                    : <Text style={styles.textStyle}>No information for the User</Text>}
            </>

        )
    }

    onHistoryPage = () => {
        return (
            <>
                {this.renderHistory()}
            </>
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
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 2.2 }}>
                <View style={styles.screen}>
                    <View style={styles.container}>
                        <Tabs onPress={this.onSettings} styles={{ backgroundColor: this.state.active === 'onSettings' ? 'red' : '#12285c' }}>Account Settings</Tabs>
                        <Tabs onPress={this.onHistory} styles={{ backgroundColor: this.state.active === 'onHistory' ? 'red' : '#12285c' }}>Account History</Tabs>
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
        width: '35%',
        marginLeft: 13,
        marginRight: 13
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
        color: 'white',
        fontSize: 20,
    },
    floatB: {
        width: '50%',
        height: '30%'
    },
    errorMessage: {
        marginLeft: 110,
        marginTop: -20,
        width: '80%'
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 2.2,
        borderColor: 'white',
        borderWidth: 0.2,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingBottom: 300
    },
})

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        email: state.login.email,
        created: state.login.accountCreated,
        balance: state.userBalance.balance,
        status: state.userCars.status,
        userHistory: state.historyPayment.userHistory,
        error: state.userCars.error,
        items: state.registeredCars.items,
        cars: state.registeredCars.cars,
        checked: state.checkBox.checked,
        type: state.sortedTable.type,
        status: state.sortedTable.status
    }
}


const mapDispatchToProps = dispatch => ({
    userBalance: (username) => dispatch(userBalance(username)),
    userCars: (username, carNumber, checked) => dispatch(userCars(username, carNumber, checked)),
    history: (username) => dispatch(history(username)),
    registeredCars: (username) => dispatch(registeredCars(username))
})


export default connect(mapStateToProps, mapDispatchToProps)(Account)