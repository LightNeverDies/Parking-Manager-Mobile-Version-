import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

const LogoHolder = (props) => {
    return(
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress= {props.onPress}>
                <Image source={props.source}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "10%"
    }
})

module.exports = LogoHolder