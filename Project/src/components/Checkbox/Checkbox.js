import React, { useState, useEffect } from "react"
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { checkBoxResult } from '@src/reduxStore/checkBox/actions/checkBox'

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        props.checkBoxResult(checked)
    }, [checked])

    return(
        <>
            <Pressable 
            style={[styles.checkboxBase, checked && styles.checkboxChecked]} 
            onPress={() => {
                setChecked(!checked) 
                }}>
            {checked && <Ionicons name="checkmark" size={24} color="white" />}
            </Pressable>
        </>  
    ) 
}


const styles = StyleSheet.create({
    checkboxBase: {
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#12285c',
      backgroundColor: 'transparent',
      marginRight: 10,
      marginLeft: 10
    },
  
    checkboxChecked: {
      backgroundColor: '#12285c',
    },
  
    appContainer: {
      flex: 1,
      alignItems: 'center',
    },
  
    appTitle: {
      marginVertical: 16,
      fontWeight: 'bold',
      fontSize: 24,
    },
  
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontWeight: "500",
        fontSize: 18,
      },
  });
  
const mapDispatchToProps = dispatch => ({ 
    checkBoxResult: (checked) => dispatch(checkBoxResult(checked)),
})

export default connect(null, mapDispatchToProps)(Checkbox) 
