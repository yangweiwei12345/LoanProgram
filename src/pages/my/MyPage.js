import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

export default class My extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>My!</Text>
        </View>
    );
  }
}