/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../../redux/actions';
import GlobalStyle from '../../utils/GlobalStyle';

export default function Done({navigation}: {navigation: any}) {

    const { tasks } = useSelector((state:any) => state.taskReducer);
    const dispatch = useDispatch();

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
                data={tasks.filter((task:any) => task.Done === true)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="mx-10 my-7 px-10 bg-white justify-center rounded-lg shadow-md"
                        onPress={() => {
                            dispatch(setTaskID(item.ID) as any);
                            navigation.navigate('Task');
                        }}
                    >
                        <View className="flex flex-row items-center">
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
                                    className="text-black text-30 my-5"
                                >
                                    {item.Title}
                                </Text>
                                <Text
                                    style={[
                                        GlobalStyle.CustomRoboto,
                                    ]}
                                    className="text-gray-500 text-20 my-5"
                                    numberOfLines={1}
                                >
                                    {item.Desc}
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="w-50 h-50 flex justify-center items-center"
                                onPress={() => { deleteTask(item.ID); }}
                            >
                                <FontAwesome5
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
        </View>
    );
}

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//     },
//     item_row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     item_body: {
//         flex: 1,
//     },
//     delete: {
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     item: {
//         marginHorizontal: 10,
//         marginVertical: 7,
//         paddingHorizontal: 10,
//         backgroundColor: '#ffffff',
//         justifyContent: 'center',
//         borderRadius: 10,
//         elevation: 5,
//     },
//     title: {
//         color: '#000000',
//         fontSize: 30,
//         margin: 5,
//     },
//     subtitle: {
//         color: '#999999',
//         fontSize: 20,
//         margin: 5,
//     },
// });
