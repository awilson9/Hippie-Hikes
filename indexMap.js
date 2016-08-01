import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

const accessToken = 'pk.eyJ1IjoiYXdpbHNvbjkiLCJhIjoiY2lyM3RqdGloMDBrbTIzbm1haXI2YTVyOCJ9.h62--AvCDGN25QoAJm6sLg';
Mapbox.setAccessToken(accessToken);
var MapboxClient = require('mapbox/lib/services/directions');
var client = new MapboxClient(accessToken);
import realm from './realm/index';
var guide = require('./guide');

class IndexMap extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    center: {
      latitude: 40.391617,
      longitude: -111.850766
    },
    zoom: 8,
    userTrackingMode: Mapbox.userTrackingMode.none,
    selectedTrail:'none',
    annotations:[]
  };
  _navigate(name){
    this.props.navigator.push({
      component:guide,
      passProps:{
        name: name,
      }
    })
  };
  componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.calculateClosestRoutes(position, this.updateState);
      var initialPosition = position;
      this.setState({initialPosition});
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = position;
    this.setState({lastPosition});
  });
}

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    console.log('onUpdateUserLocation', location);
  };
  onOpenAnnotation = (annot) => {
      this.setState({
        selectedTrail: annot.id
    });
  };
  onRightAnnotationTapped = (e) => {
    this._navigate(e.id);
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
  };
  onTap = (location) => {
    console.log('onTap', location);
  };


  componentWillMount() {
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      console.log('offline pack progress', progress);
    });
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
      console.log('offline max allowed tiles', tiles);
    });
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      console.log('offline error', error);
    });
  }

  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
    this._offlineMaxTilesSubscription.remove();
    this._offlineErrorSubscription.remove();
  }






    calculateClosestRoutes(position, updateState){
      let guides = realm.objects('Guide');
      var routes = [];
      var options = {
        profile:'mapbox.driving',
        geometry:'geojson'
      }
      var self = this;
      guides.forEach(function(guide,i){

          var waypoints = [{latitude:position.coords.latitude, longitude:position.coords.longitude},
              {latitude: guide.lat, longitude:guide.long}];
              client.getDirections(waypoints,options, function(err, results){
                  updateState(results.routes[0].geometry.coordinates, self, guide.name_description, results.routes[0].duration/60, guide.name);
              });

      });

    }

updateState(coords, self,description, duration, name){
  var hours = Math.floor(duration/60);
  var minutes = Math.floor(duration - (hours*60));
  var time = ""
  if(hours<1){
    time = time + minutes + " minutes away";
  }
  else if(hours==1){
    time = time + hours + " hour " + minutes + " minutes away";
  }
  else{
    time = time + hours + " hours " + minutes + " minutes away";
  }


  var toSet = [];
  coords.forEach(function(coord, i){
    toSet.push([coord[1],coord[0]]);
    }
  )
  self.setState({
    annotations:[...self.state.annotations, {
      coordinates:toSet,
      type:'polyline',
      strokeColor: '#2ebbbe',
      strokeWidth:0,
      strokeAlpha:.5,
      id:name + 'directions'
    },
    {
      coordinates:toSet[toSet.length-1],
      type:'point',
      id:name,
      title:description + ' trailhead',
      subtitle: time,
      rightCalloutAccessory: {
        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
        height: 25,
        width: 25
      },
    }
  ]
  });
}
displayDirections(){
  var toDisplay = [];
  this.state.annotations.forEach(function(annotation){
    if((annotation.id)===(this.state.selectedTrail)){
      toDisplay.push(annotation);
    }
    else if((annotation.id===(this.state.selectedTrail+'directions'))){
      var toPush = annotation;
      toPush.strokeWidth = 4;
      toDisplay.push(toPush);
    }
  }, this);
  this.setState({
    annotations:toDisplay
  });
}




  render() {

    StatusBar.setHidden(true);
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.basic}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
        />
      <ScrollView style={styles.scrollView}>
        {this._renderButtons()}
      </ScrollView>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View>

        <TouchableHighlight  onPress={() => {
            Mapbox.addOfflinePack({
              name: 'test',
              type: 'bbox',
              bounds: [0, 0, 0, 0],
              minZoomLevel: 0,
              maxZoomLevel: 0,
              metadata: { anyValue: 'you wish' },
              styleURL: Mapbox.mapStyles.dark
            }).then(() => {
              console.log('Offline pack added');
            }).catch(err => {
              console.log(err);
            });
        }}>
        <Text style={styles.textborder}>
          Create offline pack
          </Text>
        </TouchableHighlight>
        <TouchableHighlight  onPress={() => {
            Mapbox.getOfflinePacks()
              .then(packs => {
                console.log(packs);
              })
              .catch(err => {
                console.log(err);
              });
        }}><Text style={styles.textborder}>
          Get offline packs
          </Text>
        </TouchableHighlight>
        <TouchableHighlight  onPress={() => {
            Mapbox.removeOfflinePack('test')
              .then(info => {
                if (info.deleted) {
                  console.log('Deleted', info.deleted);
                } else {
                  console.log('No packs to delete');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          <Text style={styles.textborder}>Remove pack with name 'test' </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.displayDirections()}>
          <Text style={styles.textborder}>
            Click here for directions to the selected Trailhead
          </Text>
        </TouchableHighlight>
        <Text style={styles.textboder}>User tracking mode is {this.state.userTrackingMode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  map: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
});

module.exports = IndexMap;
