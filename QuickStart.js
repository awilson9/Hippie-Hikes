'use strict';

import React, {Component} from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    description: {
       fontSize: 20,
       backgroundColor: 'white'
       },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
       }
   });

class QuickStart extends Component {
       render() {
           return (
     	    <View style={styles.container}>
   	        <Text style={styles.description}>
           	  Quick Start Tab
   	        </Text>
   	    </View>
           );
       }
   }
module.exports = QuickStart;
