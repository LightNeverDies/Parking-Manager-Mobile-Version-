import React from "react"
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import bStyle from '@src/utils/buttonCustomVariables'

const MenuButtons = (props) => {
    return(
        <TouchableOpacity onPress= {props.onPress} style={styles.buttonBody}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: bStyle.buttonStyle,
        width: bStyle.menuButtonWidth,
        height: bStyle.menuButtonHeight,
        margin: 30,
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

module.exports = MenuButtons