/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../screens/Auth/SignUp';
import SignInScreen from '../screens/Auth/Login';
import Splash from '../screens/Splash';

const RootStack = createStackNavigator();

const AuthStackScreen = () => (
    <RootStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                backgroundColor: '#0080ff',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
                },
                headerShown: false,
            }}
            >
                <RootStack.Screen name="Splash" component={Splash}/>
                <RootStack.Screen name="SignIn" component={SignInScreen} />
                <RootStack.Screen name="SignUp" component={SignUpScreen} />
    </RootStack.Navigator>
);

export default AuthStackScreen;
