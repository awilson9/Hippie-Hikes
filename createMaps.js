import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native';

const accessToken = 'pk.eyJ1IjoiYXdpbHNvbjkiLCJhIjoiY2lyM3RqdGloMDBrbTIzbm1haXI2YTVyOCJ9.h62--AvCDGN25QoAJm6sLg';
Mapbox.setAccessToken(accessToken);
var MapboxClient = require('mapbox/lib/services/directions');
var client = new MapboxClient(accessToken);
import realm from './realm/index';
var guide = require('./guide');

import {DeviceEventEmitter}  from 'react-native';
var { RNLocation: Location } = require('NativeModules');


class CreateMaps extends Component {
  state = {
    center: {
      latitude: 40.391617,
      longitude: -111.850766
    },
    zoom: 8,
    userTrackingMode: Mapbox.userTrackingMode.none,
    selectedTrail:'none',
    annotations:[],
    location:null,
    locationStarted:false,
    index:0
  };

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
    Location.requestAlwaysAuthorization();
    Location.setDistanceFilter(10.0);
  }
  createAnnotationFromTracking(){
    let trail = realm.objects('Location').filtered('trail="Gobbler"')[0];
    var coords = [];
    trail.coordinates.forEach(function(coordinate){
      coords.push([coordinate.latitude,coordinate.longitude]);
    })
    this.setState({
      annotations:[{
        coordinates:coords,
        type:'polyline',
        id:'trail',
        strokeColor:'#2ebbbe',
        strokeWidth:4,
        strokeAlpha:.5
      }]
    })
  }
  stopUpdatingLocation(){
    Location.stopUpdatingLocation();
    this.setState({
      locationStarted:false,
      index:0
    })
  }
  startTracking(event){
    Location.startUpdatingLocation();
    if(!this.state.locationStarted){
      this.setState({
        locationStarted:true
      });
      realm.write(() => {
        realm.create('Location',{
            trail: event.nativeEvent.text
        });
      });
      this.setState({
        location:realm.objects('Location').filtered('trail = $0',event.nativeEvent.text)[0]
      });
    }
    var locations = DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {

        realm.write(() => {
          let coord = realm.create('Coordinates', {
            key:this.state.index,
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            altitude:location.coords.altitude
          });
          this.state.location.coordinates.push(coord);
          this.setState({
            index:this.state.index+1
          });
        });

      })
      }



  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
    this._offlineMaxTilesSubscription.remove();
    this._offlineErrorSubscription.remove();
  }

  render() {
    var textInput = (this.state.getInput) ? (<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onSubmitEditing={(event) => this.startTracking(event)}/>) : null;
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
        {textInput}
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
        <TouchableHighlight onPress={() => this.setState({getInput:true})}>
          <Text style={styles.textborder}>
            Start tracking Location
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.stopUpdatingLocation()}>
          <Text style={styles.textborder}>
            Stop tracking location
          </Text>
        </TouchableHighlight>
        <Text onPress={()=>this.createAnnotationFromTracking()}>Create Annotation</Text>

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

module.exports = CreateMaps;
