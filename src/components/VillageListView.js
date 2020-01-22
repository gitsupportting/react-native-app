import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { BubblesLoader } from 'react-native-indicator';
import DefaultLocation from '../assets/icons/defaultlocation.png'

const { width, height } = Dimensions.get('window')

export default class VillageListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            villages: props.villages,
            isloading: props.isloading,
            curlat: props.curlat,
            curlng: props.curlng
        }
    }
    componentWillMount() {

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
                            style={{ margin: 10, marginBottom: 20, backgroundColor: '#ffffff', }}
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
                }
            </View>
        );
    }
}