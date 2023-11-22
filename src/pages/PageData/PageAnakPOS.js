import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { useState } from 'react';
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

export default function PageAnakPOS({ navigation, route }) {

    const item = route.params;

    const [kirim, setKirim] = useState({
        fid_anak: item.id,
        tanggal: moment().format('YYYY-MM-DD'),
        tinggi_badan: '',
        berat_badan: '',
        lingkar_kepala: ''
    });

    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'add_posyandu', kirim).then(res => {
            console.log(res.data)
            showMessage({
                type: 'success',
                message: 'Kunjungan Posyandu berhasil di simpan !'
            });
            navigation.goBack();
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>
            <View style={{
                borderBottomWidth: 1,
                padding: 10,
                borderBottomColor: colors.border
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                }}>Nama</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                }}>{item.nama}</Text>
            </View>
            <View style={{
                borderBottomWidth: 1,
                padding: 10,
                borderBottomColor: colors.border
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                }}>Tanggal Lahir</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                }}>{moment(item.tanggal_lahir).format('dddd, DD MMMM YYYY')}</Text>
            </View>
            <View style={{
                borderBottomWidth: 1,
                padding: 10,
                borderBottomColor: colors.border
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                }}>Jenis Kelamin</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                }}>{item.jenis_kelamin}</Text>
            </View>

            <View style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                borderColor: colors.primary,
                marginVertical: 10,
            }}>

                <MyCalendar label="Tanggal Kunjungan Posyandu" onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal: x
                    })
                }} />

                <MyGap jarak={10} />
                <MyInput keyboardType='number-pad' onChangeText={x => {
                    setKirim({
                        ...kirim,
                        tinggi_badan: x
                    })
                }} label="Tinggi Badan (cm)" />
                <MyGap jarak={10} />
                <MyInput keyboardType='number-pad' onChangeText={x => {
                    setKirim({
                        ...kirim,
                        berat_badan: x
                    })
                }} label="Berat Badan (kg)" />
                <MyGap jarak={10} />
                <MyInput keyboardType='number-pad' onChangeText={x => {
                    setKirim({
                        ...kirim,
                        lingkar_kepala: x
                    })
                }} label="Lingkar Kepala (cm)" />
                <MyGap jarak={10} />
                <MyButton title="Simpan" onPress={sendServer} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})