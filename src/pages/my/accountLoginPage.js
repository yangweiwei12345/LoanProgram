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
import Toast from 'react-native-root-toast';
import { Images } from '../../assets';
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

class accountLoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: "", // 账号
            password: "", // 密码
            verificationCode: "", // 验证码
        }
    }

    static navigationOptions = {
        title: '登录',
    };

    // 忘记密码 html
    forgetPasswordHTML = () => {
        const styles = {
            text: {
                color: "#9093A1"
            },
            textWraper: {
                width: '100%',
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
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
                    >忘记密码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 验证码 html
    VerificationHTML = () => {
        const styles = {
            wrapper: {
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
            },
            verificationCode: {
            },
            refreshBtn: {
                width: PX2DP_W(19),
                height: PX2DP_H(19),
                marginLeft: 3,
                marginRight: 3,
            }
        }
        return (
            <View
                style={ styles.wrapper }
            >
                <Image
                    style={ styles.verificationCode }
                    source={ Images['setting'] }
                />
                <Image
                    style={ styles.refreshBtn }
                    source={ Images['invitation'] }
                />
            </View>
        )
    }

    // 登录
    login = () => {

        let account = this.state.account || '';
        let password = this.state.password || '';
        let verificationCode = this.state.verificationCode || '';

        if ( !account ) {
            Toast.show('请输入账号', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        if ( !password ) {
            Toast.show('请输入密码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        if ( !verificationCode ) {
            Toast.show('请输入验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        
    }

    // 跳转到账号登录
    accountLogin = () => {
        this.props.navigation.navigate('accountLogin')
    }

    // 获取账号
    getAccount = accountNum => {
        let account = accountNum && accountNum.trim();
        this.setState({
            account
        })
    }

    // 获取密码
    getPassword = passwordNum => {
        let password = passwordNum && passwordNum.trim();
        this.setState({
            password: passwordNum
        })
    }

    // 获取验证码
    getVerification = verification => {
        let verificationCode = verification && verification.trim();
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
                        leftText="账号"
                        placeholder="请输入您的账号"
                        rightFlag={ false }
                        onChange={ this.getAccount }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="密码"
                        placeholder="请输入您的密码"
                        rightFlag={ true }
                        HTMLTemplate={ this.forgetPasswordHTML }
                        onChange={ this.getPassword }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="验证码"
                        placeholder="请输入验证码"
                        rightFlag={ true }
                        HTMLTemplate={ this.VerificationHTML }
                        onChange={ this.getVerification }
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