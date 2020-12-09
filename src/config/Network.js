import React from 'react'
import { Platform, NetInfo, Alert } from 'react-native'

class Network extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    CheckConnection = () => {
        if(Platform.OS === "android"){
            NetInfo.isConnected.fetch().then( isConnected => {
                if(isConnected){
                    Alert.alert('You are online')
                } else{
                    Alert.alert('You are offline')
                }
            })
        } else {
            NetInfo.isConnected.addEventListener(
              "connectionChange",
              this.handleFirstConnectivityChange
            );
          }
    }

    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
          "connectionChange",
          this.handleFirstConnectivityChange
        );
    
        if (isConnected === false) {
          Alert.alert("You are offline!");
        } else {
          Alert.alert("You are online!");
        }
      };

}

module.exports = Network