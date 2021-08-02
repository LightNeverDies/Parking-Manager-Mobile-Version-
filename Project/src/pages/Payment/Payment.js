import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'


class Payment extends React.Component {
    constructor() {
        super()
        this.state = {

            balance: '',
            errorBalance: '',

            exp_date: '',
            security_code: '',
            card_holder: '',
            card_number: '',

            errorCardHolder: '',
            errorSecurityCode: '',
            errorCardNumber: '',
            errorExpDate: '',

            cardField_Validation: '',
            expDate_Validation: ''

        }
    }

    renderFrontCard = () => {

    }

    renderBackCard = () => {

    }

    render() {
        return (
            <View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
                        <View style={{backgroundColor: '#C60000', width:44, height:44, borderRadius: 22, zIndex: 1 }}/>
                        <View style={{backgroundColor: '#F79400',  width:44, height:44, borderRadius: 22, right: 15 }}/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                        <Text style={{ fontSize: 26, color: 'white' }}>{this.state.card_number}</Text> 
                    </View>
                    <View style ={{ flexDirection: 'row', width: '100%', marginTop: 20, marginBottom: 10 }}>
                        <View style = {{ width: '50%' }}>
                            <Text style={{ fontSize: 13, color: 'white', marginLeft: 10 }}>{this.state.card_holder}</Text>
                        </View>
                        <View style = {{ width: '50%' }}>
                            <Text style = {{ fontSize: 13, color: 'white' }}>{this.state.exp_date}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <TextInput style={styles.inputField} label='Card Holder' mode='flat' onChangeText={value => this.setState({ card_holder: value })}/>
                    <TextInput style={styles.inputField} label='Card Number' mode='flat' onChangeText={value => this.setState({ card_number: value })}/>
                    <TextInput style={styles.inputField} label='Security Code' mode='flat' onChangeText={value => this.setState({ security_code: value })}/>
                    <TextInput style={styles.inputField} label='Expire Date' mode='flat' onChangeText={value => this.setState({  exp_date: value })}/>
                </View>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    inputField: {
        width: "50%",
    },
    card: {
        flex:1,
        borderRadius: 7,
        borderColor: 'white',
        borderWidth: 0.2,
        width: '90%',
        marginLeft: 15,
        backgroundColor: '#18181B'
    },
    text: {
        textTransform: 'uppercase'
    }
})

module.exports = Payment