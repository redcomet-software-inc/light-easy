/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Dimensions, StyleSheet} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Main from './components/Main.js';
import ScreenLight from './components/ScreenLight.js';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full h

const RootStack = createStackNavigator ({
  Main: {
    screen: Main
  },
  ScreenLight: {
    screen: ScreenLight
  }
});

const App = createAppContainer(RootStack);

export default App;