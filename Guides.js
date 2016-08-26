'use strict';

import React, {Component} from 'react';
import { AppRegistry,
        Text,
        View,
        StyleSheet,
        Navigator,
        TouchableHighlight,
        Image,
        ScrollView,
        TabBarIOS } from 'react-native';

import Accordion from 'react-native-accordion';
import realm from './realm/index';
var Swiper = require('react-native-swiper');
import Icon from 'react-native-vector-icons/Ionicons';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import CustomTabBar from './CustomTabBar';
import Modal from 'react-native-modalbox';

var Guide = require('./guide');
var IndexMap = require('./indexMap');
var SearchBar = require('react-native-search-bar');

var Search = require('./search');
var Homepage = require('./homepage');

const accessToken = 'pk.eyJ1IjoiYXdpbHNvbjkiLCJhIjoiY2lyM3RqdGloMDBrbTIzbm1haXI2YTVyOCJ9.h62--AvCDGN25QoAJm6sLg';
var MapboxClient = require('mapbox/lib/services/directions');
var client = new MapboxClient(accessToken);

var guides = React.createClass({
  getInitialState: function() {
    return{
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      directions:{},
      shortest:[],
      selectedGuide:null,
    }
  },
  guideHandler(guide){
    this.setState({
      selectedGuide:guide
    });
    this.refs.guideModal.open();
  },
  componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.calculateRoutes(position);
      var initialPosition = position;
      this.setState({initialPosition});
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = position;
    this.setState({lastPosition});

    });

  },
  calculateRoutes(position){
    let guides = realm.objects('Guide');
    var self = this;
    var options = {
      profile:'mapbox.driving',
      geometry:'geojson'
    }
    guides.forEach(function(guide, i){
    var directions = self.state.directions;
      var waypoints = [{latitude:position.coords.latitude, longitude:position.coords.longitude},
          {latitude: guide.waypoints[0].latitude, longitude:guide.waypoints[0].longitude}];
          client.getDirections(waypoints,options, function(err, results){
            var direction = {results:results, description:guide.name_description};
            directions[guide.name] = direction;
            var length = Object.keys(directions).length;
              if(length==guides.length){
                self.setState({directions:directions});
                self.calculateShortest(self);
              }
            })
          });

  },
  calculateShortest(self){
    var routes = self.state.directions;
    var toSort = [];
    for (var route in routes){
      toSort.push([routes[route].results, route]);
    }
    toSort.sort(function(a, b){
      return a[0].routes[0].duration - b[0].routes[0].duration;
    });

    var shortest = [];
    for(var i=0;i<5;i++){
      shortest.push(toSort[i][1]);
    }
    self.setState({
      shortest:shortest
    });
  },
  closeModal(){
    this.refs.guideModal.close();
  },
  render() {
    return (
      <View style={{flex:1}}>
      <ScrollableTabView
      style={{marginTop: 20, flex:1}}
      initialPage={0}
      tabBarBackgroundColor={'#2ebbbe'}
      tabBarPosition={'bottom'}
      renderTabBar={() => <CustomTabBar />}
      >

          <Homepage tabLabel="md-home"
          navigator = {this.props.navigator}
          shortest = {this.state.shortest}
          guideHandler = {this.guideHandler}
          />


          <Search
          tabLabel="ios-search-outline"
          navigator = {this.props.navigator}
          guideHandler={this.guideHandler}
          />

        <IndexMap tabLabel="ios-compass"
          navigator={this.props.navigator}
          directions = {this.state.directions}
          position = {this.state.lastPosition}
          guideHandler = {this.guideHandler}
          />

        </ScrollableTabView>

        <Modal ref={'guideModal'} backdrop={false} swipeArea={20}>
          <Guide name={this.state.selectedGuide}
          guideHandler={this.guideHandler}
          closeModal={this.closeModal}/>
        </Modal>
        </View>
           );
       }
   })

module.exports = guides;
