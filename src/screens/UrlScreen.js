import React, { Component } from 'react';

import { View, } from 'react-native'
import { NavBar } from '../components/NavBar';
import { WebView } from 'react-native-webview';


export default class UrlScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.url
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                <WebView
                    source={{ uri: this.state.url }}
                    style={{ flex: 1, }}
                    useWebKit={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scalesPageToFit={false}
                    bounces={false}
                    overScrollMode='content' />
            </View>
        )
    }
}