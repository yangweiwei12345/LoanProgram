import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Tab from '../components/Tab';
import Button from '../components/Button';

const styles = {
    wrapper: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    formBox: {
        backgroundColor: "#F8F8F8",
        paddingBottom: 10,
    },
    tipInfo: {
        color: "#B3B3B3",
        fontSize: 12,
        textAlign: "center",
        marginTop: 30,
    },
    linkPwd: {
        color: "#F64A38",
        fontSize: 18,
        marginTop: 50,
        textAlign: "center"
    }
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '登录',
    };

    // 短信验证码
    sendMessage = () => {
        const styles = {
            text: {
                color: "#F64A38"
            },
            textWraper: {
                width: '100%',
                height: '100%',
                justifyContent: "center",
                alignItems: "center"
            },
            wrapper: {
                width: '100%',
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 1,
                borderColor: "#EEEEEE" 
            }
        }
        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                >
                    <Text
                        style={ styles.text }
                    >发送验证码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 登录
    login = () => {

    }

    // 跳转到账号登录
    accountLogin = () => {
        this.props.navigation.navigate('accountLogin')
    }

    render() {
        return (
            <View
                style={ styles.wrapper }
            >
                <View
                    style={ styles.formBox }
                >
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="+86"
                        placeholder="请输入您的手机号码"
                        rightFlag={ false }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="验证码"
                        placeholder="请输入短信验证码"
                        rightFlag={ true }
                        HTMLTemplate={ this.sendMessage }
                    />
                </View>
                <Text
                    style={ styles.tipInfo }
                >未注册的手机号码验证后将自动创建公司名字账号</Text>
                <Button
                    value="登录"
                    onPress={ this.login }
                    style={{
                        marginTop: 20
                    }}
                />
                <TouchableOpacity
                    onPress={ this.accountLogin }
                >
                    <Text
                        style={ styles.linkPwd }
                    >账号密码登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginPage;