import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';
import { NavBar } from '../../components/NavBar';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window')

export default class EventsCategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            events: []
        }
    }
    componentWillMount() {
        fetch('https://api.snowyguide.com/dev/event/categories', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                if (res.message) {
                    this.setState({ isloading: false, events: [] })
                    Alert.alert(res.message);
                } else {
                    this.setState({ isloading: false, events: res })
                }
            })
            .catch((err) => {
                this.setState({ isloading: false, events: [] })
                Alert.alert('Network Error!')
            })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {this.state.isloading ?

                    <View style={{ height: height / 2, width: width, alignItems: 'center', justifyContent: 'center' }}>
                        <BubblesLoader color="#f15922" />
                    </View> :
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginHorizontal: 10, padding: 10, backgroundColor: '#fff' }}>Tap category to view local events</Text>
                        <View>
                            <FlatList
                                style={{ margin: 10, marginBottom: 40, backgroundColor: '#ffffff', }}
                                data={this.state.events}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={<Text style={{ padding: 10 }}>{'No item to show'}</Text>}
                                renderItem={({ item: rowdata }) => (
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventsList', {category:rowdata, from:'category'})}}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }} >
                                            <Text style={{ color: '#f15922', fontSize: 15 }}>{rowdata.value}</Text>
                                            <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>}
            </View>
        )
    }
}