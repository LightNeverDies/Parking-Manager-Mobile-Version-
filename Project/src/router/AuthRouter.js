import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import LoginScreen from "@src/pages/Login/LoginScreen";
import RegisterScreen from "@src/pages/Register/RegisterScreen"
import MenuScreen from "@src/pages/Menu/MenuScreen";
import Account from "@src/pages/Account/Account"
import Parking from "@src/pages/Parking/Parking"
import Payment from "@src/pages/Payment/Payment"
import Information from "@src/pages/Information/Information"

const AuthRootStack = createStackNavigator()

// removing header - headerShown: false

authRoot = () => {
    return (
      <AuthRootStack.Navigator initialRouteName="Main">
            <AuthRootStack.Screen name="Menu" component={MenuScreen} options={{ headerTitleAlign: 'center', headerShown: false }}/>
            <AuthRootStack.Screen name="Account" component={Account} options={{ headerTitleAlign: 'center', headerShown: false }}/>
            <AuthRootStack.Screen name="Parking" component={Parking} options={{ headerTitleAlign: 'center', headerShown: false }}/>
            <AuthRootStack.Screen name="Payment" component={Payment} options={{ headerTitleAlign: 'center', headerShown: false }}/>
            <AuthRootStack.Screen name="Information" component={Information} options={{ headerTitleAlign: 'center', headerShown: false }}/>
            <AuthRootStack.Screen name="Register" component={RegisterScreen} options={{ headerTitleAlign: 'center', headerShown: false} }/>
            <AuthRootStack.Screen name="Login" component={LoginScreen} options={{ headerTitleAlign: 'center', headerShown: false }}/>
      </AuthRootStack.Navigator>
    )
}

export default authRoot
