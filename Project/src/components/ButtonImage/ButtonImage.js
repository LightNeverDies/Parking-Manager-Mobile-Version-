import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const ButtonImage = (props) => {
        return(
            <TouchableOpacity onPress= {props.onPress} style={[props.styles]}>
                <Text style={props.styles}>{props.children}</Text>
            </TouchableOpacity>
        )
}

module.exports = ButtonImage