/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { createStackNavigator } from 'react-navigation';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full h

var anim1 = {
    toValue: 800,
    duration: 1550,
    delay: 500
};

var anim2 = {
    toValue: 0,
    duration: 1550,
    delay: 500,
};


type Props = {};
export default class ScreenLight extends Component<Props> {

    constructor(props) {
      super(props);
      this.getValue = this.getValue.bind(this);
      this.mainAnimation = this.mainAnimation.bind(this);
      this.state = {
        value: 0,
        once: false,
      }
    }

    componentWillMount() {
      this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
      this.mainAnimation();
    }

    mainAnimation () {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.animatedValue, anim1),
          Animated.timing(this.animatedValue, anim2)
        ]),
        {
          iterations: -1
        }
      ).start();
    }

    getValue (value) {
        console.log(value);
        if(this.state.once === false) {
          this.setState({once:true});
          this.setState({value: value});
        }
    }

   render() {
     console.log(this.props.bColor);
     const interpolateColor = this.animatedValue.interpolate({
         inputRange: [0, 100, 200, 300, 400, 500, 600, 700, 800],
         outputRange: ['rgb(255,0,0)', 'rgb(255,255,0)', 'rgb(0,255,0)', 'rgb(0,255,255)', 'rgb(0,70,255)', 'rgb(100,0,255)', 'rgb(0,70,255)', 'rgb(255,0,100)', 'rgb(255,0,0)'],
       });

     const interpolationStyle = {
       backgroundColor: interpolateColor,
     }

     if(this.props.bColor) {
       console.log("ON");
       this.mainAnimation();
     } else {
       console.log("OFF");
       this.animatedValue.stopAnimation(value => this.getValue(value));
     }

     const color = this.props.color;

      return(
        <Animated.View style={[{backgroundColor: color, width: width, height: height}, interpolationStyle]}>
        </Animated.View>
      );
  }
}