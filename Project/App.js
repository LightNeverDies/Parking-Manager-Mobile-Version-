import React from "react";
import { StyleSheet, View} from "react-native";
import { createStore, applyMiddleware } from 'redux'
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/router/Router'
import AuthRootStack from '@src/router/AuthRouter'
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist'
import combineReducer from '@src/reduxStore/combineReducer'
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, combineReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store);

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }


  componentDidMount () {
    this.authChecker()
  }

  authChecker = async() => {
    const auth = await AsyncStorage.getItem('token')
    if(auth !== null) {
      const { exp } = jwt_decode(auth)
      if(Date.now() >= exp * 1000) {
        this.setState({ value: null })
      } else {
        this.setState({ value: auth })
      }
    }
    this.setState({ value: null })

  }

  checkUserHasToken = () => {
      if(this.state.value !== null) {
        return ( 
            <NavigationContainer>
              <AuthRootStack/>
            </NavigationContainer>
        )
      } else {
        return (
          <>
            <NavigationContainer>
              <RootStack/>
            </NavigationContainer>
          </>
        )
      }
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <View style={styles.container}>
          {this.checkUserHasToken()}
        </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
});

export default App

