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
        TabBarIOS,
        Dimensions} from 'react-native';


var WINDOW_WIDTH = Dimensions.get('window').width;
import Accordion from 'react-native-accordion';
import realm from './realm/index';
var Swiper = require('react-native-swiper');
var NavigationBar = require('react-native-navbar');

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
  constructNearMe(){
    var toReturn=[];
    var row_num = 1;
    var num_in_row = 1;
    var order_last = 0;
    this.props.shortest.forEach(function(guide, i){
      toReturn.push(
      <TouchableHighlight
        key={i} onPress={()=>this._navigate(guide)}>
        <View>
          <Image source = {{uri:guide+'site'}} resizeMode="cover" style={this.createStyle(row_num,num_in_row,order_last)}/>
        </View>
      </TouchableHighlight>);
      if(num_in_row==1)num_in_row=2;
      else if(num_in_row==2&&row_num==2){
        num_in_row=1;
        order_last=(order_last==0)?1:0;
        row_num=1;
      }
      else{
        row_num++;
      }
    }, this);
    return toReturn;
  },
  constructFavorites(){
    let favorites = realm.objects('Guide').filtered('favorited=true');
    var style = favorites.length;

    var toReturn=[];
    var row_num = 1;
    var num_in_row = 1;
    var order_last = 0;
      favorites.forEach(function(guide, i){
      realm.write(() => {
        guide.displayedElsewhere = 1
      });
      toReturn.push(
      <TouchableHighlight
        key={i} onPress={()=>this._navigate(guide.name)}>
        <View>
          <Image source = {{uri:guide.name+'site'}} resizeMode="cover" style={this.createStyle(row_num,num_in_row,order_last)}/>
        </View>
      </TouchableHighlight>
      );
      if(num_in_row==1)num_in_row=2;
      else if(num_in_row==2&&row_num==2){
        num_in_row=1;
        order_last=(order_last==0)?1:0;
        row_num=1;
      }
      else{
        row_num++;
      }
    }, this);
    return toReturn;
  },
  createStyle(row_num, num_in_row, order_last){
    if(num_in_row==1){
      return{
        margin:3,
        width: WINDOW_WIDTH-12,
        height:200
      }
    }
    else if(num_in_row==2&&order_last==0){
      if(row_num==1){
        return{
          margin:3,
          width: ((7*WINDOW_WIDTH)/16)-12,
          height:150
        }
      }
      else {
        return{
          margin:3,
          width: ((9*WINDOW_WIDTH)/16)-12,
          height:150
        }
      }
  }
  else if(num_in_row==2&&order_last==1){
    if(row_num==1){
      return{
        margin:3,
        width: ((9*WINDOW_WIDTH)/16)-12,
        height:150
      }
    }
    else {
      return{
        margin:3,
        width: ((7*WINDOW_WIDTH)/16)-12,
        height:150
      }
    }
  }
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
    <View style={{flex:1}}>
    <NavigationBar
    title={<View><Image style={{ width: 20, height: 20, marginRight: 5, }} source={require('./img/Logo-03.png')}/></View>}
    style={{borderBottomColor:'black',
            borderBottomWidth:.1,
          }}
    />
    <ScrollView style={{flex:1}}
    automaticallyAdjustContentInsets={false}
    contentInset={{bottom:49}}>
      {this.clearDisplay()}
      <NavigationBar
      title={<Text>Favorited</Text>}
      style={{borderBottomColor:'black',
              borderBottomWidth:.1}}
      />
      <View style={styles.descriptions}>
        {this.constructFavorites()}
      </View>

        <NavigationBar
        title={<Text>Near Me</Text>}
        style={{borderBottomColor:'black',
                borderBottomWidth:.1}}
        />
        <View style={styles.descriptions}>
        {this.constructNearMe()}
        </View>
        <NavigationBar
        title={<Text>Featured</Text>}
        style={{borderBottomColor:'black',
                borderBottomWidth:.1}}
        />

        <View style={styles.descriptions}>

        </View>
        <NavigationBar
        title={<Text>New Guides</Text>}
        style={{borderBottomColor:'black',
                borderBottomWidth:.1}}
        />
        <View style={styles.descriptions}>

        </View>
    </ScrollView>
    </View>
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
  descriptionWrapper:{
    flexDirection:'column',


  },
  descriptions:{
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',

  },
});

module.exports = homepage;
