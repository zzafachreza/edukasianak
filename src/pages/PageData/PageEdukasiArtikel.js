import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});

    const getDataTransaksi = () => {
        axios.post(apiURL + 'artikel').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Linking.openURL(item.link_artikel)
            }}>
                <View style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderColor: colors.border
                }}>

                    <Image source={{
                        uri: item.image
                    }} style={{
                        width: windowWidth,
                        height: 250
                    }} />
                    <View style={{
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 15,
                        }}>{item.judul}</Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }

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
            <Text style={{
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 18,
                marginVertical: 10,
                color: colors.black,
                // textAlign: 'center'
            }}>Artikel Gizi Anak</Text>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})