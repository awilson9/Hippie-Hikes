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
        TextInput} from 'react-native';

import Accordion from 'react-native-accordion';
import realm from './realm/index';
var Swiper = require('react-native-swiper');
var taghash = require('./realm/hashtag');
var regions = require('./realm/hashregion');

var guide = require('./guide');

var search = React.createClass({
  _navigate(name){
    this.props.navigator.push({
      component:guide,
      passProps:{
        name: name,
      }
    })
  },
  getInitialState: function() {
    return{
      selectedTags:{
        difficulty:null,
        hike_type:null,
        day_length:null,
        state:{
          name:null,
          area:null
        }
      },
      searchQuery:'',
      displayedGuides:{}
    }
  },
  componentWillMount:function(){
    let guides = realm.objects('Guide');
    var displayedGuides = {};
    guides.forEach(function(guide){
      displayedGuides[guide.name] = {display:true}
    });
    this.setState({
      displayedGuides:displayedGuides
    });
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
    var displayedGuides = this.state.displayedGuides;
    var state = this.state.selectedTags.state.name;
    var area = this.state.selectedTags.state.area;
    var difficulty = this.state.selectedTags.difficulty;
    var day_length = this.state.selectedTags.day_length;
    var hike_type = this.state.selectedTags.hike_type;
    let guides = realm.objects('Guide');
    if(this.state.searchQuery!=''){
    for(var guide in displayedGuides){
      if(displayedGuides[guide].display){
        var item = realm.objects('Guide').filtered('name=$0', guide)[0];
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
        if (!((contains_hike_type)&&(contains_day_length)&&(contains_difficulty))){
          displayedGuides[item.name].display=false;
        }
        else{
          displayedGuides[item.name].display=true;
        }
      }
    };
  }
  else{
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
        if (!((contains_hike_type)&&(contains_day_length)&&(contains_difficulty))){
          displayedGuides[item.name].display=false;
        }
        else{
          displayedGuides[item.name].display=true;
        }

    });
  
  }
    this.setState({
      displayedGuides:displayedGuides
    });
  },
  displayGuides: function(){
    var displayedGuides = this.state.displayedGuides;




    var guideElements = [];

    var i=0;
    for(var item in displayedGuides){
      if(displayedGuides[item].display){
      let guide = realm.objects('Guide').filtered('name=$0', item)[0];
      guideElements.push(
        <TouchableHighlight
        underlayColor={'#2ebbbe'}
        key={i++} onPress={()=>this._navigate(guide.name)}>
          <View>
            <Image source = {{uri:item+'site'}} resizeMode="contain" style={styles.contain}/>
          </View>
        </TouchableHighlight>
      );
    }
    }
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
        margin:3,
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
  clearGuideDisplays:function(){
    var displayedGuides = this.state.displayedGuides;
    for(var guide in displayedGuides){
      displayedGuides[guide].display = false;
    }
    this.setState({
      displayedGuides:displayedGuides
    });
  },
  updateSearch(text){
    this.setState({
      searchQuery:text
    });
    this.clearGuideDisplays();
    //queries for
    //tags
    var displayedGuides = this.state.displayedGuides;
    let tags = realm.objects('Tag').filtered('name CONTAINS $0', text);

    tags.forEach(function(tag){
      taghash.default[tag.name].forEach(function(guide){
        displayedGuides[guide.name].display = true;
      });
    });
    //titles
    let guideTitles = realm.objects('Guide').filtered('name_description CONTAINS $0', text);
    guideTitles.forEach(function(guide){
      displayedGuides[guide.name].display = true;
    });
    //area
    let areas = realm.objects('Region').filtered('description CONTAINS $0', text);
    areas.forEach(function(region){
      regions.default.areas[region.area].forEach(function(guide){
        displayedGuides[guide.name].display = true;
      });
    });
    //state
    let states = realm.objects('Region').filtered('state CONTAINS $0', text);
    states.forEach(function(region){
      regions.default.states[region.state].forEach(function(guide){
        displayedGuides[guide.name].display = true;
      });
    });
    //closest to
    let guideClosestTo = realm.objects('Guide').filtered('closest_to CONTAINS $0', text);
    guideClosestTo.forEach(function(guide){
      displayedGuides[guide.name].display = true;
    });

    this.setState({
      displayedGuides:displayedGuides
    });

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
  render(){
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
    return(


      <ScrollView style={styles.tagContainer}>

          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            onChangeText = {(text) => this.updateSearch(text)} />

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

 );
  }
})

var styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    height:55,
    padding: 10,
    fontSize: 20,
    backgroundColor:'white',
    borderWidth:9,
    borderColor:'#E4E4E4'
  },
  textborder:{
    borderWidth: 2,
    borderColor:'#2ebbbe',
    overflow:'hidden',
    fontSize:15,
    backgroundColor: 'white',
    color:'#696969',
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
    marginTop:5
  },
  contain: {
  flex: 1,
  height:250
  },
  container: {
        flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'stretch'
  },

});

module.exports = search;
