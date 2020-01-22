
import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { NavBar } from '../components/NavBar';

import MapView, { Marker } from 'react-native-maps';
import MapPin from '../assets/icons/map-pin.png'
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window')

export default class DetailedMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.navigation.state.params.lat,
            lng: this.props.navigation.state.params.lon,
            curlat: this.props.navigation.state.params.curlat,
            curlng: this.props.navigation.state.params.curlng,
            address: this.props.navigation.state.params.address,
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <NavBar {...this.props} />
                <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                    <MapView
                        initialRegion={{
                            latitude: (this.state.lat + this.state.curlat) / 2,
                            longitude: (this.state.lng + this.state.curlng) / 2,
                            latitudeDelta: Math.abs(this.state.curlat - this.state.lat) + 0.05,
                            longitudeDelta: Math.abs(this.state.curlng - this.state.lng) + 0.05
                        }}
                        style={{ width: width, height: height - 90, }}

                    >
                        {this.state.curlat != 0 && this.state.curlng != 0 && <Marker
                            coordinate={{ latitude: this.state.curlat, longitude: this.state.curlng }}
                            title={"My Position"}
                        />}
                        <Marker
                            coordinate={{ latitude: this.state.lat, longitude: this.state.lng }}
                        >
                            <Image source={MapPin} />
                        </Marker>
                        <MapViewDirections
                            origin={{ latitude: this.state.curlat, longitude: this.state.curlng }}
                            destination={this.state.address ? this.state.address : { latitude: this.state.lat, longitude: this.state.lng }}
                            apikey={'AIzaSyDlyrR1zfX2OgpU4HNbwaP_RigDY9Fl8xg'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>

                </View>
            </View>
        );
    }
}