/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import CustomButton from '../../utils/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Camera({ navigation , route } : {navigation: any, route:any}) {

    const [{ cameraRef }, { takePicture }] = useCamera(null);
    const { tasks } = useSelector((state:any) => state.taskReducer);
    const dispatch = useDispatch();

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const filePath = data.uri;
            updateTask(route.params.id, filePath);
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = (id:any, path:any) => {
        const index = tasks.findIndex((task:any) => task.ID === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Image = path;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks) as any);
                    Alert.alert('Success!', 'Task image is saved.');
                    navigation.goBack();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <View className="flex-1">
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                className="flex-1 items-center justify-end"
            >
                <CustomButton
                    title="Capture"
                    color="#1eb900"
                    onPressFunction={() => captureHandle()}
                />
            </RNCamera>
        </View>
    );
}
