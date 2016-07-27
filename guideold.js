//requires different 
import React, {Component} from 'react';
import { AppRegistry,
        Text,
        View,
        StyleSheet,
        NavigatorIOS,
        TouchableHighlight,
        Image,
        ScrollView
        } from 'react-native';

var Lightbox = require('react-native-lightbox');
import PhotoBrowser from 'react-native-photo-browser';
var Swiper = require('react-native-swiper');
var ResponsiveImage = require('react-native-responsive-image');
import realm from './realm/index';
var Video = require('react-native-video').default;






//each guide has quick info section, photo gallery, detailed info, similar hikes

   var guide = React.createClass({
     _navigate(name, gallsize){
       this.props.navigator.push({
         component:guide,
         passProps:{
           name: name,
           gallsize:gallsize
         }
       })
     },

          render() {
            var images = [];
            var imgpath = this.props.name;
            let siteQuery = realm.objects('Guide').filtered('name == $0', imgpath).slice(0,1);
            var site = siteQuery[0];
            var img_index = 0;
            for (var i=1;i<=this.props.gallsize;i++){
              images.push({uri:imgpath+i});
            }

            var imgheader = this.props.name + 'site';

            var sim_hikes = [];
            var sim = [];
            for(var i=0; i<site.similar_hikes.length;i++){
              sim.push(site.similar_hikes[i].name);
              var name = sim[i];
              sim_hikes.push(
                <View key={i}>
                  <TouchableHighlight onPress={() => this._navigate(name, 20)}>
                    <Image style = {styles.contain} resizeMode="contain" source = {{uri:name + 'site'}}/>
                  </TouchableHighlight>
                </View>
              )
            }

              return(
                <ScrollView style = {styles.background}>

                  <View>
                    <Image style = {styles.contain} resizeMode="contain" source={{uri:imgheader}}/>
                  </View>
                  <ScrollView style = {styles.descriptionWrapper}
                  contentContainerStyle = {styles.descriptions}
                  scrollEnabled={false}
                  >

                    <Text style={styles.textborder}>{site.name_description}</Text>
                    <Text style={styles.textborder}>{site.location_loc}</Text>
                    <Text style={styles.textborder}>{site.location_nat}</Text>
                    <Text style={styles.textborder}>{site.distance} Miles</Text>
                    <Text style={styles.textborder}>{site.type}</Text>
                    <Text style={styles.textborder}>{site.difficulty}</Text>
                    <Text style={styles.textborder}>{site.elevation} ft. gain</Text>

                </ScrollView>
                  <View style={{paddingBottom:25}}>

                      <Lightbox.Image
                      resizeMode="contain"
                      style={{
                        height: 200,
                      }}
                      navigator={this.props.navigator}
                      maximumZoomScale = {2}
                      source={images}
                      />
                    </View>
                  <View>
                    <Text style = {styles.longdescription}>{site.description}</Text>
                  </View>
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
      padding: 15
      },
    description: {
      fontSize: 20,
      backgroundColor: 'white'
      },

  });
   module.exports = guide;
