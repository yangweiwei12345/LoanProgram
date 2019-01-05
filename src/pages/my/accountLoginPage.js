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

class accountLoginPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: '登录',
    };

    // 忘记密码 html
    forgetPassword = () => {
        const styles = {
            text: {
                color: "#9093A1"
            },
            textWraper: {
                width: '100%',
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red"
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

        const linkToPasswordPage = () => {
            console.log('忘记密码')
            this.props.navigation.navigate('forgetPassword')
        }

        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                    onPress={ linkToPasswordPage }
                >
                    <Text
                        style={ styles.text }
                    >忘记密码1</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 验证码 html
    Verification = () => {
        const styles = {
            text: {
                color: "#9093A1"
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
                    >忘记密码</Text>
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
                        leftText="账号"
                        placeholder="请输入您的账号"
                        rightFlag={ false }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="密码"
                        placeholder="请输入您的密码"
                        rightFlag={ true }
                        HTMLTemplate={ this.forgetPassword }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="验证码"
                        placeholder="请输入验证码"
                        rightFlag={ true }
                        HTMLTemplate={ this.Verification }
                    />
                </View>
                <Button
                    value="登录"
                    onPress={ this.login }
                    style={{
                        marginTop: 20
                    }}
                />
            </View>
        );
    }
}

export default accountLoginPage;