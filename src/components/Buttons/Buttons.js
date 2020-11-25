import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import bStyle from '../../utils/buttonCustomVariables'

const Buttons = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={styles.buttonBody}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: bStyle.buttonStyle,
        marginTop: 20,
        width: bStyle.normalButtonWidth,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: bStyle.borderRadius
    },
    buttonText: {
        color: bStyle.color,
        fontSize: 18,
        fontWeight: '600'
    }
})


module.exports = Buttons