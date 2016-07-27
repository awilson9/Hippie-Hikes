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



var guides = React.createClass({

      _navigate(name, gallsize){
        this.props.navigator.push({
          component:guide,
          passProps:{
            name: name,
            gallsize:gallsize
          }
        })
      },
      getInitialState: function() {
        return{
          selectedTab:'Home',
          selectedTags:{
            difficulty:null,
            hike_type:null,
            day_length:null,
            state:{
              name:null,
              area:null
            }
          }
        }
      },
      updateStates:function(state){
        var toReplace = this.state.selectedTags;
        if(toReplace.state.name==state){
          toReplace.state.name = null;
          toReplace.state.area = null;
        }
        else{
          toReplace.state.name = state;
          toReplace.state.area=null;
        }


        this.setState({
          selectedTags: toReplace
        });
      },
      updateAreas:function(area){
        var toReplace = this.state.selectedTags;
        if(toReplace.state.area==area){
          toReplace.state.area = null;
        }
        else{
          toReplace.state.area = area;
        }


        this.setState({
          selectedTags: toReplace
        });
      },

      updateTags: function(tag){
        let tags = realm.objects('Tag').filtered('name=$0', tag)[0];
        var toReplace = this.state.selectedTags;
        if(toReplace[tags.type]==tags.name){
          toReplace[tags.type] = null;
        }
        else{
          toReplace[tags.type] = tags.name;
        }


        this.setState({
          selectedTags: toReplace
        });
    },
    displayGuides: function(){
      var state = this.state.selectedTags.state.name;
      var area = this.state.selectedTags.state.area;
      var difficulty = this.state.selectedTags.difficulty;
      var day_length = this.state.selectedTags.day_length;
      var hike_type = this.state.selectedTags.hike_type;
      let guides = realm.objects('Guide');
      guides.forEach(function(item){
        var contains_difficulty = false;
        var contains_day_length = false;
        var contains_hike_type = false;
        var display = false;
        if(state==null||item.location_loc.state==state){
          if(area==null||item.location_loc.description==area){
            item.tags.forEach(function(item_2){
              if((difficulty==null)||(item_2.name==difficulty)){
                contains_difficulty=true;
              }
              if((day_length)==null||(item_2.name==day_length)){
                contains_day_length = true;
              }
              if((hike_type==null) || (item_2.name==hike_type)){
                contains_hike_type = true;
              }

          });
        }
      }
          var dis = ((contains_hike_type)&&(contains_day_length)&&(contains_difficulty)) ? 1 : 0;
            realm.write(()=>{
              item.display = dis
            });

      });

      guides = realm.objects('Guide').filtered('display=1');
      var guideElements = [];
      guides.forEach(function(item,i){
        guideElements.push(
          <TouchableHighlight
          underlayColor={'#2ebbbe'}
          key={i} onPress={()=>this._navigate(item.name, item.gallSize)}>
            <View>
              <Image source = {{uri:item.name+'site'}} resizeMode="contain" style={styles.contain}/>
            </View>
          </TouchableHighlight>
        );
      }, this);
      return guideElements;
    },
      createStateAreas: function(state){
        let query = realm.objects('Region').filtered('state=$0', state);
        var elements = [];
        query.forEach(function(item,i){
          elements.push(
            <View key={i}>
            <TouchableHighlight onPress={()=>this.updateAreas(item.description)}>
             <Text style={styles.textborder}>{item.description}</Text>
           </TouchableHighlight>
           </View>
          );
        }, this);
        return elements;
      },
      createStateStyles: function(){
        if(this.state.selectedTags.state.name=='UT'){
          return {
            height:400
          }
        }
        else if(this.state.selectedTags.state.name=='WY'){
          return {
            height:150
          }
        }
        else if(this.state.selectedTags.state.name=='ID'){
          return {
            height:150
          }
        }
      },
      selectedColor: function(tag){
        if((this.state.selectedTags.hike_type==tag)||(this.state.selectedTags.difficulty==tag)||(this.state.selectedTags.day_length==tag)){
        return {
            borderWidth: 2,
            borderColor:'#2ebbbe',
            overflow:'hidden',
            fontSize:15,
            color: 'white',
            backgroundColor:'#2ebbbe',
            padding: 15,
            borderRadius:4,
            margin:3
        }
      }
        else{
          return {
              borderWidth: 2,
              borderColor:'#2ebbbe',
              overflow:'hidden',
              fontSize:15,
               color: '#696969',
              padding: 15,
              backgroundColor:'white',
              borderRadius:4,
              margin:3
          }
        }
      },
      createButtons: function(type){
        let query = realm.objects('Tag').filtered('type=$0', type);
        var content = [];
        query.forEach(function(item, i){
          content.push(
          <View key={i}>
            <TouchableHighlight
            underlayColor={'#2ebbbe'}
            onPress={()=>this.updateTags(item.name)}>
              <Text style={this.selectedColor(item.name)}>{item.name}</Text>
            </TouchableHighlight>
          </View>
          );

        }, this);
        return content;
      },
      createSwipers(type){
        var toReturn = [];
        let results = realm.objects('Guide');
        if(type=='new_guides') {
          results = results.filtered('new=true');
        }
        else if(type=='featured') {
          results = results.filtered('featured=true');
        }
        else if (type=='near_me') {
          results = results.filtered('near_me=true');
        }
        else if (type=='favorited'){
          results = results.filtered('favorited=true');
        }
        results.forEach(function(guide, i){
          toReturn.push(
          <TouchableHighlight
            key={i} onPress={()=>this._navigate(guide.name, guide.gallSize)}>
            <View>
              <Image source = {{uri:guide.name+'site'}} resizeMode="contain" style={styles.contain}/>
            </View>
          </TouchableHighlight>
        );
      }, this);
      return toReturn;
    },
       render() {
         var selectedTags = [];
         var i=0;
         for(var item in this.state.selectedTags){
           if(this.state.selectedTags[item]!=null&&(!typeof(this.state.selectedTags[item]==="object"))){
             selectedTags.push(
               <View key={i++}>
                 <Text>{this.state.selectedTags[item]}</Text>
               </View>
           );
         }
         }
         var UTcontent = this.createStateAreas('UT');
         var WYcontent = this.createStateAreas('WY');
         var IDcontent = this.createStateAreas('ID');
         var favorited = this.createSwipers('favorited');
         var featured = this.createSwipers('featured');
         var near_me = this.createSwipers('near_me');
         var new_guides = this.createSwipers('new_guides');
         var state_content = (
           <ScrollView>
            <Accordion
             underlayColor={'#2ebbbe'}
             header={<Text  style={styles.textborder}>UT</Text>}
             content = {<ScrollView style = {styles.descriptionWrapper}
             contentContainerStyle = {styles.descriptions}
             scrollEnabled={false}
             >{UTcontent}</ScrollView>}
             onPress={()=>this.updateStates('UT')}
             />


            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>WY</Text>}
            content = {<ScrollView style = {styles.descriptionWrapper}
            contentContainerStyle = {styles.descriptions}
            scrollEnabled={false}
            >{WYcontent}</ScrollView>}
            onPress = {()=>this.updateStates('WY')}
            />

            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>ID</Text>}
            content={<ScrollView style = {styles.descriptionWrapper}
            contentContainerStyle = {styles.descriptions}
            scrollEnabled={false}
            >{IDcontent}</ScrollView>}
            onPress={()=>this.updateStates('ID')}
            />
            </ScrollView>

          );
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
          <ScrollView>
          <Swiper
            style={styles.swiper}
            height={240}
            onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
            {featured}
          </Swiper>
          <Swiper height={240}
          style={styles.swiper}
            onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
            {favorited}
          </Swiper>
          <Swiper height={240}
            style={styles.swiper}
            onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
            {near_me}
          </Swiper>
          <Swiper height={240}
            style={styles.swiper}
            onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
            paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
            {new_guides}
          </Swiper>
          </ScrollView>
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title="Search"
        selected={this.state.selectedTab==='Search'}
        onPress={() => {
          this.setState({
            selectedTab:'Search',
          });
        }}>


          <ScrollView style={styles.tagContainer}>
          <Text>Selected Tags</Text>
          {selectedTags}

            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>State</Text>}
            content={<View style = {this.createStateStyles()}>{state_content}</View>}
            />
            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>Difficulty</Text>}
            content={<ScrollView style = {styles.descriptionWrapper}
            contentContainerStyle = {styles.descriptions}
            scrollEnabled={false}
            >{this.createButtons('difficulty')}</ScrollView>}
            />
            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>Hike Type</Text>}
            content={<ScrollView style = {styles.descriptionWrapper}
            contentContainerStyle = {styles.descriptions}
            scrollEnabled={false}
            >{this.createButtons('hike_type')}</ScrollView>}
            />
            <Accordion
            underlayColor={'#2ebbbe'}
            header={<Text style={styles.textborder}>Day Length</Text>}
            content={<ScrollView style = {styles.descriptionWrapper}
            contentContainerStyle = {styles.descriptions}
            scrollEnabled={false}
            >{this.createButtons('day_length')}</ScrollView>}
            />
            {this.displayGuides()}
          </ScrollView>
        </TabBarIOS.Item>
        </TabBarIOS>
           );
       }
   })




var styles = StyleSheet.create({
  swiper:{
    marginTop:20
  },
  textborder:{
    borderWidth: 2,
    borderColor:'#2ebbbe',
    overflow:'hidden',
    fontSize:15,
     color: '#696969',
    padding: 15,
    borderRadius:4,
    margin:3
    },
  descriptionWrapper:{
    flexDirection:'column', padding:10,
  },
  descriptions:{
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding:10
  },
  tagContainer:{
    height:300,
    marginTop:50
  },
  contain: {
  flex: 1,
  height:250
},
  resizeMode:{
    flex:1
  },
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
      alignItems:'center'

    },
    horizontal:{
      flexDirection:'row'
    },
    container: {
        flex: 1
    },
    category: {
      fontSize: 20,
      paddingTop:45,
      color: 'white',
      textAlign:'center'
    }
});

module.exports = guides;
