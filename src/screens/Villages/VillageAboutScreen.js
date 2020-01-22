import React, { Component } from 'react';

import { Image, View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native'
import { NavBar } from '../../components/NavBar';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get('window');

export default class VillageAboutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            village: this.props.navigation.state.params.village
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {this.state.village.titleimage && this.state.village.titleimage != 'empty' &&
                    <Image source={{ uri: this.state.village.titleimage }} style={{ width: width, height: width * 0.22 }} resizeMode='cover' />
                }
                <ScrollView style={{ flex: 1, }}>
                {this.state.village.aboutimage && this.state.village.aboutimage != 'empty' &&
                    <Image source={{ uri: this.state.village.aboutimage }} style={{ width: width + 1, height: width * 15 / 32 }} resizeMode='cover' />
                }
                <HTMLView
                    value={'<div>'+this.state.village.abouttext+'</div>'}
                    stylesheet={styles}
                />
                </ScrollView>
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