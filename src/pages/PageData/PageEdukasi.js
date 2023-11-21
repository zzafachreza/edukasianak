import { Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { Icon } from 'react-native-elements';

export default function PageEdukasi({ navigation, route }) {
    const item = route.params;
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
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PageEdukasiVideo', item)}>
                <View style={{
                    flex: 1,
                    margin: 20,
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='logo-youtube' size={50} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.black
                    }}>Video Animasi</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PageEdukasiSoal', item)} >
                <View style={{
                    flex: 1,
                    margin: 20,
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='receipt' size={50} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.black
                    }}>Quizzes</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PageEdukasiArtikel', item)}>
                <View style={{
                    flex: 1,
                    margin: 20,
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='newspaper' size={50} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        color: colors.black
                    }}>Artikel Gizi Anak</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})