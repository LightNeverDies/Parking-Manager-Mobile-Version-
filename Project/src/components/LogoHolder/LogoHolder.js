import React from "react"
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'

const LogoHolder = (props) => {
    return(
        <View style={styles.imageContainer}>
            <TouchableOpacity style= {props.styles} onPress= {props.onPress}>
                <Image source={props.source}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        marginBottom:10,
        marginTop: 10
    }
})

module.exports = LogoHolder