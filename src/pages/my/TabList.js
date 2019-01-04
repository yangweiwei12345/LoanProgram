import React, { Component } from 'react';
import {
    Text,
    View,
    Image
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

    render() {
        const {
            iconName,
            text
        } = this.props;
        return (
            <View style={ styles.wrapper }>
                <View style={ styles.tabInfo }>
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
            </View>
        );
    }
}

export default TabList;