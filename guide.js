
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
        TouchableOpacity
        } from 'react-native';

var Lightbox = require('react-native-lightbox');
var map = require('./maps');
var Swiper = require('react-native-swiper');

import realm from './realm/index';
import YouTube from 'react-native-youtube'


var WINDOW_WIDTH = Dimensions.get('window').width;





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
     _navigateMap(lat, long){
      this.props.navigator.push({
      component:map,
       passProps:{
         name:this.props.name,
         latitude:lat,
         longitude:long
       }
     });
     },
     getInitialState: function () {
   return {
     isReady: false,
     status: null,
     quality: null,
     error: null,
     isPlaying: true
   }
 },

          render() {
            var images = [];
            var imgpath = this.props.name;
            let siteQuery = realm.objects('Guide').filtered('name == $0', imgpath).slice(0,1);
            var site = siteQuery[0];
            var tags = [];
            site.tags.forEach(function(item,i){
              tags.push(
                <Text key={i} style={styles.textborder}>{item.name}</Text>
              );
            })
            var img_index = 0;

            for (var i=1;i<=site.gallSize;i++){

              if(img_index<site.img_descriptions.length&&site.img_descriptions[img_index].img_index==i){
                  images.push(
                    <View style = {styles.slide} key={i}>
                      <Lightbox navigator={this.props.navigator}>
                        <Image style={styles.contain} resizeMode="contain" source = {{uri: imgpath+i}}>
                          <View style={styles.caption}>
                            <Text>{site.img_descriptions[img_index].description_1}</Text>
                            <Text>{site.img_descriptions[img_index].description_2}</Text>
                          </View>
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
            var hyperlapse = (site.hyperlapse!=null) ? (<YouTube
              ref="youtubePlayer"
              videoId={site.hyperlapse} // The YouTube video ID
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
                  <TouchableHighlight onPress={() => this._navigate(site.similar_hikes[0].name, site.similar_hikes[0].gallSize)}>
                    <Image style = {styles.contain} resizeMode="contain" source = {{uri:site.similar_hikes[0].name + 'site'}}/>
                  </TouchableHighlight>
                </View>
              );
              sim_hikes.push(
                <View key={2}>
                  <TouchableHighlight onPress={() => this._navigate(site.similar_hikes[1].name, site.similar_hikes[1].gallSize)}>
                    <Image style = {styles.contain} resizeMode="contain" source = {{uri:site.similar_hikes[1].name + 'site'}}/>
                  </TouchableHighlight>
                </View>
              );


              return(
                <ScrollView style = {styles.background}>

                  <View style={{marginBottom:50}}>
                    <Image style = {styles.contain} resizeMode="contain" source={{uri:imgheader}}/>
                  </View>
                  <View style={{alignItems:'center', marginBottom:40}}>
                    <Text style={styles.location}>{site.name_description}</Text>
                    <Text style={styles.location}>{site.location_loc.description}</Text>
                    <Text style={styles.location}>{site.closest_to}, {site.location_loc.state}</Text>

                  </View>

                  <ScrollView style = {styles.descriptionWrapper}
                  contentContainerStyle = {styles.descriptions}
                  scrollEnabled={false}
                  >


                    <Text style={styles.textborder}>{site.distance} Miles</Text>
                    <Text style={styles.textborder}>{site.elevation} ft. gain</Text>
                    {tags}
                    <TouchableHighlight onPress = {() => this._navigateMap(site.lat, site.long)}>
                      <Text style = {styles.textborder}>Click For Directions</Text>
                    </TouchableHighlight>

                </ScrollView>
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
                    <Text style = {styles.longdescription}>{site.description}</Text>
                  </View>
                  {hyperlapse}

                  <Text style={styles.similarHikes}>Similar Hikes</Text>
                  {sim_hikes}

                </ScrollView>
              );
          }
      });



  var styles = StyleSheet.create({
background:{
  backgroundColor:'white'
},
caption:{
  position:'absolute',
  bottom:-20
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
      fontSize:15,
       color: '#696969',
      padding: 15,
      borderRadius:4,
      margin:3
      },
    description: {
      fontSize: 20,
      backgroundColor: 'white'
      },

  });
   module.exports = guide;
