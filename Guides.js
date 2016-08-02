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
import CustomTabBar from './CustomTabBar'

var guide = require('./guide');
var IndexMap = require('./indexMap');
var SearchBar = require('react-native-search-bar');

var Search = require('./search');
var Homepage = require('./homepage');


var guides = React.createClass({
  getInitialState: function() {
    return{
      selectedTab:'Home'
    }
  },
  render() {
    return (
      <ScrollableTabView
      style={{marginTop: 20, }}
      initialPage={0}
      tabBarPosition={'bottom'}
      renderTabBar={() => <CustomTabBar />}
      >

          <Homepage tabLabel="md-home"
          navigator = {this.props.navigator}
          />


          <Search
          tabLabel="ios-search-outline"
          navigator = {this.props.navigator}
          />

        <IndexMap tabLabel="ios-compass"
          navigator={this.props.navigator}/>


        </ScrollableTabView>
           );
       }
   })



module.exports = guides;
