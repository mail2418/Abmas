/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {View, Text, Image} from 'react-native';
// import PushNotification from 'react-native-push-notification';

export default function Splash({navigation}: {navigation: any}): React.JSX.Element {
    useEffect(() => {
        // createChannels();
        setTimeout(() => {
            navigation.replace('SignUp');
        }, 2000);
    }, [navigation]);

    // const createChannels = () => {
    //     PushNotification.createChannel(
    //         {
    //             channelId: 'task-channel',
    //             channelName: 'Task Channel',
    //         },
    //         (created) => console.log(`createChannel returned '${created}'`)
    //     );
    // };
    return (
        <View className="flex-1 items-center justify-center bg-slate-400" >
            <Image
                className="w-36 h-36 m-5 rounded-full"
                source={require('../../assets/images/Badge_ITS.png')}
            />
            <Text
                className="text-4xl font-serif text-center items-center"
            >
                Pengabdian Masyarakat ITS
            </Text>
        </View>
    );
}
