import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import LoginScreen from "@src/pages/Login/LoginScreen";
import MenuScreen from "@src/pages/Menu/MenuScreen";

const RootStack = createStackNavigator()

root = () => {
    return (
      <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Login" component={LoginScreen} options={{ headerTitleAlign: 'center' }}/>
            <RootStack.Screen name="Menu" component={MenuScreen} />
      </RootStack.Navigator>
    )
}

export default root
