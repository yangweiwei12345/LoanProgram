import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import Button from '../components/Button';
import axios from 'axios';
import Toast from 'react-native-root-toast';

const styles = {
    wrapper: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    info: {
        height: 55,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16
    },
    leftText: {
        color: "#666666"
    },
    rightText: {
        color: "#230E02"
    },
    versionInfo: {
        fontSize: 12,
        color: "#949494",
        marginTop: 65,
        textAlign: "center"
    }
};

class SettingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: "",
            versionInfo: "2.2.1 (2401)"
        }
    }

    static navigationOptions = {
        title: '设置中心',
        headerRight: (<View style={{ width: 60, height: 60 }}></View>)
    };

    componentWillMount() {
        this.getUserInfo();
    }

    logout = () => {
        axios
            .post("https://www.raindropbox365.com/api/sessions/logout")
            .then(resp => {
                if (resp) {
                    if (resp.status == 204) {
                        this.props.navigation.goBack();
                        const cb = this.props.navigation.getParam('callback', '');
                        cb && cb();
                    }
                }
            }) 
            .catch(err => {
                if (err && err.response) {
                    Toast.show(err.response.data, {
                        shadow: true,
                        position: Toast.positions.CENTER
                    });
                }
            })
    }

    getUserInfo = () => {
        axios
            .post("https://www.raindropbox365.com/api/sessions/check")
            .then(resp => {
                if (resp) {
                    console.log(resp)
                    if (resp.status == 200 && resp.data) {
                        this.setState({
                            phone: resp.data && resp.data.account || ""
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
    }

    render() {
        const {
            phone,
            versionInfo
        } = this.state;
        return (
            <View
                style={styles.wrapper}
            >
                <View
                    style={ styles.info }
                >
                    <Text
                        style={ styles.leftText }
                    >账户</Text>
                    <Text
                        style={ styles.rightText }
                    >{ phone }</Text>
                </View>
                <Text
                    style={ styles.versionInfo }
                >
                    当前版本: { versionInfo }
                </Text>
                <Button
                    value="退出登录"
                    textColor="#666"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#666666",
                        marginTop: 30,
                    }}
                    onPress={ this.logout }
                />
            </View>
        );
    }
}

export default SettingPage;