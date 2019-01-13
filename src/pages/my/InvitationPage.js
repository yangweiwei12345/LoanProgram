import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';
import { Images } from '../../assets';
import axios from 'axios';
import QRCode from 'react-native-qrcode';
import { PX2DP_W, PX2DP_H } from '../../utils';
import Toast from 'react-native-root-toast';
const styles = {
    wrapper: {
        flex: 1,
        position: 'relative'
    },
    qrCode: {
        width: "100%",
        height: "50%",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FF952F"
    },
    qrCodeBox: {
        position: 'absolute',
        left: '50%',
        width: PX2DP_W(170),
        height: PX2DP_H(170),
        marginLeft: PX2DP_W(-85),
    },
    text: {
        fontSize: 18,
        position: 'absolute',
        bottom: PX2DP_H(30),
        textAlign: 'center',
        fontWeight: "500",
        width: '100%'
    }
};

class InvitationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invitationUrl: ""
        }
    }

    static navigationOptions = {
        title: '邀请好友',
    };

    componentDidMount(){
        axios
            .get("https://www.raindropbox365.com/api/invite?user_id=5c371b7d58928898b8f78fb7")
            .then(resp => {
                console.log(resp)
                if (resp.data && resp.status === 200) {
                    this.setState({
                        invitationUrl: `https://www.raindropbox365.com/api${resp.data}`
                    })
                }
            });
    }

    render() {
        const {
            invitationUrl
        } = this.state;
        return (
            <ImageBackground
                style={ styles.wrapper }
                source={ Images["invitationFried"] }
            >
                <View
                    style={ styles.qrCode }
                >
                    <View
                        style={ styles.qrCodeBox }
                    >
                        <QRCode
                            value={ invitationUrl }
                            size={ 170 }
                            bgColor='#000'
                            />
                    </View>
                    <Text
                        style={ styles.text }
                    >
                        扫描二维码邀请好友下载
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}

export default InvitationPage;