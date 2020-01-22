import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import { NavBar } from '../../components/NavBar';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview';

import Swiper from 'react-native-swiper'
import MapView, { Marker } from 'react-native-maps';
import openMap, { createMapLink } from 'react-native-open-maps';
import call from 'react-native-phone-call';

import MapPin from '../../assets/icons/map-pin.png'
const { width, height } = Dimensions.get('window')



export default class DirectoryDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directory: this.props.navigation.state.params.directory,
            curlat: 0,
            curlng: 0
        }
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ curlat: position.coords.latitude, curlng: position.coords.longitude })
        }, (err) => {
            console.warn(err);
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <NavBar {...this.props} />
                <ScrollView style={{ flex: 1, }}>

                    <View style={{ flex: 1, margin: 10 }}>
                        <Text style={{ color: '#f15922', fontSize: 15, paddingBottom: 5 }} numberOfLines={1}>{this.state.directory.name}</Text>
                        {this.state.directory.address != null && this.state.directory.address != '' && <View style={{ flexDirection: 'row', paddingBottom: 3, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#473a313f' }}>
                            <Icon name="ios-pin" style={{ fontSize: 12, color: '#473a313f', paddingRight: 5 }} />
                            <Text style={{ color: '#473a313f', fontSize: 8, }} numberOfLines={1}>{this.state.directory.address}</Text>
                        </View>}
                    </View>
                    {this.state.directory.images != null && this.state.directory.images != '' && this.state.directory.images.length != 0 && <Swiper style={{ height: width / 2 }}>
                        {this.state.directory.images.map((item, index) => {
                            return (
                                <Image source={{ uri: item }} key={index} style={{ width: '100%', height: width * 15 / 32 }} resizeMode='cover' resizeMethod="resize" />
                            )
                        })}
                    </Swiper>}
                    {this.state.directory.openingHours != null && this.state.directory.openingHours != '' && <View style={{ backgroundColor: '#61544B05', flex: 1 }}>
                        <Text style={{ color: '#473a31', fontSize: 12, padding: 10, }}>Opening hours</Text>
                    </View>}
                    {this.state.directory.openingHours != null && this.state.directory.openingHours != '' && <Text style={{ color: '#473a31', fontSize: 12, padding: 10, }}>{this.state.directory.openingHours}</Text>}
                    {this.state.directory.description != '' && this.state.directory.description != null && <View style={{ backgroundColor: '#61544B05', flex: 1 }}>
                        <Text style={{ color: '#473a31', fontSize: 12, padding: 10, }}>Description</Text>
                    </View>}
                    {this.state.directory.description != '' && this.state.directory.description != null && <HTMLView
                        value={'<div>' + this.state.directory.description + '</div>'}
                        stylesheet={styles}
                    />}
                    {this.state.directory.location != null && <View style={{ backgroundColor: '#61544B05', flex: 1 }}>
                        <Text style={{ color: '#473a31', fontSize: 12, padding: 10, }}>Location Info</Text>
                    </View>}
                    {this.state.directory.location != null && <MapView
                        initialRegion={{
                            latitude: this.state.directory.location.lat,
                            longitude: this.state.directory.location.lon,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005 * (width / height)
                        }}
                        style={{ width: width, height: height / 3 }}
                        zoomEnabled={false}
                        onPress={() => { this.props.navigation.navigate('DetailedMap', { lat: this.state.directory.location.lat, lon: this.state.directory.location.lon, curlat: this.state.curlat, curlng: this.state.curlng }) }}
                    >
                        <Marker
                            coordinate={{ latitude: this.state.directory.location.lat, longitude: this.state.directory.location.lon, }}
                        >
                            <Image source={MapPin} />
                        </Marker>
                    </MapView>}
                    {this.state.directory.location != null && this.state.directory.location != '' && <TouchableOpacity onPress={() => openMap({ end: this.state.directory.location.lat + ", " + this.state.directory.location.lon, start: this.state.curlat + ", " + this.state.curlng })}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="ios-compass" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Directions</Text>
                            </View>
                            <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}

                    {this.state.directory.phone != null && this.state.directory.phone != '' && <TouchableOpacity onPress={() => {
                        const args = {
                            number: this.state.directory.phone,
                            prompt: false,
                        };
                        call(args).catch(console.error);
                    }}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="phone" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Call</Text>
                            </View>
                            <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}

                    {this.state.directory.website != null && this.state.directory.website != '' && <TouchableOpacity onPress={() => Linking.openURL(this.state.directory.website)}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="globe" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Visit Website</Text>
                            </View>
                            <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}

                    {this.state.directory.email != null && this.state.directory.email != '' && <TouchableOpacity onPress={() => Linking.openURL('mailto:' + this.state.directory.email)}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <Icon name="ios-mail" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Email</Text>
                            </View>
                            <Icon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}
                </ScrollView>
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
        padding: 10,
    },
});
