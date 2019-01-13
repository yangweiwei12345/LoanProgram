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

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: "", // 账号
            password: "", // 密码
            verificationCode: "", // 验证码
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const account = navigation.getParam('account', '');
        const password = navigation.getParam('password', '');
        const userId = navigation.getParam('userId', '');
        const roleId = navigation.getParam('roleId', '');

        this.setState({
            account, // 账号
            password, // 密码
            roleId, // 
            userId, // 用户ID
        })
    }

    static navigationOptions = {
        title: '账号登录',
    };

    // 登录
    login = () => {

        let account = this.state.account || '';
        let password = this.state.password || '';
        let roleId = this.state.roleId || '';
        let userId = this.state.userId || '';

        if ( !password ) {
            Toast.show('请输入密码', {
                shadow: true,
                position: Toast.positions.CENTER
            });
            return;
        }

        axios({
            url: `https://www.raindropbox365.com/api/users/account/${account}/password`,
            method: "PUT",
            data: {
                new_password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp)
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

    // 获取密码
    getPassword = passwordNum => {
        let password = passwordNum && passwordNum.trim();
        this.setState({
            password
        })
    }

    render() {
        const {
            account
        } = this.state;
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
                        editable={ false }
                        value={ account }
                        noClear={ true }
                    />
                    <Tab
                        style={{
                            marginTop: 10
                        }}
                        leftText="密码"
                        placeholder="设置您的密码保护账号安全"
                        onChange={ this.getPassword }
                    />
                </View>
                <Button
                    value="确认"
                    onPress={ this.login }
                    style={{
                        marginTop: 20
                    }}
                />
            </View>
        );
    }
}

export default CreateAccountPage;