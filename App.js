import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Font} from 'expo'

import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {
  state = {
    fontsLoaded : false
  }
  async componentDidMount () {
     await Font.loadAsync({
        'Heebo-regular' : require('./assets/fonts/Heebo-Regular.ttf'),
         'Rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
         'Rubik-light' : require('./assets/fonts/Rubik-Light.ttf')
      })

      this.setState({fontsLoaded: true})
  }
  render() {
    return (

      this.state.fontsLoaded ? <HomeScreen/> : null
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
