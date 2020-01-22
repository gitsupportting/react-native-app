import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';
import DefaultLocation from '../assets/icons/defaultlocation.png'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window')
const month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class EventListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: props.events,
            isloading: props.isloading,
            lat: props.latitude,
            lng: props.longitude
        }
    }
    componentWillMount() {

    }
    getDate(day) {
        var date = new Date(day);
        return ('0' + (date.getDate())).slice(-2)
    }

    getMonth(day) {
        var date = new Date(day);
        return month_name[date.getMonth()].toLocaleUpperCase();
    }
    getDiff(source) {
        var end = new Date(source.dtend);
        var start = new Date(source.dtstart);
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                {this.state.isloading ?
                    <View style={{ height: height / 2, width: width, alignItems: 'center', justifyContent: 'center' }}>
                        <BubblesLoader color="#f15922" />
                    </View> :
                    <View>
                        <FlatList
                            style={{ margin: 10, marginBottom: 0, backgroundColor: '#ffffff', }}
                            data={this.state.events}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Text style={{ padding: 10 }}>{'No item to show'}</Text>}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item: rowdata }) => (
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('EventDetail', {event:rowdata._source})}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#f0f2f5', alignItems: 'center' }} >
                                        <View style={{ borderRightWidth: 1, borderRightColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center', width: 50 }}>
                                            <Text style={{ color: '#f15922', fontSize: 15, }}>{this.getDate(rowdata._source.dtstart)}</Text>
                                            <Text style={{ color: '#473a31', fontSize: 15, }}>{this.getMonth(rowdata._source.dtstart)}</Text>
                                            {this.getDiff(rowdata._source) > 1 && <Text style={{ color: '#473a31', fontSize: 8, }}>{"for " + this.getDiff(rowdata._source) + " days"}</Text>}
                                        </View>
                                        <View style={{ width: width - 140, paddingHorizontal: 10 }}>
                                            {rowdata._source.summary && <Text style={{ color: '#f15922', fontSize: 15, }} numberOfLines={1}>{rowdata._source.summary}</Text>}
                                            {rowdata._source.SUMMARY && <Text style={{ color: '#f15922', fontSize: 15, }} numberOfLines={1}>{rowdata._source.SUMMARY}</Text>}
                                            <Text style={{ color: '#f159225f', fontSize: 12, }} numberOfLines={1}>{rowdata._source.address}</Text>
                                        </View>
                                        <View style={{ width: 50, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name="calendar" style={{ fontSize: 20, color: '#473a31' }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                }
            </View>
        );
    }
}