import React, { Component } from 'react';
import { Image, View, FlatList, Text, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';
import { NavBar } from '../../components/NavBar';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            news: [],
            introtext: ""
        }
    }
    componentWillMount() {
        fetch('https://api.snowyguide.com/dev/pages/news', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                if (res.message) {
                    this.setState({ isloading: false, news: [] })
                    Alert.alert(res.message);
                } else {
                    this.setState({ isloading: false, news: res.sources, introtext: res.introtext });
                }
            })
            .catch((err) => {
                this.setState({ isloading: false, news: [] })
                Alert.alert('Network Error!')
            })
    }
    navigateToDetail(rowdata) {
        if (rowdata.url) {
            this.props.navigation.navigate('Url', {url:rowdata.url});
            return;
        } else if (rowdata.businesscategoryid) {
            this.props.navigation.navigate('DirectoryList', {id:rowdata.businesscategoryid, from:'category'});
            return;
        } else if (rowdata.eventcategoryid) {
            this.props.navigation.navigate("EventsList", {key:rowdata.eventcategoryid, from:'category'})
            return;
        } else if(rowdata.description) {
            this.props.navigation.navigate("NewsDetail", {news:rowdata});
            return;
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {this.state.isloading ?

                    <View style={{ height: height / 2, width: width, alignItems: 'center', justifyContent: 'center' }}>
                        <BubblesLoader color="#f15922" />
                    </View> :
                    <View style={{}}>
                        <HTMLView
                            value={'<div>' + this.state.introtext + '</div>'}
                            stylesheet={styles}
                        />
                        <FlatList
                            style={{ margin: 10, marginBottom: 40, backgroundColor: '#ffffff', }}
                            data={this.state.news}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Text style={{ padding: 10 }}>{'No item to show'}</Text>}
                            contentContainerStyle={{ flexGrow: 1 }}
                            renderItem={({ item: rowdata }) => (
                                <TouchableOpacity
                                    onPress={() => { this.navigateToDetail(rowdata) }}>
                                    <View style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5', padding: 10 }}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            {rowdata.avatar && rowdata.avatar != null && <Image source={{ uri: rowdata.avatar }} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />}
                                            <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{rowdata.name}</Text>
                                        </View>
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                }
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
        padding: 10
    },
});