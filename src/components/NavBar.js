import React, { Component } from 'react'

import { View, ImageBackground, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const NavBar = (props) => {
    return (
        <ImageBackground
            source={require('../assets/navbar.jpg')}
            style={{ width: '100%', height: 40, flexDirection: 'row', }}
            resizeMode='cover'>
            <Icon name='ios-arrow-back' type='Ionicons' style={{ alignSelf: 'center', fontSize: 25, paddingLeft: 10, paddingRight: 25 }} onPress={() => { props.navigation.goBack() }} />
            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>SNOWY GUIDE</Text>
        </ImageBackground>
    )
}
