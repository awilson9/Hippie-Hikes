'use strict';
import React, {Component} from 'react';
import { AppRegistry,
        Text,
        View,
        StyleSheet,
        Navigator,
        TouchableHighlight,
        Image } from 'react-native';

var quickstart = require('./QuickStart');

var store = require('./store');
var about = require('./about');
var MyHikes = require('./maps');
var guides = require('./Guides');
var IndexMap = require('./indexMap');



var HippieHikes = React.createClass({

  renderScene(route, navigator){
    return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  },
  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        initialRoute={{ component: guides }}
        renderScene={ this.renderScene } />
    )
  }
});
AppRegistry.registerComponent('HippieHikes', () => HippieHikes);
