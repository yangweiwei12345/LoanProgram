import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';

const styles = {
    
};

class SettingPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '设置中心',
    };

    render() {
        return (
            <View style={styles.wrapper}>
                
            </View>
        );
    }
}

export default SettingPage;