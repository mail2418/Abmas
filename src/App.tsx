/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

// const Tab = createBottomTabNavigator();

// function HomeTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={
//         ({ route }) => ({
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({ focused, size, color }) => {
//             let iconName;
//             if (route.name === 'To-Do') {
//               iconName = 'clipboard-list';
//               size = focused ? 25 : 20;
//             } else if (route.name === 'Done') {
//               iconName = 'clipboard-check';
//               size = focused ? 25 : 20;
//             }
//             return (
//               <FontAwesome5
//                 name={iconName}
//                 size={size}
//                 color={color}
//               />
//             );
//           },
//           tabBarActiveTintColor: '#0080ff',
//           tabBarInactiveTintColor:'#777777',
//           tabBarLabelStyle:{
//             fontSize: 15, fontWeight: 'bold',
//           },
//         })
//       }
//     >
//       <Tab.Screen name={'To-Do'} component={ToDo} />
//       <Tab.Screen name={'Done'} component={Done} />
//     </Tab.Navigator>
//   );
// }

const Drawer = createDrawerNavigator();
function App() {
  const loginReducer = (prevState:any, action:any) => {

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
        case "REGISTER_USER":
          return {
            ...state,
            users: [...state.users, action.payload], // Add the new user to the users array in the Redux store
          };
        default:
          return state;
    }
  };

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
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      try {
        AsyncStorage.setItem('userToken', 'fgkj');
      } catch (e){
        console.log(e);
      }
      dispatch({ type: 'REGISTER', token: 'fgkj' });
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
            { loginState.userToken !== null ? (
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HalamanUtama" component={HomeTabs} />
                <Drawer.Screen name="Task" component={Task} />
                <Drawer.Screen name="Camera" component={Camera} />
              </Drawer.Navigator>
            )
          :
            <AuthStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
