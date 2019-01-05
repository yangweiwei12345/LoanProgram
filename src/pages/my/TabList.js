import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { Images } from '../../assets';

const styles = {
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        marginTop: 10,
        backgroundColor: '#FFF',
        paddingLeft: 15,
        paddingRight: 15,
    },
    tabInfo: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 11
    }
};

class TabList extends Component {

    constructor(props) {
        super(props)
    }

    handlePress = fn => {
        fn && fn();
    }

    render() {
        const {
            iconName,
            text,
            handleEvent
        } = this.props;
        return (
            <TouchableOpacity
                style={ styles.wrapper }
                onPress={ () => { this.handlePress(handleEvent) } }>
                <View
                    style={ styles.tabInfo }>
                    <Image
                        style={ styles.icon }
                        source={Images[iconName]}
                    />
                    <Text>{ text }</Text>
                </View>
                <Image
                    // style={styles.topBackGround}
                    source={Images['right']}
                />
            </TouchableOpacity>
        );
    }
}

export default TabList;