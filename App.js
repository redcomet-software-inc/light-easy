/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full h

type Props = {};
export class ScreenLight extends Component<Props> {
   render() {
    return(
      <View style={{backgroundColor: this.props.color, width: width, height: height}}>
      </View>
    );
  }
}

export default class App extends Component<Props> {

  constructor (props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = {
      color: 'red',
    }
  }

  handleColorChange (color) {
    this.setState({color: fromHsv(color)});
  }

  render() {
    const { color } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{ zIndex: 15, position: 'absolute'}}><Text>Olá mundo1</Text></View>
        <View style={{ zIndex: 0, position: 'absolute'}}><ScreenLight color={color} /></View>
        <View style={{ zIndex: 10, position:'absolute' }}>
          <ColorPicker
            onColorSelected={color => alert(`Color selected: ${color}`)}
            onColorChange={color => this.handleColorChange(color)}
            style={{width: width, height: height}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
