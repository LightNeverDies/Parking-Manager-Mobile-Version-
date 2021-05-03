import React from "react";
import { StyleSheet, View} from "react-native";
import { createStore, applyMiddleware } from 'redux'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/router/Router'
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
// import reducers from '@src/reduxStore/reducers'

const store = createStore(applyMiddleware(thunk))
console.log(store.getState())

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <RootStack/>
        </NavigationContainer>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
});

