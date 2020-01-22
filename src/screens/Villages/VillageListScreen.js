import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';
import { NavBar } from '../../components/NavBar';
import Icon from 'react-native-vector-icons/Ionicons';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import VillageListView from '../../components/VillageListView';
import VillageLocationView from '../../components/VillageLocationView'

const { width, height } = Dimensions.get('window')

export default class VillageListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            villages: [],
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
        fetch('https://api.snowyguide.com/dev/locations', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                if (res.message) {
                    this.setState({ isloading: false, villages: [] })
                    Alert.alert(res.message);
                } else {
                    this.setState({ isloading: false, villages: res })
                }
            })
            .catch((err) => {
                this.setState({ isloading: false, villages: [] })
                Alert.alert('Network Error!')
            })
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
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {/* {this.state.isloading ?

                    <View style={{ height: height / 2, width: width, alignItems: 'center', justifyContent: 'center' }}>
                        <BubblesLoader color="#f15922" />
                    </View> :
                    <View>
                        <FlatList
                            style={{ margin: 10, marginBottom: 40, backgroundColor: '#ffffff', }}
                            data={this.state.villages}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Text style={{ padding: 10 }}>{'No item to show'}</Text>}
                            renderItem={({ item: rowdata }) => (
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('VillageDetail', { village: rowdata }) }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }} >
                                        <Text style={{ color: '#f15922', fontSize: 15 }}>{rowdata.value}</Text>
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                } */}
                 <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        list: () => <VillageListView villages={this.state.villages} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} />,
                        map: () => <VillageLocationView villages={this.state.villages} isloading={this.state.isloading} curlat={this.state.curlat} curlng={this.state.curlng} navigation={this.props.navigation} />,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: width }}
                />
            </View>
        )
    }
}