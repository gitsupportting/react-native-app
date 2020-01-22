import React, { Component } from 'react';

import { Image, View, ScrollView, Text, Dimensions,StyleSheet } from 'react-native'
import { NavBar } from '../../components/NavBar';
import Swiper from 'react-native-swiper'
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get('window');

export default class CouncilDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            council: this.props.navigation.state.params.council
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {this.state.council.images.length != 0 && <Swiper style={{ height: width / 2 }}>
                    {this.state.directory.images.map((item, index) => {
                        return (
                            <Image source={{ uri: item }} key={index} style={{ width: '100%', height: width * 15 / 32 }} resizeMode='cover' resizeMethod="resize" />
                        )
                    })}
                </Swiper>}
                <HTMLView
                    value={'<div>'+this.state.council.description+'</div>'}
                    stylesheet={styles}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        fontWeight: '300',
        color: '#473a31', // make links coloured pink
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
    },
});