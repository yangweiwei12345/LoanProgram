import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: '贷款超市',
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('List')}
                />
            </View>
        );
    }
}