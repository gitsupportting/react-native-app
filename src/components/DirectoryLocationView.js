
import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapPin from '../assets/icons/map-pin.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const { width, height } = Dimensions.get('window')

export default class DirectoryLocationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directories: props.directories,
            url:props.url,
            isloading:props.isloading,
            curlat: props.curlat,
            curlng: props.curlng,
            marginBottom: 1,
        }
    }
    _onMapReady = () => this.setState({ marginBottom: 0 })
    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    curlat: position.coords.latitude,
                    curlng: position.coords.longitude,
                    error: null
                })
                _mapView.animateCamera(
                    {
                        center:
                        {
                            latitude: this.state.curlat,
                            longitude: this.state.curlng
                        }
                    },
                    1000
                )
            },
            error => {
                console.log(error)
                this.setState({ error: error.message })
            }
        )
    }
    reload() {
        this.setState({isloading:true, directories:[]})
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((res) => {
                if (res.message) {
                    this.setState({ isloading: false, directories: [],})
                    Alert.alert(res.message);
                } else {
                    this.setState({ isloading: false, directories: res.hits.hits })
                }
            })
            .catch((err) => {
                this.setState({ isloading: false, directories: [] })
                Alert.alert('Network Error!')
            })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f0f2f5', flex: 1, }}>
                <MapView
                    initialRegion={{
                        latitude: this.state.curlat,
                        longitude: this.state.curlng,
                        latitudeDelta: 0.28,
                        longitudeDelta: 0.28 * (width / height)
                    }}
                    style={{ width: width, height: height - 90, flex: 1, marginBottom: this.state.marginBottom, }}
                    ref={mapView => {
                        _mapView = mapView
                    }}
                >
                    <Marker
                        coordinate={{ latitude: this.state.curlat, longitude: this.state.curlng }}
                        title={"My Position"}
                    />
                    {this.state.directories.map(directory => (
                        directory._source.location && <Marker
                            coordinate={{ latitude: directory._source.location.lat, longitude: directory._source.location.lon }}
                            title={directory._source.name}
                            key={directory._id}
                            onCalloutPress={() => { this.props.navigation.navigate('DirectoryDetail', { directory: directory._source }) }}
                        >
                            <Image source={MapPin} />
                        </Marker>
                    ))}

                </MapView>
                <TouchableOpacity
                    style={styles.myLocationButton}
                    onPress={() => {
                        this.getCurrentPosition()
                    }}
                >
                    <MaterialCommunityIcons name='crosshairs-gps' size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.reloadButton}
                    onPress={() => {
                        this.reload()
                    }}
                >
                    <MaterialCommunityIcons name='reload' size={18} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
    myLocationButton: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        right: 45,
        padding: 5,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 5
    },
    reloadButton: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 5
    }
})