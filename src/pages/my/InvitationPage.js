import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';
import { Images } from '../../assets';

const styles = {
    wrapper: {
        flex: 1,
    }
};

class InvitationPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '邀请好友',
    };

    render() {
        return (
            <ImageBackground
                style={ styles.wrapper }
                source={ Images["invitationFried"] }
            >
            </ImageBackground>
        );
    }
}

export default InvitationPage;