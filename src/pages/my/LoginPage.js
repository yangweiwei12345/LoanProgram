import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Tab from '../components/Tab';
import Button from '../components/Button';
import Toast from 'react-native-root-toast';
import { PX2DP_W, PX2DP_H } from '../../utils';
import axios from 'axios';
import { Images } from '../../assets';

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
            imageVerificationCode: "", // 图形验证码
            Token: "", // token
            graphicVerificationCode: "", // 图形验证码
            account: "", // 账号
            password: "", // 密码
            roleId: "", // 
            userId: "", // 用户ID
        }
    }

    static navigationOptions = {
        title: '登录',
        headerRight: (<View style={{ width: 60, height: 60 }}></View>)
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
            });
    }

    /**
     * 请求短信验证码
     * @param { Object } params<phoneNum graphicVerkficationCode Token Callback>
     */
    getSMSCode = () => {
        axios({
            url: "https://www.raindropbox365.com/api/sms/send_captcha",
            method: "post",
            data: JSON.stringify({
                "phone_number": this.state.phoneNum,
                "digits": this.state.imageVerificationCode,
                "token": this.state.Token
            }),
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
        })
        .then(resp => {
            console.log(resp)
            if (resp && resp.status !== 204) {
                Toast.show('发送失败', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
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

    // 图形验证码 HTML
    graphicVerificationCodeHTML = () => {
        const styles = {
            wrapper: {
                width: '100%',
                height: '100%',
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row"
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
                        style={ styles.refreshImage }
                        source={ Images["refresh"] }
                    />
                </TouchableOpacity>
            </View>
        )
    }

    // 验证码
    verificationCodeHTML = () => {
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

            let phoneNum = this.state.phoneNum || "";
            let verificationCode = this.state.verificationCode || "";
            let imageVerificationCode = this.state.imageVerificationCode || "";
            let phoneReg = /^1[34578]\d{9}$/;

            if ( !phoneNum ) {
                Toast.show('请输入手机号码', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
            }
    
            if ( !phoneReg.test(phoneNum) ) {
                Toast.show('请输入正确手机号码', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
            }
    
            if ( !imageVerificationCode ) {
                Toast.show('请输入图形验证码', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
            }

            if (this.state.verificationText == "发送验证码") {
                // 允许 发送请求
                this.getSMSCode();
                let codeSub = 60;
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
        let imageVerificationCode = this.state.imageVerificationCode || "";
        let phoneReg = /^1[34578]\d{9}$/;

        if ( !phoneNum ) {
            Toast.show('请输入手机号码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        if ( !phoneReg.test(phoneNum) ) {
            Toast.show('请输入正确手机号码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        if ( !imageVerificationCode ) {
            Toast.show('请输入图形验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        if ( !verificationCode ) {
            Toast.show('请输入短信验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        axios
            .post('https://www.raindropbox365.com/api/sessions/login_phone', {
                phone_number: this.state.phoneNum,
                sms_code: verificationCode
            })
            .then(resp => {
                if ( !resp ) return;
                console.log(resp)
                if ( resp.status === 200 ) {
                    let data = resp.data || {};
                    axios
                        .post('https://www.raindropbox365.com/api/sessions/todo')
                        .then(resp => {
                            console.log(resp)
                            if (resp && resp.data) {
                                const cb = this.props.navigation.getParam('callback', '');
                                cb && cb();
                                if (resp.data.need_password == 0) {
                                    this.props.navigation.popToTop();
                                } else if (resp.data.need_password == 1) {
                                    this.props.navigation.navigate('createAccount', {
                                        account: data.account,
                                        password: data.password,
                                        userId: data.user_id,
                                        roleId: data.role_id
                                    })
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
                    this.setState({
                        account: data.account,
                        password: data.password,
                        userId: data.user_id,
                        roleId: data.role_id
                    });

                    
                } else {
                    Toast.show(resp.data.message, {
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

    // 跳转到账号登录
    accountLogin = () => {
        const cb = this.props.navigation.getParam('callback', '');
        this.props.navigation.navigate('accountLogin', {
            callback: cb
        })
    }

    // 获取手机号码
    getPhone = phone => {
        let phoneNum = phone && phone.trim() || "";
        this.setState({
            phoneNum
        })
    }

    // 获取图形验证码
    getImgVerification = ver => {
        let imageVerificationCode = ver && ver.trim() || "";
        this.setState({
            imageVerificationCode
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
                        placeholder="请输入图形验证码"
                        rightFlag={ true }
                        textInputStyle={{
                            width: PX2DP_W(150),
                        }}
                        HTMLTemplate={ this.graphicVerificationCodeHTML }
                        onChange={ this.getImgVerification }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="验证码"
                        placeholder="请输入短信验证码"
                        rightFlag={ true }
                        HTMLTemplate={ this.verificationCodeHTML }
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