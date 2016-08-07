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
    center: {
      latitude: this.props.position.coords.latitude,
      longitude: this.props.position.coords.longitude
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
    this.displayTrailheads();
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

displayTrailheads(){
  var trailheads = [];
  for(var trail in this.props.directions){
    var duration = this.props.directions[trail].routes[0].duration/60;
    var hours = Math.floor(duration/60);
    var minutes = Math.floor(duration - (hours*60));
    var time = "";
    if(hours<1){
      time = time + minutes + " minutes away";
    }
    else if(hours==1){
      time = time + hours + " hour " + minutes + " minutes away";
    }
    else{
      time = time + hours + " hours " + minutes + " minutes away";
    }
    var coordinates = this.props.directions[trail].routes[0].geometry.coordinates;
    trailheads.push({
        coordinates:[coordinates[coordinates.length-1][1], coordinates[coordinates.length-1][0]],
        type:'point',
        id:trail,
        title:trail + ' trailhead',
        subtitle: time,
        rightCalloutAccessory: {
          source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
          height: 25,
          width: 25
        },
      });
  }
  this.setState({
    annotations:trailheads
  });
}
displayDirections(){
  var toDisplay = [];
  this.state.annotations.forEach(function(annotation){
    if((annotation.id)===(this.state.selectedTrail)){
      toDisplay.push(annotation);
    }
  }, this);

  var direction = this.props.directions[this.state.selectedTrail];
  var toSet = [];
  direction.routes[0].geometry.coordinates.forEach(function(coord){
    toSet.push([coord[1], coord[0]]);
  });
  toDisplay.push({
    coordinates:toSet,
    type:'polyline',
    id:this.state.selectedTrail + 'directions',
    strokeColor:'#2ebbbe',
    strokeWidth:4,
    strokeAlpha:.5
  })
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
          styleURL={"mapbox://styles/mapbox/outdoors-v9"}
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
    alignItems: 'stretch',
    marginTop:20
  },
  map: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
});

module.exports = IndexMap;
