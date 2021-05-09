import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import bStyle from '@src/utils/buttonCustomVariables'

const BottomNavBar = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={[styles.buttonBody, props.styles]}>
                <View style={styles.container}>
                    {props.children}
                </View>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    buttonBody: {
        width: 72,
        borderRadius: bStyle.borderRadius,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1
    }
})


module.exports = BottomNavBar