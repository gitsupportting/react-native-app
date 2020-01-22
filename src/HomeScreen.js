import React, { Component } from 'react'


import { View, ImageBackground, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper';
import { FlatGrid } from 'react-native-super-grid';

const { width, height } = Dimensions.get('window')

const ItemPan1 = [
    { name: 'Villages', path: 'VillageList', params: {} }, { name: 'Attractions', path: 'DirectoryList', params: { id: 29, from: 'category' } }, { name: 'Events', path: 'EventsCategory', params: {} },
    { name: 'Cooma', path: 'VillageDetail', params: { value: "Cooma" } }, { name: 'Jindabyne', path: 'VillageDetail', params: { value: "Jindabyne" } }, { name: 'Bombala', path: 'VillageDetail', params: { value: "Bombala" } },
    { name: 'News', path: 'News', params: {} }, { name: 'SOS', path: 'SOS', params: {} }, { name: 'Petrol', path: 'Petrol', params: {} },
];

const ItemPan2 = [
    { name: 'Directory', path: 'DirectoryCategory', params: {} }, { name: 'Public Toilet', path: 'DirectoryList', params: { id: 20, from: 'category' } }, { name: 'Tourist', path: 'DirectoryList', params: { id:34, from: 'category' } },
    { name: 'ATM/Banks', path: 'DirectoryList', params: { id: 4, from: 'category' } }, { name: 'Payphone', path: 'DirectoryList', params: { id: 17, from: 'category' } }, 
    // { name: 'Advice', path: 'Advice', params: {} },
    { name: 'Transport', path: 'Transport', params: { } }, { name: 'Council', path: 'Council', params: {} },
];

const getIcon = (icon) => {
    switch (icon.name) {
        case 'Villages':
            return require('./assets/icons/villages.png')
            break;
        case 'Attractions':
            return require('./assets/icons/attractions.png')
            break;
        case 'Events':
            return require('./assets/icons/events.png')
            break;
        case 'Cooma':
            return require('./assets/icons/location.png')
            break;
        case 'Jindabyne':
            return require('./assets/icons/location.png')
            break;
        case 'Bombala':
            return require('./assets/icons/location.png')
            break;
        case 'News':
            return require('./assets/icons/news.png')
            break;
        case 'SOS':
            return require('./assets/icons/sos.png')
            break;
        case 'Petrol':
            return require('./assets/icons/petrol.png')
            break;
        case 'Directory':
            return require('./assets/icons/directory.png')
            break;
        case 'Public Toilet':
            return require('./assets/icons/toilet.png')
            break;
        case 'Tourist':
            return require('./assets/icons/tourist.png')
            break;
        case 'ATM/Banks':
            return require('./assets/icons/bank.png')
            break;
        case 'Payphone':
            return require('./assets/icons/payphone.png')
            break;
        case 'Advice':
            return require('./assets/icons/advice.png')
            break;
        case 'Transport':
            return require('./assets/icons/transport.png')
            break;
        case 'Council':
            return require('./assets/icons/council.png')
            break;
        case 'Settings':
            return require('./assets/icons/settings.png')
            break;
        default:
            break;
    }
}

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View>
                <ImageBackground source={require('./assets/homepage.png')} style={{ width: width, height: height }} resizeMode='contain' resizeMethod='resize'>
                    <Swiper loop={false}
                        dotStyle={{ width: 5, height: 5 }}
                        activeDotStyle={{ backgroundColor: 'transparent', borderColor: 'rgba(0,0,0,.2)', borderWidth: 1, width: 5, height: 5 }}>
                        <FlatGrid
                            itemDimension={(width - 50) / 3}
                            items={ItemPan1}
                            style={styles.gridView}
                            renderItem={({ item, index }) => {
                                const icon = getIcon(item)
                                return (
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'transparent', height: 100, justifyContent: 'center', textAlign: 'center' }}
                                        onPress={() => { this.props.navigation.navigate(item.path, item.params) }}>
                                        <Image source={icon} style={{ height: 60, width: '100%' }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <FlatGrid
                            itemDimension={(width - 50) / 3}
                            items={ItemPan2}
                            style={styles.gridView}
                            renderItem={({ item, index }) => {
                                const icon = getIcon(item)
                                return (
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'transparent', height: 100, justifyContent: 'center', textAlign: 'center' }}
                                        onPress={() => { this.props.navigation.navigate(item.path, item.params) }}>
                                        <Image source={icon} style={{ height: 60, width: '100%' }} resizeMethod='resize' resizeMode='contain' />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </Swiper>
                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
        position: 'absolute',
        bottom: 30,
        left: 0
    },
    itemContainer: {
        height: 100,
    },
    itemName: {
        fontSize: 15,
        color: '#58585a',
        textAlign: 'center'
    },

});