import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import bStyle from '@src/utils/buttonCustomVariables'

const FloatButton = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={[styles.buttonBody, props.styles]}>
                    {props.children}
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})


module.exports = FloatButton