import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import LoginScreen from "@src/pages/Login/LoginScreen";
import MenuScreen from "@src/pages/Menu/MenuScreen";
import RegisterScreen from "@src/pages/Register/RegisterScreen"
import Account from "@src/pages/Account/Account"
import Parking from "@src/pages/Parking/Parking"
import Payment from "@src/pages/Payment/Payment"
import Statistic from "@src/pages/Statistic/Statistic"

const RootStack = createStackNavigator()

// removing header - headerShown: false

root = () => {
    return (
      <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerTitleAlign: 'center' }}/>
            <RootStack.Screen name="Login" component={LoginScreen} options={{ headerTitleAlign: 'center' }}/>
            <RootStack.Screen name="Menu" component={MenuScreen}/>
            <RootStack.Screen name="Account" component={Account}/>
            <RootStack.Screen name="Parking" component={Parking}/>
            <RootStack.Screen name="Payment" component={Payment}/>
            <RootStack.Screen name="Statistic" component={Statistic}/>
      </RootStack.Navigator>
    )
}

export default root
