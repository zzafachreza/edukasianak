import { Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data);
            setData(res.data.data)
        })
    }, []);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderWidth: 1,
                backgroundColor: colors.white,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: colors.primary,
                height: windowHeight / 10,
            }}>

                <Image source={{
                    uri: item.image
                }} style={{
                    flex: 0.35,
                    width: 40,
                    height: 40,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    color: colors.black,
                    // textAlign: 'center'
                }}>{item.judul}</Text>
            </View>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 18,
                    marginVertical: 10,
                    color: colors.black,
                    // textAlign: 'center'
                }}>Video Animasi</Text>
                <YoutubePlayer
                    height={300}

                    videoId={data.website}

                />
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})