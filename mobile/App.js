import React from 'react';
import { StatusBar, StyleSheet, Text, View,YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);
export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#4b0075"/>
    <Routes/>
    </>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
