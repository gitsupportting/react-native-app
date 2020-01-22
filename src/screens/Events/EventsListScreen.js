import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';
import { NavBar } from '../../components/NavBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import EventListView from '../../components/EventListView';
import EventLocationView from '../../components/EventLocationView';
const { width, height } = Dimensions.get('window');


export default class EventsListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            category: this.props.navigation.state.params.category,
            location: this.props.navigation.state.params.location,
            from: this.props.navigation.state.params.from,
            events: [],
            index: 0,
            routes: [
                { key: 'list', title: 'List view' },
                { key: 'map', title: 'Map view' },
            ],
            curlat: 0,
            curlng: 0
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

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({curlat:position.coords.latitude, curlng:position.coords.longitude})
        }, (err)=>{
            console.warn(err);
        })
        if (this.state.from == 'category') {
            this.setState({url:'https://api.snowyguide.com/dev/event/category/' + this.state.category.key })
            fetch('https://api.snowyguide.com/dev/event/category/' + this.state.category.key, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((res) => {
                    if (res.message) {
                        this.setState({ isloading: false, events: [], })
                        Alert.alert(res.message);
                    } else {
                        this.setState({ isloading: false, events: res.hits.hits })
                    }
                })
                .catch((err) => {
                    this.setState({ isloading: false, events: [] })
                    Alert.alert('Network Error!')
                })
        } else if (this.state.from == "village") {
            this.setState({url:'https://api.snowyguide.com/dev/event/location/' + this.state.location.key })
            fetch('https://api.snowyguide.com/dev/event/location/' + this.state.location.key, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((res) => {
                    if (res.message) {
                        this.setState({ isloading: false, events: [], })
                        Alert.alert(res.message);
                    } else {
                        this.setState({ isloading: false, events: res.hits.hits })
                    }
                })
                .catch((err) => {
                    this.setState({ isloading: false, events: [] })
                    Alert.alert('Network Error!')
                })
        }
    }

    
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        list: () => <EventListView events={this.state.events} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} />,
                        map: () => <EventLocationView events={this.state.events} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} url={this.state.url}/>,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: width }}
                />
            </View>
        )
    }
}