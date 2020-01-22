import React, { Component } from 'react';

import { Image, View, ScrollView, Text, Dimensions, } from 'react-native'
import { NavBar } from '../../components/NavBar';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

export default class NewsDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: this.props.navigation.state.params.news
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                
            </View>
        )
    }
}