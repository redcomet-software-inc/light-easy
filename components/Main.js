/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, Button, View, TouchableOpacity} from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import ScreenLight from './ScreenLight.js';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full h

type Props = {};
export default class Main extends Component<Props> {

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
        <Button title="Teste" onPress={() => this.props.navigation.navigate('ScreenLight')} />
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

