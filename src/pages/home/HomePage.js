import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

export default class Home extends Component {
  render() {
    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        </ScrollView>
    );
  }
}