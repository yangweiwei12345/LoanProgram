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
    topBoxText: {
        color: "#8F93A1"
    },
    imgBox: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 58,
        height: 9,
    },
    img: {
        width: "100%",
        left: 35,
    },
    verificationInfo: {
        height: 50,
        paddingLeft: 25,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF",
        marginTop: 2,
    }
};

class accountLoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageSub: 0,
            phoneNum: 18323481238
        }
    }

    static navigationOptions = {
        title: '忘记密码',
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

        linkToPasswordPage = () => {
            console.log('forget')
        }

        return (
            <View
                style={ styles.wrapper }
            >
                <TouchableOpacity
                    style={ styles.textWraper }
                    onPress={ this.linkToPasswordPage }
                >
                    <Text
                        style={ styles.text }
                    >忘记密码</Text>
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

    steps1 = () => {
        this.setState({
            pageSub: 1
        })
    }

    steps2 = () => {
        this.setState({
            pageSub: 2
        })
    }

    steps3 = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        const {
            pageSub,
            phoneNum
        } = this.state;

        const page0 = (<View>
            <View
                style={styles.formBox}
            >
                <Tab
                    style={{
                        marginTop: 10
                    }}
                    leftText="+86"
                    placeholder="请输入您注册时的手机号"
                    rightFlag={false}
                />
                <Tab
                    style={{
                        marginTop: 10
                    }}
                    leftText="验证码"
                    placeholder="请输入图形验证码"
                    rightFlag={true}
                    HTMLTemplate={this.forgetPassword}
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
                    style={{
                        marginTop: 10
                    }}
                    leftText="验证码"
                    placeholder="请输入验证码"
                    rightFlag={true}
                    HTMLTemplate={this.forgetPassword}
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
                    style={{
                        marginTop: 10
                    }}
                    leftText="新密码"
                    placeholder="请输入您的新密码"
                    rightFlag={true}
                />
                <Tab
                    style={{
                        marginTop: 10
                    }}
                    leftText="确认"
                    placeholder="请确认您的新密码"
                    rightFlag={true}
                    HTMLTemplate={this.forgetPassword}
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
                                ...styles.topBoxText
                            }}
                        >填写手机号码</Text>
                        <Text
                            style={{
                                ...styles.topBoxText
                            }}
                        >安全验证</Text>
                        <Text
                            style={{
                                ...styles.topBoxText
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