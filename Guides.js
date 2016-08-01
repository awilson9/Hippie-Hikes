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
      <TabBarIOS>
        <TabBarIOS.Item
          title="Home"
          selected={this.state.selectedTab==='Home'}
          onPress={() => {
            this.setState({
              selectedTab:'Home',
            });
          }}>
          <Homepage />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab==='Search'}
          onPress={() => {
            this.setState({
              selectedTab:'Search',
            });
        }}>
          <Search
          navigator = {this.props.navigator}
          />
        </TabBarIOS.Item>
        </TabBarIOS>
           );
       }
   })



module.exports = guides;
