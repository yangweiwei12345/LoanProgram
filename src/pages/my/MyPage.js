import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { Images } from '../../assets';
import TabList from './TabList';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { PX2DP_W, PX2DP_H } from '../../utils';
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
        height: PX2DP_H(208),
        backgroundColor: '#FFF'
    },
    topBackGround: {
        width: '100%',
        height: PX2DP_H(198),
        // backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
        width: '100%',
        height: PX2DP_H(30),
        lineHeight: PX2DP_H(30),
        textAlign: 'center',
        position: 'relative',
        top: PX2DP_H(20),
        color: '#FFF',
        fontSize: 18,
    },
    portrait: {
        width: PX2DP_W(100),
        height: PX2DP_H(100),
        position: 'absolute',
        bottom: PX2DP_H(10),
        left: '50%',
        marginLeft: PX2DP_W(-50),
    }
};

class My extends Component {
    static navigationOptions = {
        headerTitle: '我的',
        headerMode: 'none',
        headerRight: (<View style={{ width: 60, height: 60 }}></View>)
    };

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
            isLogin: false,
            userID: "",
            phone: "",
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    componentWillReceiveProps() {
        console.log('进来了')
    }

    feedBack = () => {
        this.state.isLogin
            ? this.props.navigation.navigate('FeedBack', {
                callback: this.getUserInfo
            })
            : this.props.navigation.navigate('Login', {
                callback: this.getUserInfo
            });
    }

    setting = () => {
        this.state.isLogin
            ? this.props.navigation.navigate('Setting', {
                callback: this.getUserInfo
            })
            : this.props.navigation.navigate('Login', {
                callback: this.getUserInfo
            });
    }

    invitation = () => {
        this.state.isLogin
            ? this.props.navigation.navigate('Invitation', {
                callback: this.getUserInfo
            })
            : this.props.navigation.navigate('Login', {
                callback: this.getUserInfo
            });
    }

    GoLogin = () => {
        if (this.state.isLogin) return;
        this.props.navigation.navigate('Login', {
            callback: this.getUserInfo
        })
    }

    getUserInfo = cb => {
        axios
            .post("https://www.raindropbox365.com/api/sessions/check")
            .then(resp => {
                if (resp) {
                    if (resp.status == 200 && resp.data) {
                        this.setState({
                            phone: resp.data.account || "",
                            userID: resp.data.user_id || "",
                            isLogin: true
                        })
                        cb && cb(true);
                    } else {
                        this.setState({
                            isLogin: false
                        })
                        cb && cb(false);
                    }
                }
            })
            .catch(err => {
                console.log(err.response)
                if (err && err.response) {
                    Toast.show(err.response.data, {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                }
                
            })
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
                        {/* <Text
                            style={ styles.title }
                        >我的</Text> */}
                        <TouchableOpacity
                            style={ styles.portrait }
                            onPress={ this.GoLogin }
                            activeOpacity={ 1 }
                        >
                        {
                            isLogin
                                ? <Image
                                        source={ Images['Head'] }
                                    />
                                : <Image
                                    source={ Images['loginLogo'] }
                                />
                        }</TouchableOpacity> 
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