import { Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { Icon } from 'react-native-elements';
import { apiURL, getData } from '../../utils/localStorage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';


export default function ({ navigation, route }) {
    const item = route.params;


    const [data, setData] = useState({});

    useEffect(() => {
        getData('user').then(uu => {
            axios.post(apiURL + 'posyandu', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data)
            })
        })
    }, []);

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                padding: 10,
                borderWidth: 1,
                margin: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>

                <View>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14,
                        color: colors.black
                    }}>{item.nama}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14,
                        color: colors.black
                    }}>{moment(item.tanggal_lahir).format('DD MMMM YYYY')}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 14,
                        color: colors.black
                    }}>{item.jenis_kelamin}</Text>

                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: colors.border,
                        marginVertical: 5,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                fontSize: 14,
                                color: colors.black
                            }}>Tinggi Badan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                color: colors.black
                            }}>{item.tinggi_badan} cm</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                fontSize: 14,
                                color: colors.black
                            }}>Berat Badan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                color: colors.black
                            }}>{item.berat_badan} kg</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                fontSize: 14,
                                color: colors.black
                            }}>Lingkar Kepala</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                color: colors.black
                            }}>{item.lingkar_kepala} cm</Text>
                        </View>
                    </View>
                </View>
            </View>
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

            <FlatList data={data} renderItem={__renderItem} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})