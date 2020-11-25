import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Buttons = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={styles.buttonBody}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: '#00aeef',
        marginTop: 20,
        width: 150,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }
})


module.exports = Buttons