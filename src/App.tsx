/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Task from './screens/App/Task';
import Camera from './screens/App/Camera';
import HomeTabs from './screens/App/Home';

import { DrawerContent } from './screens/Drawer/DrawerContent';
import { AuthContext } from './components/context';

//NavigationStack
import AuthStackScreen from './navigation/AuthStack';

import { Provider } from 'react-redux';
import { Store } from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';

import { combineReducers } from 'redux';

import Users from './model/users';

const Drawer = createDrawerNavigator();
function App() {
  const loginReducer = (prevState: any, action: any) => {

    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          users: [...prevState.users, action.payload], // Add the new user to the users array in the Redux store
        };
      default:
        return prevState;
    }
  };

  // Move the form state variables and data variable to the component scope
  const [data, setData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    // Your other data fields here...
  });

  const rootReducer = combineReducers({
    auth: loginReducer,
  });

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser: any) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // Assuming you have access to the `Users` array here or import it from the correct location
      const newUser = {
        id: Users.length + 1,
        email: '', // Add other user properties as needed
        username: data.username,
        password: data.password,
        userToken: '', // Initialize with an empty token
      };
      dispatch({ type: 'REGISTER', payload: newUser }); // Dispatch the REGISTER action with the newUser object as payload
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={Store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HalamanUtama" component={HomeTabs} />
              <Drawer.Screen name="Task" component={Task} />
              <Drawer.Screen name="Camera" component={Camera} />
            </Drawer.Navigator>
          )
            :
            <AuthStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
