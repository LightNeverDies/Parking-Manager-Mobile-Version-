import React from "react"
import { StyleSheet, View, Image } from 'react-native'

const LogoHolder = (props) => {
    return(
        <View style={styles.imageContainer}>
            <Image source={props.source}/>
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