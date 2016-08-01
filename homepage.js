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

var homepage = React.createClass({
  _navigate(name){
    this.props.navigator.push({
      component:guide,
      passProps:{
        name: name,
      }
    })
  },

  createSwipers(type){
    var toReturn = [];
    let results = realm.objects('Guide');
    if(type=='new_guides') {
      results = results.filtered('new=true AND displayedElsewhere=0');
    }
    else if(type=='featured') {
      results = results.filtered('featured=true AND displayedElsewhere=0');
    }
    else if (type=='near_me') {
      results = results.filtered('near_me=true AND displayedElsewhere=0');
    }
    else if (type=='favorited'){
      results = results.filtered('favorited=true AND displayedElsewhere=0');
    }
    for(var i=0;(i<=5)&&i<results.length;i++){
      var guide = results[i];
      realm.write(() => {
        guide.displayedElsewhere = 1
      });
      toReturn.push(
      <TouchableHighlight
        key={i} onPress={()=>this._navigate(guide.name, guide.gallSize)}>
        <View>
          <Image source = {{uri:guide.name+'site'}} resizeMode="contain" style={styles.contain}/>
        </View>
      </TouchableHighlight>
      );
    }
    return toReturn;
  },
  clearDisplay(){
    let guides = realm.objects('Guide');
    for(var i=0;i<guides.length;i++){
      realm.write(()=>{
        guides[i].displayedElsewhere=0
      });
    }
  },
  render(){
    return(
    <ScrollView>
      <Text style={styles.header}>Favorited</Text>
      <Swiper height={240}
        style={styles.swiper}
        onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
        {this.createSwipers('favorited')}
      </Swiper>
      <Text style={styles.header}>Near Me</Text>
      <Swiper height={240}
        style={styles.swiper}
        onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
        {this.createSwipers('near_me')}
      </Swiper>
      <Text style={styles.header}>Featured</Text>
      <Swiper
        style={styles.swiper}
        height={240}
        onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
        {this.createSwipers('featured')}
      </Swiper>
      <Text style={styles.header}>New Guides</Text>
      <Swiper height={240}
        style={styles.swiper}
        onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
        paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
        {this.createSwipers('new_guides')}
      </Swiper>
    </ScrollView>
  );
}
});

var styles = StyleSheet.create({
  swiper:{
    marginTop:20
  },
  header:{
    fontSize:30,
    position:'relative',
    top:15
  },
  contain: {
    flex: 1,
    height:250
  },
});

module.exports = homepage;
