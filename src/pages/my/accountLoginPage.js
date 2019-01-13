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
import axios from 'axios';

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
            verificationText: "发送验证码",
            account: "", // 账号
            password: "", // 密码
            verificationCode: "", // 验证码
            Token: "", // token
            graphicVerificationCode: "", // 图形验证码
        }
    }

    static navigationOptions = {
        title: '登录',
    };

    componentDidMount = () => {
        this.getToken();
    }

    // 请求Token
    getToken = () => {
        axios.post("https://www.raindropbox365.com/api/captcha/token?id=" + new Date().getTime())
            .then(resp => {
                if (resp && resp.status === 200) {
                    this.setState({
                        Token: resp.data,
                        graphicVerificationCode: `https://www.raindropbox365.com/api/captcha/${ resp.data }.png`
                    });
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
            this.props.navigation.replace('forgetPassword')
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

    // 图形验证码 HTML
    graphicVerificationCodeHTML = () => {
        const styles = {
            wrapper: {
                width: '100%',
                height: '100%',
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
            },
            refreshBtn: {
                width: PX2DP_W(20),
                height: PX2DP_H(20),
                marginLeft: 5,
                marginRight: 5,
            },
            verificationImage: {
                width: PX2DP_W(80),
                height: PX2DP_H(29),
            },
            refreshImage: {
                width: PX2DP_W(20),
                height: PX2DP_H(20),
            }
        }

        const imgUrl = this.state.graphicVerificationCode;

        const refreshEvent = () => {
            this.getToken();
        }

        return (
            <View
                style={ styles.wrapper }
            >
                <Image
                    style={ styles.verificationImage }
                    source={{ uri: imgUrl }}
                />
                <TouchableOpacity
                    style={ styles.refreshBtn }
                    onPress={ refreshEvent }
                >
                    <Image
                        style={ styles.refreshImg }
                        source={ Images["refresh"] }
                    />
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
        let token = this.state.Token || '';

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
            Toast.show('请输入图形验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        axios.post("https://www.raindropbox365.com/api/sessions/login_captcha", {
            account,
            password,
            digits: verificationCode,
            token,
        })
            .then(resp => {
                console.log(resp)
                if (resp && resp.status === 200) {
                    let userID = resp.data && resp.data.user_id;
                    let account = resp.data && resp.data.account;
                    Toast.show("登录成功", {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                    setTimeout(() => {
                        this.props.navigation.replace("My");
                    }, 500)
                } else {
                    Toast.show("登录失败", {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
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

    // 获取图形验证码
    getImgVerification = ver => {
        let imageVerificationCode = ver && ver.trim() || "";
        this.setState({
            verificationCode: imageVerificationCode
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
                        keyboardType="numeric"
                        maxLength={ 11 }
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
                        placeholder="请输入图形验证码"
                        rightFlag={ true }
                        textInputStyle={{
                            width: PX2DP_W(150),
                        }}
                        HTMLTemplate={ this.graphicVerificationCodeHTML }
                        onChange={ this.getImgVerification }
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