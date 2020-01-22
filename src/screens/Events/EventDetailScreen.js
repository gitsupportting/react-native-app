import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import { NavBar } from '../../components/NavBar';
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as AddCalendarEvent from 'react-native-add-calendar-event';

import Swiper from 'react-native-swiper'
import MapView, { Marker } from 'react-native-maps';
import openMap, { createOpenLink } from 'react-native-open-maps';
import call from 'react-native-phone-call';
import HTMLView from 'react-native-htmlview';

import MapPin from '../../assets/icons/map-pin.png'
const { width, height } = Dimensions.get('window')

const month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export default class EventDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: this.props.navigation.state.params.event,
            curlat: 0,
            curlng: 0,
        }
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    curlat: position.coords.latitude,
                    curlng: position.coords.longitude,
                    error: null
                })

            },
            error => {
                console.log(error)
                this.setState({ error: error.message })
            }
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <NavBar {...this.props} />
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <Text style={{ color: '#f15922', fontSize: 15, paddingBottom: 5 }} numberOfLines={1}>{this.state.event.summary}</Text>
                        {this.state.event.dtstart.substring(11) != this.state.event.dtend.substring(11) && this.state.event.dtstart.substring(0, 11) == this.state.event.dtend.substring(0, 11) && <Text style={{ color: '#473a313f', fontSize: 10, }} numberOfLines={1}>{this.state.event.dtstart.substring(11) + ' - ' + this.state.event.dtend.substring(11)}</Text>}
                    </View>


                    {this.state.event.images != null && this.state.event.images != '' && this.state.event.images.length != 0 && <Swiper style={{ height: width / 2 }}>
                        {this.state.event.images.map((item, index) => {
                            return (
                                <Image source={{ uri: item }} key={index} style={{ width: '100%', height: width * 15 / 32 }} resizeMode='cover' resizeMethod="resize" />
                            )
                        })}
                    </Swiper>}
                    <View style={{ display: 'flex', margin: 10, flexDirection: 'row', borderBottomColor: '#473a313f', borderTopColor: '#473a313f', borderBottomWidth: 1, borderTopWidth: 1 }}>
                        <Text style={{ fontSize: 20, width: '40%', textAlign: 'center', color: '#473a31', paddingVertical: 10 }}>{month_name[new Date(this.state.event.dtstart).getMonth()]}</Text>
                        <Text style={{ fontSize: 20, width: '30%', textAlign: 'center', color: '#f15922', borderLeftColor: '#473a313f', borderLeftWidth: 1, paddingVertical: 10 }}>{('0' + (new Date(this.state.event.dtstart).getDate())).slice(-2)}</Text>
                        <Text style={{ fontSize: 20, width: '30%', textAlign: 'center', color: '#473a31', borderLeftColor: '#473a313f', borderLeftWidth: 1, paddingVertical: 10 }}>{new Date(this.state.event.dtstart).getFullYear()}</Text>
                    </View>
                    <HTMLView
                        value={'<div>' + this.state.event.description + '</div>'}
                        stylesheet={styles}
                    />

                    <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="dollar" style={{ fontSize: 15, color: '#f15922', }} />
                            <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>{this.state.event.price}</Text>
                        </View>
                        <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                    </View>

                    {this.state.event.contact != null && this.state.event.contact != '' && <TouchableOpacity onPress={() => {
                        const args = {
                            number: this.state.event.phone,
                            prompt: false,
                        };
                        call(args).catch(console.error);
                    }}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="phone" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Call</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}
                    {this.state.event.address != null && this.state.event.address != '' &&
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicon name="ios-pin" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, width: width - 80 }} numberOfLines={1}>{this.state.event.address}</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    }

                    {this.state.event.location != null && this.state.event.location != '' && <TouchableOpacity onPress={() => openMap({ end: this.state.event.location.lat + ", " + this.state.event.location.lon, start: this.state.curlat + ", " + this.state.curlng })}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicon name="ios-compass" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>{'Directions'}</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}



                    {this.state.event.ticketsurl != '' && this.state.event.ticketsurl != null && <TouchableOpacity onPress={() => Linking.openURL(this.state.event.ticketsurl)}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="ticket" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Get Tickets</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}

                    {this.state.event.website != '' && this.state.event.website != null && <TouchableOpacity onPress={() => Linking.openURL(this.state.event.website)}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="globe" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Visit Website</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
                        </View>
                    </TouchableOpacity>}
                    {<TouchableOpacity onPress={() => AddCalendarEvent.presentEventCreatingDialog({ title: this.state.event.summary, startDate: this.state.event.dtstart.split('+')[0] + '.000Z', endDate: this.state.event.dtend.split('+')[0] + '.000Z' })
                        .then((eventInfo) => {
                            alert('Successfully added to calendar!')
                        })
                        .catch((error) => {
                            console.warn(error)
                        })}>
                        <View style={{ backgroundColor: '#61544B05', justifyContent: 'space-between', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome name="calendar" style={{ fontSize: 15, color: '#f15922', }} />
                                <Text style={{ color: '#473a31', fontSize: 12, paddingHorizontal: 10, }}>Add to Calendar</Text>
                            </View>
                            <Ionicon name="ios-arrow-forward" style={{ fontSize: 15, color: '#473a313f', }} />
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
