import React, { Component } from 'react';

import { Image, View, StyleSheet, Text, Dimensions, } from 'react-native'
import { NavBar } from '../../components/NavBar';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get('window');

export default class PetrolDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            petrol: this.props.navigation.state.params.petrol
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                <HTMLView
                    value={'<div>' + this.state.petrol.description + '</div>'}
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