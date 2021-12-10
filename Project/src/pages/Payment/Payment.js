import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { MaskedText } from "react-native-mask-text";
import { Picker } from '@react-native-community/picker';
import Button from '../../components/Buttons/Buttons'
import { HelperText } from 'react-native-paper'
import { addBalance } from '../../reduxStore/payment/actions/addBalance'
import { connect } from 'react-redux';

class Payment extends React.Component {
    constructor() {
        super()
        this.state = {

            funds: 5,
            errorBalance: '',

            exp_date: '',
            security_code: '',
            card_holder: '',
            card_number: '',

            error: '',
            errorStatus: true,

            errorExpDate: '',
            errorExpDateStatus: true
        }
    }

    expDateValidator = async(date) => {
        const firstDigit = date[0]
        const secondDigit = date[1]
        switch(firstDigit) {
            case '0': {
                if(secondDigit >= '0' && secondDigit <= '9') {
                    this.state.errorExpDateStatus = true
                }
                return true
            }
            case '1': {
                if(secondDigit >= '0' && secondDigit <= '2') {
                    this.state.errorExpDateStatus = true
                    return true
                } else {
                    this.state.errorExpDateStatus = false
                    this.setState({ errorExpDate: 'Invalid month' })
                }
                return true

            }
            default: {
                this.state.errorExpDateStatus = false
                this.setState({ errorExpDate: 'Invalid expired date' })
                return false
            }
        }
    }

    addBalance = async() => {
        
        const { username } = this.props

        const { card_holder, card_number, security_code, exp_date, funds } = this.state

        if(card_holder != '' && security_code != '' && exp_date != '' && card_number != '') {
            const holder = card_holder.split(' ')
            this.state.errorStatus = true

            const firstName = holder[0]
            const lastName = holder[1]
           
            this.expDateValidator(exp_date)
            if(this.state.errorExpDateStatus == true)  {
                await this.props.addBalance(username, card_number, firstName, lastName, security_code, exp_date, funds)
            }
            
        } else {
            this.state.errorStatus = false
            this.setState({ error: "Please fill all fields" })
        }
    }

    renderFrontCard = () => {
        return(
            <View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Text style={{ color:'white', fontSize: 30 }}>Credit Card</Text>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                            <View style={{backgroundColor: '#C60000', width:44, height:44, borderRadius: 22, zIndex: 1}}/>
                            <View style={{backgroundColor: '#F79400',  width:44, height:44, borderRadius: 22, right: 15 }}/>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                        <MaskedText mask="9999 9999 9999 9999" style={{ fontSize: 20, color: 'white' }}>{this.state.card_number}</MaskedText>
                        <MaskedText mask="999" style={{ marginLeft: 30, fontSize: 20, color: 'white' }}>{this.state.security_code}</MaskedText>  
                    </View>
                    <View style ={{ flexDirection: 'row', width: '100%', marginTop: 20, marginBottom: 10 }}>
                        <View style = {{ width: '50%' }}>
                            <Text style={{ fontSize: 13, color: 'white', marginLeft: 10 }}>{this.state.card_holder}</Text>
                        </View>
                        <View style = {{ width: '50%' }}>
                            <MaskedText mask="99/99" style = {{ fontSize: 13, color: 'white' }}>{this.state.exp_date}</MaskedText>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row'}}>
                        <TextInput style={styles.inputField} underlineColor="white" keyboardType={'numeric'} theme={{ colors: {placeholder: 'white', primary: 'white'} }}  maxLength={16} label='Card Number' mode='flat' onChangeText={value => this.setState({ card_number: value })} />
                        <TextInput style={styles.inputField} underlineColor="white" theme={{ colors: {placeholder: 'white', primary: 'white'} }} label='Card Holder' mode='flat' onChangeText={value => this.setState({ card_holder: value })}/>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <TextInput style={styles.inputField} underlineColor="white" keyboardType={'numeric'} theme={{ colors: {placeholder: 'white', primary: 'white'} }} maxLength={4} label='Expire Date' mode='flat' onChangeText={value => this.setState({ exp_date: value })}/>
                        <TextInput style={styles.inputField} underlineColor="white" keyboardType={'numeric'} theme={{ colors: {placeholder: 'white', primary: 'white'} }} maxLength={3} label='Security Code' mode='flat' onChangeText={value => this.setState({ security_code: value })}/>
                    </View>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.funds}
                            style={{height: 50, width: 100, color: 'white', marginTop: 10}}
                            onValueChange={(itemValue) =>
                                this.setState({funds: itemValue})
                            }>
                            <Picker.Item label="5€" value="5" />
                            <Picker.Item label="10€" value="10" />
                            <Picker.Item label="20€" value="20" />
                            <Picker.Item label="50€" value="50" />
                        </Picker>
                        <Button onPress={ this.addBalance } style={styles.buttonStyle}>Add</Button>
                        {!this.state.errorStatus ? <HelperText type="error" style={ styles.errorMessage } visible = {!this.state.errorStatus}>{ this.state.error }</HelperText> : null }
                        {!this.state.errorExpDateStatus ? <HelperText type="error" style={ styles.errorMessage } visible={!this.state.errorExpDateStatus}>{ this.state.errorExpDate }</HelperText> : null }
                </View>

            </View>
        )
    }

    render() {
        return (
            <View>
                {this.renderFrontCard()}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    inputField: {
        width: "50%",
        marginLeft: 10,
        backgroundColor: '#2A303E',
    },
    card: {
        marginTop: 30,
        borderRadius: 7,
        borderColor: 'white',
        borderWidth: 0.2,
        width: '90%',
        height: 150,
        marginLeft: 15,
        backgroundColor: '#2A303E'
    },
    text: {
        textTransform: 'uppercase'
    },
    container: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonStyle: {
        fontSize: 30,
        backgroundColor:"red"
    },
    errorMessage: {
        alignSelf: 'center',
        marginLeft: 160,
        width: "80%"
    }
})

const mapStateToProps = (state) => {
    return {
        username: state.login.username
    }
}

const mapDispatchToProps = dispatch => ({
    addBalance: (username, card_number, first_name, last_name, security_code, exp_date, funds ) => dispatch(addBalance(username, card_number, first_name, last_name, security_code, exp_date, funds ))
})


export default connect(mapStateToProps, mapDispatchToProps)(Payment)
