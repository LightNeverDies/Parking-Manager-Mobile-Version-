import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import bStyle from '@src/utils/buttonCustomVariables'

const Tabs = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={[styles.buttonBody, props.styles]}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: bStyle.tabsColor,
        width: bStyle.tabs,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: bStyle.color,
        fontSize: 18,
        fontWeight: '600'
    }
})


module.exports = Tabs