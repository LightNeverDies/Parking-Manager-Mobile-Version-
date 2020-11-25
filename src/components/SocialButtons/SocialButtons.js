import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import bStyle from '../../utils/buttonCustomVariables'

const SocialButtons = (props) => {
        return(
            <TouchableOpacity style={styles.buttonBody}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        backgroundColor: bStyle.socialButtonStyle,
        marginTop: 50,
        width: bStyle.socialButtonWidth,
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


module.exports = SocialButtons