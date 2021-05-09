import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
      );
}

const Parking = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
    );
}

const Information = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: "white" }}/>
    );
}

const Payment = ()=> {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
    );
}

const Account = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
    );
}

const BottomTab = (navigate) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                tabStyle: {
                    backgroundColor: "#12285c"
                }
            }}
            >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
                tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=> navigate.page('Menu')}/>)
                }}/>
            <Tab.Screen
                name="Parking"
                component={Parking}
                options={{
                tabBarLabel: 'Parking',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="parking" color={color} size={size} />
                ),
                tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=> navigate.page('Parking')}/>)
                }}/>
            <Tab.Screen
                name="Information"
                component={Information}
                options={{
                tabBarLabel: 'Information',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-information-circle" size={size} color={color} />
                ),
                tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=> navigate.page('Information')}/>)
                }}/>
            <Tab.Screen
                name="Payment"
                component={Payment}
                options={{
                tabBarLabel: 'Payment',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="payment" color={color} size={size} />
                ),
                tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=> navigate.page('Payment')}/>)
                }}/>
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
                tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={()=> navigate.page('Account')}/>)
                }}/>
            </Tab.Navigator>
            )
}

module.exports = BottomTab