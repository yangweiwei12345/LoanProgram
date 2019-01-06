import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Tab from '../components/Tab';
import Button from '../components/Button';
import Toast from 'react-native-root-toast';
import { PX2DP_W, PX2DP_H } from '../../utils';

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

        this.state = {
            verificationText: "发送验证码",
            phoneNum: "", // 手机号码
            verificationCode: "", // 验证码
        }
    }

    static navigationOptions = {
        title: '登录',
    };

    // 验证码
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

        const {
            verificationText
        } = this.state;

        let interVal;

        const sendVerification = () => {

            if (this.state.verificationText !== "发送验证码") return;

            let phoneReg = /^1[34578]\d{9}$/;

            if ( this.state.phoneNum ) {
                if ( !phoneReg.test(this.state.phoneNum) ) {
                    Toast.show('请输入正确的手机号码', {
                        shadow: true,
                        position: Toast.positions.CENTER
                    })
                }
            } else {
                Toast.show('请输入手机号码', {
                    shadow: true,
                    position: Toast.positions.CENTER
                })
                return;
            }

            if (this.state.verificationText == "发送验证码") {
                // 允许 发送请求
                let codeSub = 5;
                this.setState({
                    verificationText: codeSub + "s"
                })
                interVal = setInterval(() => {
                    codeSub--;
                    if (codeSub < 1) {
                        codeSub = "发送验证码";
                        interVal && clearInterval(interVal);
                    }
                    let text = (typeof codeSub === "number") ? codeSub + "s" : codeSub;
                    this.setState({
                        verificationText: text
                    })
                }, 1000)
            }
        }


        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                    onPress={ sendVerification }
                >
                    <Text
                        style={ styles.text }
                    >{ verificationText }</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 登录
    login = () => {
        let phoneNum = this.state.phoneNum || "";
        let verificationCode = this.state.verificationCode || "";

        if ( !phoneNum ) {
            Toast.show('请输入手机号码', {
                shadow: true,
                position: Toast.positions.CENTER
            })
        }

        if ( !verificationCode ) {
            Toast.show('请输入验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            })
        }
    }

    // 跳转到账号登录
    accountLogin = () => {
        this.props.navigation.navigate('accountLogin')
    }

    // 获取手机号码
    getPhone = phone => {
        let phoneNum = phone && phone.trim() || "";
        this.setState({
            phoneNum
        })
    }

    // 获取验证码
    getVerification = verification => {
        let verificationCode = verification && verification.trim() || "";
        this.setState({
            verificationCode
        })
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
                        keyboardType="numeric"
                        maxLength={ 11 }
                        onChange={ this.getPhone }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="验证码"
                        placeholder="请输入短信验证码"
                        rightFlag={ true }
                        HTMLTemplate={ this.sendMessage }
                        onChange={ this.getVerification }
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