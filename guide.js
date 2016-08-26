
import React, {Component} from 'react';
import { AppRegistry,
        Text,
        View,
        StyleSheet,
        NavigatorIOS,
        TouchableHighlight,
        Image,
        ScrollView,
        Dimensions,
        TouchableOpacity,
        TabBarIOS
        } from 'react-native';

var Lightbox = require('react-native-lightbox');
var Map = require('./maps');
var Swiper = require('react-native-swiper');
var NavigationBar = require('react-native-navbar');

import realm from './realm/index';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;




//each guide has quick info section, photo gallery, detailed info, similar hikes

   var guide = React.createClass({
     _navigate(name){
       this.props.navigator.push({
         component:guide,
         passProps:{
           name: name,
         }
       })
     },
     _navigateMap(waypoints){
      this.props.navigator.push({
      component:map,
       passProps:{
         name:this.props.name,
         waypoints:waypoints
       }
     });
     },
     getInitialState: function () {
   return {
     isReady: false,
     status: null,
     quality: null,
     error: null,
     isPlaying: true,
     favorited:"",
     downloaded:"",
     site:null,
     displayCaption:false,
     mapFullScreen:false,
   }
 },
 getCaption(img_index){
  if(this.state.displayCaption){
    return(
          <View style={styles.caption}>
            <Text style={{color:'white'}}>{this.state.site.img_descriptions[img_index].description_1}</Text>
            <Text style={{color:'white'}}>{this.state.site.img_descriptions[img_index].description_2}</Text>
          </View>);
  }
  else return null;
 },
 componentWillMount(){
   let site = realm.objects('Guide').filtered('name==$0', this.props.name)[0];
   var favorited = "";
   if(site.favorited){
     favorited="ios-heart";
   }
   else{
     favorited="ios-heart-outline";
   }
   if(site.downloaded){
     downloaded="ios-download";
   }
   else{
     downloaded="ios-download-outline";
   }
   this.setState({
     site:site,
     favorited:favorited,
     downloaded:downloaded,
   });
 },
  mapStyle(){
   if(!this.state.mapFullScreen){
     return{

         paddingTop:10,
         paddingBottom:10,
         height:250

     }
   }
   else{
     return{
       height:WINDOW_HEIGHT
     }
   }
 },
  changeFavorited(){
    if(this.state.favorited==="ios-heart"){
      this.setState({
        favorited:"ios-heart-outline"
      });
    }
    else{
      this.setState({
        favorited:"ios-heart"
      });
    }
    realm.write(()=>{
      this.state.site.favorited = !this.state.site.favorited;
    });
  },
  changeDownloaded(){
    if(this.state.downloaded=="ios-download"){
      this.setState({
        downloaded:"ios-download-outline"
      });
    }
    else{
      this.setState({
        downloaded:"ios-download"
      });
    }
    realm.write(()=>{
      this.state.site.downloaded = !this.state.site.downloaded;
    });
  },
          render() {
            var images = [];
            var imgpath = this.props.name;
            var tags = [];
            this.state.site.tags.forEach(function(item,i){
              tags.push(
                <Text key={i} style={styles.textborder}>{item.name}</Text>
              );
            });
            var img_index = 0;

            for (var i=1;i<=this.state.site.gallSize;i++){

              if(img_index<this.state.site.img_descriptions.length&&this.state.site.img_descriptions[img_index].img_index==i){
                  images.push(
                    <View style = {styles.slide} key={i}
                    title={<View><Text>{this.state.site.img_descriptions[img_index].description_1}</Text><Text>{this.state.site.img_descriptions[img_index].description_2}</Text></View>}>
                      <Lightbox navigator={this.props.navigator}
                      onOpen={()=>this.setState({
                        displayCaption:true
                      })}
                      onClose={()=>this.setState({
                        displayCaption:false
                      })}
                      >
                        <Image style={styles.contain} resizeMode="contain" source = {{uri: imgpath+i}}>
                          {this.getCaption(img_index)}
                        </Image>
                    </Lightbox>
                  </View>
                  );
                  img_index++;

              }
              else{
                images.push(
                  <View style = {styles.slide} key={i}>
                    <Lightbox navigator={this.props.navigator}>
                      <Image style={styles.contain} resizeMode="contain" source = {{uri: imgpath+i}}>
                      </Image>
                    </Lightbox>
                  </View>
                );
              }
            }

            var imgheader = this.props.name + 'site';
            var hyperlapse = (this.state.site.hyperlapse!=null) ? (<YouTube
              ref="youtubePlayer"
              videoId={this.state.site.hyperlapse} // The YouTube video ID
              play={this.state.isPlaying}           // control playback of video with true/false
              hidden={false}        // control visiblity of the entire view
              playsInline={true}    // control whether the video should play inline
              loop={true}          // control whether the video should loop when ended
              onReady={(e)=>{this.setState({isReady: true})}}
              onChangeState={(e)=>{this.setState({status: e.state})}}
              onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
              onError={(e)=>{this.setState({error: e.error})}}
              style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
              />
            ) : null;
            var sim_hikes = [];
              sim_hikes.push(
                <View key={1}>
                  <TouchableHighlight onPress={() => this.props.guideHandler(this.state.site.similar_hikes[0].name)}>
                    <Image style = {styles.contain} resizeMode="contain" source = {{uri:this.state.site.similar_hikes[0].name + 'site'}}/>
                  </TouchableHighlight>
                </View>
              );
              sim_hikes.push(
                <View key={2}>
                  <TouchableHighlight onPress={() => this.props.guideHandler(this.state.site.similar_hikes[1].name)}>
                    <Image style = {styles.contain} resizeMode="contain" source = {{uri:this.state.site.similar_hikes[1].name + 'site'}}/>
                  </TouchableHighlight>
                </View>
              );


              return(
                <View style={{flex:1}}>




                <ScrollView style = {styles.background}>

                  <View style={{marginBottom:50}}>
                    <Image style = {styles.contain} resizeMode="contain" source={{uri:imgheader}}/>
                    <Text style={[styles.btn,styles.btnModal]} onPress={()=>this.props.closeModal()}>X</Text>
                  </View>
                  <View style={{alignItems:'center', marginBottom:40}}>
                    <Text style={styles.location}>{this.state.site.name_description}</Text>
                    <Text style={styles.location}>{this.state.site.location_loc.description}</Text>
                    <Text style={styles.location}>{this.state.site.closest_to}, {this.state.site.location_loc.state}</Text>

                  </View>

                  <ScrollView style = {styles.descriptionWrapper}
                  contentContainerStyle = {styles.descriptions}
                  scrollEnabled={false}
                  >


                    <Text style={styles.textborder}>{this.state.site.distance} Miles</Text>
                    <Text style={styles.textborder}>{this.state.site.elevation} ft. gain</Text>
                    {tags}



                </ScrollView>
                <TouchableHighlight onPress={()=>this.setState({
                  mapFullScreen:true
                })} >

                <View style={this.mapStyle()}>
                <Map name={this.state.site.name}
                     waypoints={this.state.site.waypoints}
                     /></View></TouchableHighlight>
                  <View style={{paddingBottom:25}}>
                  <Swiper height={240}
                    onMomentumScrollEnd={function(e, state, context){console.log('index:', state.index)}}
                    dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
                    activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} ></View>}
                    paginationStyle={{bottom: -23, left: null, right: 10,}} loop={true}>
                      {images}
                  </Swiper>
                  </View>
                  <View>
                    <Text style = {styles.longdescription}>{this.state.site.description}</Text>
                  </View>
                  {hyperlapse}

                  <Text style={styles.similarHikes}>Similar Hikes</Text>
                  {sim_hikes}
                </ScrollView>
                <View style={styles.bottomBar}>
                  <View style={styles.favorite}>
                    <Icon
                      onPress={()=>this.changeFavorited()}
                      name={this.state.favorited}
                      size={30}/>
                  </View>
                  <View style={styles.download}>
                    <Icon name={this.state.downloaded}
                    onPress={()=>this.changeDownloaded()}
                    size={30}/>
                  </View>
                </View>
                </View>
              );
          }
      });



  var styles = StyleSheet.create({
    btn: {
     margin: 10,
     backgroundColor: "#3B5998",
     padding: 10
   },

   btnModal: {
     position: "absolute",
     top: 0,
     right: 0,
     width: 50,
     height: 50,
     backgroundColor: "transparent",
     color:'white',
     fontSize:40
   },
    bottomBar:{
      height:50,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#2ebbbe'
    },
    favorite:{
      alignItems:'center',
      flex:.5,
    },
    download:{
      alignItems:'center',
      flex:.5
    },
    background:{
      backgroundColor:'white'
    },
    caption:{
      flex:1,
      width:WINDOW_WIDTH,
      position:'absolute',
      bottom:60,
      padding:20,
      borderBottomColor:'white',
      borderBottomWidth:1
    },
    location:{
      color: '#696969',
      fontSize:30,
      padding:10
    },
    similarHikes:{
      marginTop:50,
      textDecorationLine:'underline',
      fontSize:40,
      backgroundColor:'#C0C0C0',
      opacity:.7
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    longdescription:{
       alignItems: 'flex-start',
       flexWrap: 'wrap',
       marginTop:20,
       padding:10,
       color:'#696969',
       borderWidth: 2,
       borderColor:'#2ebbbe',
       overflow:'hidden',
       fontSize:20

    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    image: {
      flex: 1,
    },
    contain: {
      flex: 1,
      height:250
    },
    descriptions:{
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection:'row',
      padding:10
    },
    canvas: {
      height:150, width:null
    },
    descriptionWrapper:{
      flexDirection:'column', padding:10
    },
    textborder:{
      borderWidth: 2,
      borderColor:'#2ebbbe',
      overflow:'hidden',
      fontSize:10,
       color: '#696969',
      padding: 15,
      borderRadius:4,
      margin:3
      },
    description: {
      fontSize: 15,
      backgroundColor: 'white'
      },

  });
  module.exports = guide;
