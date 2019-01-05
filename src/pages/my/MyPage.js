import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground
} from 'react-native';
import { Images } from '../../assets';
import TabList from './TabList';

const styles = {
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'red'
        backgroundColor: '#F8F8F8',
        position: 'relative',
    },
    infoBox: {
        width: "100%",
        height: 208,
        backgroundColor: '#FFF'
    },
    topBackGround: {
        width: '100%',
        height: 198,
        // backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
        width: '100%',
        height: 30,
        lineHeight: 30,
        textAlign: 'center',
        position: 'relative',
        top: 20,
        color: '#FFF',
        fontSize: 18,
    },
    portrait: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 10,
        left: '50%',
        marginLeft: -50,
    }
};

class My extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabList: [
                {
                    text: "留言反馈",
                    iconName: "leaveMessage",
                    handleEvent: this.feedBack
                },
                {
                    text: "个人设置",
                    iconName: "setting",
                    handleEvent: this.setting
                },
                {
                    text: "邀请好友",
                    iconName: "invitation",
                    handleEvent: this.invitation
                },
            ],
            isLogin: false
        }
    }

    feedBack = () => {
        this.props.navigation.navigate('FeedBack')
    }

    setting = () => {
        this.props.navigation.navigate('Setting')
    }

    invitation = () => {
        this.props.navigation.navigate('Invitation')
    }

    render() {
        const {
            tabList,
            isLogin
        } = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.infoBox}>
                    <ImageBackground
                        style={styles.topBackGround}
                        source={Images['mineBack']}
                    >
                        <Text
                            style={ styles.title }
                        >我的</Text>
                        {
                            isLogin
                                ?   <Image
                                    style={ styles.portrait }
                                    source={ Images['Head'] }
                                />
                                : <Image
                                    style={ styles.portrait }
                                    source={ Images['loginLogo'] }
                                />
                        }
                    </ImageBackground>
                </View>

                {
                    tabList && tabList.map((v, i) => {
                        return (
                            <TabList
                                key={ i }
                                iconName={ v.iconName }
                                text={ v.text }
                                handleEvent={ v.handleEvent }
                            />
                        )
                    })
                }
                
            </View>
        );
    }
}

export default My;