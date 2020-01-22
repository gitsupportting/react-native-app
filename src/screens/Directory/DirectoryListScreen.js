import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Dimensions, } from 'react-native';
import { NavBar } from '../../components/NavBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import DirectoryListView from '../../components/DirectoryListView';
import DirectoryLocationView from '../../components/DirectoryLocationView'

const { width, height } = Dimensions.get('window')



export default class DirectoryListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            directories: [],
            url:'',
            id: this.props.navigation.state.params.id,
            from: this.props.navigation.state.params.from,
            location:this.props.navigation.state.params.village,
            index: 0,
            routes: [
                { key: 'list', title: 'List view' },
                { key: 'map', title: 'Map view' },
            ],
            curlat: 0,
            curlng: 0
        }
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({curlat:position.coords.latitude, curlng:position.coords.longitude})
        }, (err)=>{
            console.warn(err);
        })
        if (this.state.from == 'category') {
            this.setState({ url:'https://api.snowyguide.com/dev/business/category/' + this.state.id })
            fetch('https://api.snowyguide.com/dev/business/category/' + this.state.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((res) => {
                    if (res.message) {
                        this.setState({ isloading: false, directories: [],})
                        Alert.alert(res.message);
                    } else {
                        this.setState({ isloading: false, directories: res.hits.hits })
                    }
                })
                .catch((err) => {
                    this.setState({ isloading: false, directories: [] })
                    Alert.alert('Network Error!')
                })
        } else if (this.state.from == 'village') {
            this.setState({ url:'https://api.snowyguide.com/dev/business/location/' + this.state.location.key})
            fetch('https://api.snowyguide.com/dev/business/location/' + this.state.location.key, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((res) => {
                    if (res.message) {
                        this.setState({ isloading: false, directories: [], })
                        Alert.alert(res.message);
                    } else {
                        this.setState({ isloading: false, directories: res.hits.hits })
                    }
                })
                .catch((err) => {
                    this.setState({ isloading: false, directories: [] })
                    Alert.alert('Network Error!')
                })
        }
    }

    _renderTabBar = props => {

        return (
            <View style={{ flexDirection: 'row', height: 30, alignItems: 'flex-end', justifyContent: 'center', borderBottomColor: '#a4a4a43f', borderBottomWidth: 1 }}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 0
                    }}
                    onPress={() => this.setState({ index: 0 })}>
                    <Animated.Text
                        style={{ borderBottomWidth: !this.state.index ? 2 : 0, paddingBottom: !this.state.index ? 4 : 6, color: !this.state.index ? "#f15922" : "#473a31", borderBottomColor: !this.state.index ? "#f15922" : "#473a31" }}>
                        {'List view'}
                    </Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 0
                    }}
                    onPress={() => this.setState({ index: 1 })}>
                    <Animated.Text
                        style={{ borderBottomWidth: this.state.index ? 2 : 0, paddingBottom: this.state.index ? 4 : 6, color: this.state.index ? "#f15922" : "#473a31", borderBottomColor: this.state.index ? "#f15922" : "#473a31" }}>
                        {'Map view'}
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar {...this.props} />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        list: () => <DirectoryListView directories={this.state.directories} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} />,
                        map: () => <DirectoryLocationView directories={this.state.directories} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} url={this.state.url}/>,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: width }}
                />
            </View>
        )
    }
}
