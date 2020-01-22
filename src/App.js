/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';

import HomeScreen from './HomeScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import VillageListScreen from './screens/Villages/VillageListScreen';
import VillageDetailScreen from './screens/Villages/VillageDetailScreen';
import VillageAboutScreen from './screens/Villages/VillageAboutScreen';
import DirectoryListScreen from './screens/Directory/DirectoryListScreen';
import NewsScreen from './screens/News/NewsScreen';
import EventsListScreen from './screens/Events/EventsListScreen';
import DirectoryCategoryScreen from './screens/Directory/DirectoryCategoryScreen';
import EventsCategoryScreen from './screens/Events/EventsCategoryScreen';
import NewsDetailScreen from './screens/News/NewsDetailScreen';
import DirectoryDetailScreen from './screens/Directory/DirectoryDetailScreen'
import EventDetailScreen from './screens/Events/EventDetailScreen';
import AdviceScreen from './screens/Advice/AdviceScreen';
import AdviceDetailScreen from './screens/Advice/AdviceDetailScreen';
import CouncilScreen from './screens/Council/CouncilScreen';
import CouncilDetailScreen from './screens/Council/CouncilDetailScreen';
import SosScreen from './screens/SOS/SosScreen';
import SosDetailScreen from './screens/SOS/SosDetailScreen';
import UrlScreen from './screens/UrlScreen';
import DetailedMapScreen from './screens/DetailedMapScreen';
import TransportScreen from './screens/Transport/TransportScreen';
import TransportDetailScreen from './screens/Transport/TransportDetailScreen';
import PetrolScreen from './screens/Petrol/PetrolScreen';
import PetrolDetailScreen from './screens/Petrol/PetrolDetailScreen';
const Navigation = createStackNavigator({
  Home: {
    screen: HomeScreen,    
  },
  VillageList: {
    screen: VillageListScreen,    
  },
  VillageDetail: {
    screen:VillageDetailScreen
  }, 
  VillageAbout: {
    screen: VillageAboutScreen
  },  
  EventsCategory:{
    screen:EventsCategoryScreen
  },
  EventsList:{
    screen:EventsListScreen
  },
  EventDetail:{
    screen:EventDetailScreen
  },
  DirectoryCategory:{
    screen:DirectoryCategoryScreen
  },
  DirectoryList:{
    screen:DirectoryListScreen
  },
  DirectoryDetail:{
    screen:DirectoryDetailScreen
  },
  News:{
    screen:NewsScreen
  },
  NewsDetail:{
    screen:NewsDetailScreen
  },
  Advice:{
    screen:AdviceScreen
  },
  AdviceDetail: {
    screen:AdviceDetailScreen
  },
  Council:{
    screen:CouncilScreen
  },
  CouncilDetail:{
    screen:CouncilDetailScreen
  },
  SOS:{
    screen:SosScreen
  },
  SOSDetail:{
    screen:SosDetailScreen
  },
  Transport:{
    screen:TransportScreen
  },
  TransportDetail:{
    screen:TransportDetailScreen
  },
  Petrol:{
    screen:PetrolScreen
  },
  PetrolDetail:{
    screen:PetrolDetailScreen
  },
  Url:{
    screen:UrlScreen
  },
  DetailedMap:{
    screen:DetailedMapScreen
  }
}, {
    initialRouteName: 'Home',
    headerMode:'none',
    navigationOptions:{
    }
  })

const App = createAppContainer(Navigation);

export default App;


