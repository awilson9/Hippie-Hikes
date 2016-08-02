import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView
} from 'react-native';

const accessToken = 'pk.eyJ1IjoiYXdpbHNvbjkiLCJhIjoiY2lyM3RqdGloMDBrbTIzbm1haXI2YTVyOCJ9.h62--AvCDGN25QoAJm6sLg';
Mapbox.setAccessToken(accessToken);
var MapboxClient = require('mapbox/lib/services/directions');
var client = new MapboxClient(accessToken);

class GuideMap extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    center: {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    },
    zoom: 10,
    userTrackingMode: Mapbox.userTrackingMode.none,
    annotations: [{
      coordinates: [this.props.latitude, this.props.longitude],
      type: 'point',
      title: this.props.name + ' trailhead',
      id:'hello',
      rightCalloutAccessory: {
        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
        height: 25,
        width: 25
      },

    }]
  };
  componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.getDirectionstoTrailhead(position, this.updateState)
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
  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation);
  };
  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
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




  getDirectionstoTrailhead(position, updateState) {
    var waypoints = [
      {latitude:position.coords.latitude, longitude:position.coords.longitude},
      {latitude:this.props.latitude, longitude:this.props.longitude}
    ];

    var options = {
      profile:'mapbox.driving',
      geometry:'geojson'
    }
    var self = this;
    client.getDirections(waypoints, options, function(err, results){
        updateState(results.routes[0].geometry.coordinates, self);

      });

}

updateState(coords, self){
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
      strokeWidth:4,
      strokeAlpha:.5,
      id:'directions'
    }]
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

        <Text onPress={() => {
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
          Create offline pack
        </Text>
        <Text onPress={() => {
            Mapbox.getOfflinePacks()
              .then(packs => {
                console.log(packs);
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Get offline packs
        </Text>
        <Text onPress={() => {
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
          Remove pack with name 'test'
        </Text>
        <Text>User tracking mode is {this.state.userTrackingMode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

module.exports = GuideMap;
