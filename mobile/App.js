import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes';

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
