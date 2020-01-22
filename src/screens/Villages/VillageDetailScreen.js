import React, { Component } from 'react';

import { Image, View, ScrollView, Text, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { NavBar } from '../../components/NavBar';
import { BubblesLoader } from 'react-native-indicator';

import Swiper from 'react-native-swiper'

import Icon from 'react-native-vector-icons/Ionicons'

import Info from '../../assets/icons/information.png';
import Calendar from '../../assets/icons/calendar.png';
import Instagram from '../../assets/icons/instagram.png';
import WWW from '../../assets/icons/www.png'
import Business from '../../assets/icons/house.png'
const { width, height } = Dimensions.get('window');

export default class VillageDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            village: this.props.navigation.state.params.village,
            value: this.props.navigation.state.params.value,
            isloading: true,
        }
    }

    componentWillMount() {
        if (!this.state.village) {
            fetch('https://api.snowyguide.com/dev/locations', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((res) => {
                    if (res.message) {
                        this.setState({ isloading: false, village: {} })
                        Alert.alert(res.message);
                    } else {
                        var that = this;
                        var found = res.filter(function (item) { return item.value == that.state.value; });
                        this.setState({ village: found[0], isloading: false });
                    }
                })
                .catch((err) => {
                    this.setState({ isloading: false, village: {} })
                    Alert.alert('Network Error!')
                })
        } else {
            this.setState({ isloading: false })
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                {
                    this.state.isloading ?
                        <View style={{ height: height / 2, width: width, alignItems: 'center', justifyContent: 'center' }}>
                            <BubblesLoader color="#f15922" />
                        </View> :

                        this.state.village.titleimage && this.state.village.titleimage != 'empty' &&
                        <Image source={{ uri: this.state.village.titleimage }} style={{ width: '100%', height: width * 0.22 }} resizeMode='cover' />
                }

                {!this.state.isloading &&
                    <ScrollView style={{ flex: 1, }}>
                        {this.state.village.galleryimages && this.state.village.galleryimages != 'empty' &&
                            <Swiper style={{ height: width * 15 / 32 }}>
                                {this.state.village.galleryimages.map((item, index) => {
                                    return (
                                        <Image source={{ uri: item }} key={index} style={{ width: '100%', height: width * 15 / 32 }} resizeMode='cover' resizeMethod="resize" />
                                    )
                                })}
                            </Swiper>
                        }
                        {this.state.village.introtext && this.state.village.introtext != 'empty' &&
                            <Text style={{ margin: 10, padding: 10, color: '#61544b', backgroundColor: 'white' }}>{this.state.village.introtext}</Text>
                        }
                        <View style={{ marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: 'white' }}>
                            {this.state.village.abouttext && this.state.village.abouttext != 'empty' &&
                                <TouchableOpacity
                                    style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }}
                                    onPress={() => { this.props.navigation.navigate('VillageAbout', { village: this.state.village }) }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={Info} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{"About " + this.state.village.value}</Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                </TouchableOpacity>
                            }
                            {
                                < TouchableOpacity
                                    style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }}
                                    onPress={() => { this.props.navigation.navigate('EventsList', { location: this.state.village, from: 'village' }) }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={Calendar} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{this.state.village.value + " Events"}</Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                </TouchableOpacity>
                            }
                            {this.state.village.instagram && this.state.village.instagram != 'empty' &&
                                <TouchableOpacity
                                    style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }}
                                    onPress={() => { this.props.navigation.navigate('Url', { url: "https://instagram.com/" + this.state.village.instagram }) }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={Instagram} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{this.state.village.instagram}</Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                </TouchableOpacity>
                            }
                            {this.state.village.website && this.state.village.website != 'empty' &&
                                <TouchableOpacity
                                    style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }}
                                    onPress={() => { this.props.navigation.navigate('Url', { url: this.state.village.website }) }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={WWW} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{"Visit " + this.state.village.value}</Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                </TouchableOpacity>
                            }
                            {
                                <TouchableOpacity
                                    style={{ height: 80, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f2f5' }}
                                    onPress={() => { this.props.navigation.navigate('DirectoryList', { village: this.state.village, from: 'village' }) }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={Business} style={{ height: 60, width: 60 }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={{ color: '#f15922', fontSize: 15, paddingLeft: 10 }}>{"Business Directory"}</Text>
                                    </View>
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a31' }} />
                                </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}