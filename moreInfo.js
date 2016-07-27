import React, {Component} from 'react';
import { AppRegistry,
        Text,
        View,
        StyleSheet,
        NavigatorIOS,
        TouchableHighlight,
        Image
        } from 'react-native';



class moreInfo extends Component{
  render(){
    return(
    <View style="container">
      <Text style="description">this.props.moreInfo</Text>
    </View>
  );
}
}
module.exports = moreInfo;
