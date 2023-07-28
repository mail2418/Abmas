/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useCallback } from 'react';
import {Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../../redux/actions/task';
import GlobalStyle from '../../utils/GlobalStyle';

export default function ToDo({navigation}: {navigation: any}): React.JSX.Element {

    const { tasks } = useSelector((state:any) => state.taskReducer);
    const dispatch = useDispatch();

    const getTasks = useCallback(() => {
        AsyncStorage.getItem('Tasks')
          // eslint-disable-next-line @typescript-eslint/no-shadow
            .then(tasks => {
            const parsedTasks = tasks ? JSON.parse(tasks) : null;
            if (parsedTasks && typeof parsedTasks === 'object') {
                dispatch(setTasks(parsedTasks) as any);
            }
            })
            .catch(err => console.log(err));
      }, [dispatch]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    const deleteTask = (id:any) => {
        const filteredTasks = tasks.filter((task:any) => task.ID !== id);
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks) as any);
                Alert.alert('Success!', 'Task removed successfully.');
            })
            .catch(err => console.log(err));
    };

    const checkTask = (id:any, newValue:any) => {
        const index = tasks.findIndex((task:any) => task.ID === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Done = newValue;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks) as any);
                    Alert.alert('Success!', 'Task state is changed.');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <View className="flex-1">
        <FlatList
            data={tasks.filter((task:any) => task.Done === false)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="mx-[10px] my-[7px] pr-[10px] bg-white flex justify-center rounded-lg shadow-md"
                    onPress={() => {
                        dispatch(setTaskID(item.ID) as any);
                        navigation.navigate('Task');
                    }}
                >
                    <View className="flex flex-row items-center">
                        <View
                            style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    backgroundColor:
                                        item.Color === 'red' ? '#f28b82' :
                                            item.Color === 'blue' ? '#aecbfa' :
                                                item.Color === 'green' ? '#ccff90' : '#ffffff',
                                }}
                            className="w-[20px] h-[100px] rounded-tl-[10px] rounded-bl-[10px]"
                        />
                        <CheckBox
                            value={item.Done}
                            onValueChange={(newValue) => { checkTask(item.ID, newValue); }}
                        />
                        <View className="flex-1">
                            <Text
                                style={[
                                    GlobalStyle.CustomRoboto,
                                ]}
                                numberOfLines={1}
                                className="text-black text-2xl ml-[20px]"
                            >
                                {item.Title}
                            </Text>
                            <Text
                                style={[
                                    GlobalStyle.CustomRoboto,
                                ]}
                                numberOfLines={1}
                                className="text-gray-600 text-lg ml-[20px]"
                            >
                                {item.Desc}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { deleteTask(item.ID);}}
                            className="w-[50px] h-[50px] flex justify-center items-center"
                        >
                            <FontAwesome5Icon
                                name={'trash'}
                                size={25}
                                color={'#ff3636'}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
            onPress={() => {
                dispatch(setTaskID(tasks.length + 1) as any);
                navigation.navigate('Task');
            }}
            className="w-[60px] h-[60px] rounded-full bg-blue-500 flex justify-center items-center absolute bottom-[10px] right-[10px] shadow-md"
        >
            <FontAwesome5Icon
                name={'plus'}
                size={20}
                color={'#ffffff'}
            />
        </TouchableOpacity>
        </View>
    );
}
