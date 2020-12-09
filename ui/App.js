import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/router/Router'

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
    	  <RootStack/>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
});

