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
import { Images } from '../../assets';
import Toast from 'react-native-root-toast';
import axios from 'axios';
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
    },
    topBox: {
        height: 70,
        paddingLeft: 25,
        paddingRight: 25,
    },
    topBoxInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 23,
    },
    topBoxText1: {
        color: "#F64A38"
    },
    topBoxText2: {
        color: "#8F93A1"
    },
    topBoxText3: {
        color: "#8F93A1"
    },
    imgBox: {
        marginTop: 8,
        height: 9,
    },
    img: {
        width: "100%",
    },
    verificationInfo: {
        height: 50,
        paddingLeft: 25,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginTop: 2,
    },
    redColor: {
        color: "#F64A38"
    }
};

class accountLoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageSub: 0,
            phoneNum: "",
            imgVerificationCode: "",
            verificationCode: "",
            newPwdIcon: "close",
            repeatPwdIcon: "close",
            newPwdFlag: true,
            repeatPwdFlag: true,
            newPwd: "",
            repeatPwd: "",
            imageVerificationCode: "", // 图形验证码
            Token: "", // token
            verificationText: "重新发送",
        }
    }

    static navigationOptions = {
        title: '忘记密码',
        headerRight: (<View style={{ width: 60, height: 60 }}></View>)
    };

    componentDidMount() {
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

    // 图形验证码 html
    imgVerificationCodeHTML = () => {
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

            if (this.state.verificationText !== "重新发送") return;

            if (this.state.verificationText == "重新发送") {
                // 允许 发送请求
                this.getSMSCode();
                let codeSub = 60;
                this.setState({
                    verificationText: codeSub + "s"
                })
                interVal = setInterval(() => {
                    codeSub--;
                    if (codeSub < 1) {
                        codeSub = "重新发送";
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

    // 新密码 HTML
    newPasswordHTML = () => {
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
            }
        }
        const changeIcon = () => {
            if (this.state.newPwdIcon === "close") {
                this.setState({
                    newPwdIcon: "open",
                    newPwdFlag: false
                })
            } else {
                this.setState({
                    newPwdIcon: "close",
                    newPwdFlag: true
                })
            }
        }
        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                    onPress={ changeIcon }
                >
                    <Image
                        source={ Images[this.state.newPwdIcon] }
                    />
                </TouchableOpacity>
            </View>
        )
    }

    repeatNewPasswordHTML = () => {
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
            }
        }
        const changeIcon = () => {
            if (this.state.repeatPwdIcon === "close") {
                this.setState({
                    repeatPwdIcon: "open",
                    repeatPwdFlag: false
                })
            } else {
                this.setState({
                    repeatPwdIcon: "close",
                    repeatPwdFlag: true
                })
            }
        }
        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                    onPress={ changeIcon }
                >
                    <Image
                        source={ Images[this.state.repeatPwdIcon] }
                    />
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
                "digits": this.state.imgVerificationCode,
                "token": this.state.Token
            }),
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
        })
        .then(resp => {
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

    steps1 = () => {

        if ( !this.state.phoneNum ) {
            Toast.show('请输入手机号码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        } else {
            let phoneReg = /^1[34578]\d{9}$/;
            if ( !phoneReg.test(this.state.phoneNum) ) {
                Toast.show('请输入正确手机号码', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
            }
        }

        if ( !this.state.imgVerificationCode ) {
            Toast.show('请输入验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        axios
            .post('https://www.raindropbox365.com/api/captcha', {
                digits: this.state.imgVerificationCode,
                token: this.state.Token
            })
            .then(resp => {
                if (resp && resp.status == 204) {
                    this.getSMSCode();
                    this.setState({
                        pageSub: 1
                    }, () => {
                        styles.topBoxText2 = styles.redColor;
                        this.forceUpdate();
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

    steps2 = () => {
        
        if ( !this.state.verificationCode ) {
            Toast.show('请输入验证码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        axios
            .post(`https://www.raindropbox365.com/api/sms/verify`, {
                phone_number: this.state.phoneNum,
                sms_code: this.state.verificationCode
            })
            .then(resp => {
                if (!resp) return;
                if (resp) {
                    this.setState({
                        pageSub: 2
                    }, () => {
                        styles.topBoxText3 = styles.redColor;
                        this.forceUpdate();
                    })
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

    steps3 = () => {
        if (!this.state.newPwd) {
            Toast.show('请输入新密码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        if (!this.state.repeatPwd) {
            Toast.show('请确认新密码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        if (this.state.newPwd !== this.state.repeatPwd) {
            Toast.show('密码输入不一致', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        } else {
            axios
                .put(`https://www.raindropbox365.com/api/users/account/${this.state.phoneNum}/password/sms`, {
                    phone_number: this.state.phoneNum,
                    sms_code: this.state.verificationCode,
                    new_password: this.state.newPwd
                })
                .then(resp => {
                    if (resp && resp.status == 204) {
                        Toast.show('设置成功', {
                            shadow: true,
                            position: Toast.positions.CENTER
                        });
                        setTimeout(() => {
                            const cb = this.props.navigation.getParam('callback', '');
                            cb && cb();
                            this.props.navigation.navigate('Home');
                        }, 500)
                    } else {
                        Toast.show('设置失败', {
                            shadow: true,
                            position: Toast.positions.CENTER
                        });
                        setTimeout(() => {
                            this.props.navigation.navigate('Home');
                        }, 500)
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
    }

    // 获取手机号
    getPhone = phone => {
        let phoneNum = phone && phone.trim() || "";
        this.setState({
            phoneNum
        })
    }

    // 获取图形验证码
    getImgVerification = verification => {
        let imgVerificationCode = verification && verification.trim() || "";
        this.setState({
            imgVerificationCode
        })
    }

    // 获取验证码
    getVerification = verification => {
        let verificationCode = verification && verification.trim() || "";
        this.setState({
            verificationCode
        })
    }

    // 获取新密码
    getNewPwd = pwd => {
        let newPwd = pwd && pwd.trim() || "";
        this.setState({
            newPwd
        })
    }

    // 获取重复密码
    getRepeatPwd = pwd => {
        let repeatPwd = pwd && pwd.trim() || "";
        this.setState({
            repeatPwd
        })
    }

    // 输入完新密码后
    newPwdBlur = () => {
        if (this.state.repeatPwd) {
            if (this.state.newPwd !== this.state.repeatPwd) {
                Toast.show('密码输入不一致', {
                    shadow: true,
                    position: Toast.positions.CENTER
                });
                return;
            }
        }
    }

    // 输入完重复密码之后
    repeatPwdBlur = () => {
        if (!this.state.newPwd) {
            Toast.show('请先输入新密码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
        if (this.state.newPwd !== this.state.repeatPwd) {
            Toast.show('密码输入不一致', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }
    }

    componentWillUnmount() {
        styles.topBoxText1.color = "#F64A38";
        styles.topBoxText2.color = "#8F93A1";
        styles.topBoxText3.color = "#8F93A1";
    }

    render() {
        const {
            pageSub,
            phoneNum,
            newPwdFlag,
            repeatPwdFlag,
        } = this.state;

        const page0 = (<View>
            <View
                style={styles.formBox}
            >
                <Tab
                    key="page0_1"
                    style={{
                        marginTop: 10
                    }}
                    leftText="+86"
                    placeholder="请输入您注册时的手机号"
                    rightFlag={false}
                    onChange={ this.getPhone }
                    keyboardType="numeric"
                    maxLength={ 11 }
                />
                <Tab
                    key="page0_2"
                    style={{
                        marginTop: 10
                    }}
                    leftText="验证码"
                    placeholder="请输入图形验证码"
                    rightFlag={true}
                    textInputStyle={{
                        width: PX2DP_W(150),
                    }}
                    HTMLTemplate={this.imgVerificationCodeHTML}
                    onChange={ this.getImgVerification }
                />
            </View>
            <Button
                value="下一步"
                onPress={this.steps1}
                style={{
                    marginTop: 20
                }}
            />
        </View>);

        const page1 = (<View>
            <View
                style={styles.formBox}
            >
                <View
                    style={ styles.verificationInfo }
                >
                    <Text>请输入我们发送至{ phoneNum }的验证码</Text>
                </View>
                
                <Tab
                    key="page1_1"
                    style={{
                        marginTop: 10
                    }}
                    leftText="验证码"
                    placeholder="请输入验证码"
                    rightFlag={true}
                    HTMLTemplate={ this.verificationCodeHTML }
                    onChange={ this.getVerification }
                />
            </View>
            <Button
                value="下一步"
                onPress={this.steps2}
                style={{
                    marginTop: 20
                }}
            />
        </View>);

        const page2 = (<View>
            <View
                style={styles.formBox}
            >
                <Tab
                    key="page2_1"
                    style={{
                        marginTop: 10
                    }}
                    leftText="新密码"
                    placeholder="请输入您的新密码"
                    rightFlag={true}
                    HTMLTemplate={ this.newPasswordHTML }
                    secureTextEntry={ newPwdFlag }
                    onChange={ this.getNewPwd }
                    onBlur={ this.newPwdBlur }
                />
                <Tab
                    key="page2_2"
                    style={{
                        marginTop: 10
                    }}
                    leftText="确认"
                    placeholder="请确认您的新密码"
                    rightFlag={true}
                    HTMLTemplate={ this.repeatNewPasswordHTML }
                    secureTextEntry={ repeatPwdFlag }
                    onChange={ this.getRepeatPwd }
                    onBlur={ this.repeatPwdBlur }
                />
            </View>
            <Button
                value="提交"
                onPress={this.steps3}
                style={{
                    marginTop: 20
                }}
            />
        </View>);



        return (
            <View
                style={ styles.wrapper }
            >
                {/* 顶部信息 */}
                <View
                    style={ styles.topBox }
                >
                    <View
                        style={ styles.topBoxInfo }
                    >
                        <Text
                            style={{
                                ...styles.topBoxText1
                            }}
                        >填写手机号码</Text>
                        <Text
                            style={{
                                ...styles.topBoxText2
                            }}
                        >安全验证</Text>
                        <Text
                            style={{
                                ...styles.topBoxText3
                            }}
                        >设置新密码</Text>
                    </View>
                    <View
                        style={ styles.imgBox }
                    >
                        <Image
                            style={ styles.img }
                            source={ Images['one'] }
                        />
                    </View>
                </View>
                {/* 内容区 */}
                {
                    pageSub == 0 ? page0 : ( pageSub == 1 ? page1 : ( pageSub == 2 ? page2 : null ))
                }
            </View>
        );
    }
}

export default accountLoginPage;