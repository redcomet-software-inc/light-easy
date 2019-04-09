/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Animated} from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
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
export class ScreenLight extends Component<Props> {

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

export default class App extends Component<Props> {

  constructor (props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      color: 'none',
      bColor: true,
      once: false,

    }
  }

  handleColorChange (color) {
    console.log(color);
    this.setState({color: fromHsv(color)});
  }

  handlePress () {
      this.setState({bColor: !this.state.bColor});
  }

  render() {
    let { color } = this.state;
    const { bColor } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.header} >
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.handlePress()} style={styles.button}>
              <Text>Meu botão 1</Text>
            </TouchableOpacity>
            <Text>Status: { bColor ? "ON" : "OFF" }</Text>
          </View>
        </View>
        <View style={styles.body} >
          <View style={[styles.bodyPosition],[{width: width, height: height}]}>
            <Text>This is an example 1</Text>
          </View>
          <View style={[styles.bodyPosition],[styles.ScreenLight]}>
            <ScreenLight color={color} bColor={bColor} />
          </View>
          <View style={[{width: width, height: height, position: 'absolute', zIndex:10}]}>
            <ColorPicker
              style={styles.ColorPicker}
              onColorSelected={color => alert(`Color selected: ${color}`)}
              onColorChange={color => this.handleColorChange(color)}
              hideSliders={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c9c9c9',
  },
  header: {
    flex:1,
    width:'100%',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  headerEmptySpace: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    padding: 25,
    height: 10,
  },
  body: {
    flex: 9,
    width:'100%',
    alignItems: 'center',
  },
  bodyPosition: {
    position: 'absolute',

  },
  ColorPicker: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    alignSelf: 'center',
  },
  ScreenLight: {
    position: 'absolute',
    width: width,
    height: height,
  }

});
