import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { BubblesLoader } from 'react-native-indicator';
import DefaultLocation from '../assets/icons/defaultlocation.png'

const { width, height } = Dimensions.get('window')

export default class DirectoryListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directories: props.directories,
            isloading: props.isloading,
            curlat: props.curlat,
            curlng: props.curlng
        }
    }
    componentWillMount() {

    }

    getDistance(rowdata) {
        if ((rowdata._source.location.lat == this.state.curlat) && (rowdata._source.location.lng == this.state.curlng)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * rowdata._source.location.lat / 180;
            var radlat2 = Math.PI * this.state.curlat / 180;
            var theta = rowdata._source.location.lon - this.state.curlng;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            return (dist * 1.609344).toFixed(1);
        }
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
                            data={this.state.directories}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Text style={{ padding: 10 }}>{'No item to show'}</Text>}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item: rowdata }) => (
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('DirectoryDetail', { directory: rowdata._source }) }}>
                                    <View style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5', padding: 10 }}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                            <Image source={rowdata._source.avatar ? { uri: rowdata._source.avatar } : DefaultLocation} style={{ height: 60, width: 60, opacity: rowdata._source.avatar ? 1 : 0.2 }} resizeMethod='resize' resizeMode='contain' />
                                            <View style={{ width: width - 140, paddingLeft: 10 }} >
                                                <Text style={{ color: '#f15922', fontSize: 15, }} numberOfLines={1}>{rowdata._source.name}</Text>
                                                <Text style={{ color: '#473a31', fontSize: 12, }} numberOfLines={1}>{rowdata._source.address}</Text>
                                                {rowdata._source.location != null && rowdata._source.location != '' &&
                                                    <View style={{ flexDirection: 'row', marginTop:3 }}>
                                                        <Image source={DefaultLocation} style={{ height: 15, width: 15, opacity: 0.2 }} resizeMethod='resize' resizeMode='contain' />
                                                        <Text style={{ color: '#473a313f', fontSize: 10, marginLeft:5}} numberOfLines={1}>{this.getDistance(rowdata) + 'Km'}</Text>
                                                    </View>}
                                            </View>
                                        </View>
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
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