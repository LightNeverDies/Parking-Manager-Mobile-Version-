import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { checkInternet } from '@src/reduxStore/checkInternet/actions/checkInternet'
import { Text } from 'react-native'

const ConnectionChecker = (props) => {
    const [netInfo, setNetInfo] = useState(false)

    useEffect(() => {
       
    const unsubscribe = NetInfo.addEventListener((state) => {
        setNetInfo(state.isConnected)
        props.checkInternet(state.isConnected)
    })

    return () => {
        unsubscribe()
    }
              
    }, [setNetInfo])

    return (
        <>
            <Text>{netInfo}</Text>
        </>

    )
}

const mapDispatchToProps = dispatch => ({ 
    checkInternet: (netInfo) => dispatch(checkInternet(netInfo))
})

export default connect(null, mapDispatchToProps)(ConnectionChecker)