import React from "react"
import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import bStyle from '@src/utils/buttonCustomVariables'

const MenuButtons = (props) => {
    return(
        <TouchableOpacity onPress= {props.onPress} style={props.styles}>
            <ImageBackground source = {props.source} style={[styles.imageBackground, props.styles]}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonText: {
        color: bStyle.color,
        fontSize: 18,
        margin: 35
    },
    imageBackground: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

module.exports = MenuButtons