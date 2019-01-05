import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, style } = this.props;

        return (
            <View style={{...styles.wrapper, ...style}}>
                { children }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 5
    }
});