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



var HippieHikes = React.createClass({

  renderScene(route, navigator){
    return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  },
  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        initialRoute={{ component: Home }}
        renderScene={ this.renderScene } />
    )
  }
});

var swiper = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    )
  }
})


var Home = React.createClass({
  _navigateQS() {
    this.props.navigator.push({
      component:quickstart
    })
  },
  _navigateGuides(){
    this.props.navigator.push({
      component:guides
    })
  },
  _navigateMH(){
    this.props.navigator.push({
      component:MyHikes

      
    });
  },
  _navigateStore(){
    this.props.navigator.push({
      component:store
    })
  },
  _navigateAbout(){
    this.props.navigator.push({
      component:about
    })
  },


  render(){
    return(
      <View style={styles.scene}>
      <View style={styles.horizontal}>
      <TouchableHighlight onPress={ () => this._navigateQS()}>
        <View style={styles.imgcontainer}>
          <Image source={require('./img/capitalreefsite.jpg')}>
            <Text style={styles.category}>Quick Start</Text>
          </Image>
        </View>
      </TouchableHighlight>
        <TouchableHighlight onPress={ () => this._navigateGuides()}>
          <View style={styles.imgcontainer}>
            <Image source={require('./img/blanchesitearticle.jpg')}>
              <Text style={styles.category}>Guides</Text>
            </Image>
          </View>
        </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={ () => this._navigateMH()}>
          <View style={styles.imgcontainer}>
            <Image source={require('./img/grandaddyarticle.jpg')}>
            <Text style={styles.category}>My Hikes</Text>
            </Image>
          </View>
        </TouchableHighlight>
        <View style={styles.horizontal}>
        <TouchableHighlight onPress={ () => this._navigateStore()}>
          <View style={styles.imgcontainer}>
            <Image source={require('./img/brycesitearticle.jpg')}>
            <Text style={styles.category}>Store</Text>
            </Image>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._navigateAbout()}>
          <View style={styles.imgcontainer}>
            <Image source={require('./img/cascadesite8article.jpg')}>
            <Text style={styles.category}>About</Text>
            </Image>
          </View>
        </TouchableHighlight>
        </View>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  wrapper: {
   },
   slide1: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#9DD6EB',
   },
   slide2: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#97CAE5',
   },
   slide3: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#92BBD9',
   },
   text: {
     color: '#fff',
     fontSize: 30,
     fontWeight: 'bold',
   },
    imgcontainer:{
      paddingTop:10,
      paddingRight:10
    },
    horizontal:{
      flexDirection:'row'
    },
    container: {
        flex: 1
    },
    scene: {
        padding: 10,
        paddingTop: 74,
        flex: 1
    },
    category: {
      fontSize: 20,
      paddingTop:45,
      color: 'white',
      textAlign:'center'
    }
});

AppRegistry.registerComponent('HippieHikes', () => HippieHikes);
