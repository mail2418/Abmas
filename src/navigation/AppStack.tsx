/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Task from '../screens/App/Task';
import Camera from '../screens/App/Camera';
import HomeTabs from '../screens/App/Home';

const RootStack = createStackNavigator();

const AppStackScreen = () => (
    <>
        <RootStack.Screen name="HalamanUtama" component={HomeTabs} />
        <RootStack.Screen name="Task" component={Task} />
        <RootStack.Screen name="Camera" component={Camera}/>
    </>
);

export default AppStackScreen;
