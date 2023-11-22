import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import { useState } from 'react';
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components';
import moment from 'moment';

export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        __getTransaksi();
    }, []);
    const sendServer = () => {
        console.log(kirim);
        axios.post(apiURL + 'update_anak', {
            ...kirim,
            fid_user: user.id
        }).then(res => {
            console.log(res.data)
        })
    }
    const [kirim, setKirim] = useState({
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Laki-laki',
        fid_user: '',
        orangtua: ''
    })


    const __getTransaksi = () => {
        getData('user').then(uu => {
            setUser(uu);

            axios.post(apiURL + 'anak', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
                if (res.data.length > 0) {
                    setKirim(res.data[0]);
                } else {
                    setKirim({
                        ...kirim,
                        fid_user: uu.id
                    })
                }
            })
        })
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
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 10,
            }}>
                {data.length > 0 && <>
                    <MyInput label="Nama" value={kirim.nama} onChangeText={x => setKirim({
                        ...kirim,
                        nama: x
                    })} />
                    <MyGap jarak={5} />
                    <MyCalendar label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })} />
                    <MyGap jarak={5} />
                    <MyPicker label="Jenis Kelamin" value={kirim.jenis_kelamin} onValueChange={x => setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })} data={[
                        { label: 'Laki-laki', value: 'Laki-laki' },
                        { label: 'Perempuan', value: 'Perempuan' },
                    ]} />
                    <MyGap jarak={5} />
                    <MyInput label="Nama orang Tua" value={kirim.orangtua} onChangeText={x => setKirim({
                        ...kirim,
                        orangtua: x
                    })} />

                    <MyGap jarak={10} />
                    <MyButton title="Update Data Anak" onPress={sendServer} />
                </>}

                {data.length == 0 && <>


                    <MyInput label="Nama" onChangeText={x => setKirim({
                        ...kirim,
                        nama: x
                    })} />
                    <MyGap jarak={5} />
                    <MyCalendar label="Tanggal Lahir" onDateChange={x => setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })} />
                    <MyGap jarak={5} />
                    <MyPicker label="Jenis Kelamin" onValueChange={x => setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })} data={[
                        { label: 'Laki-laki', value: 'Laki-laki' },
                        { label: 'Perempuan', value: 'Perempuan' },
                    ]} />
                    <MyGap jarak={10} />
                    <MyButton title="Update Data Anak" onPress={sendServer} />
                </>}
            </ScrollView>
            <MyButton radius={0} warna={colors.primary} title="Buat Kunjungan Ke Posyandu" onPress={() => {
                navigation.navigate('PageAnakPOS', kirim)
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})